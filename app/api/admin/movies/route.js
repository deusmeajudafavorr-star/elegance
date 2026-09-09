import {cookies} from 'next/headers'

const COOKIE='openfilm-admin-session'
const FILE='data/movies.json'

function config(){
 const {GITHUB_TOKEN,GITHUB_OWNER,GITHUB_REPO,GITHUB_BRANCH='main'}=process.env
 if(!GITHUB_TOKEN||!GITHUB_OWNER||!GITHUB_REPO)throw new Error('GitHub storage is not configured.')
 return {token:GITHUB_TOKEN,owner:GITHUB_OWNER,repo:GITHUB_REPO,branch:GITHUB_BRANCH}
}

async function github(method,body){
 const c=config()
 const url=`https://api.github.com/repos/${c.owner}/${c.repo}/contents/${FILE}`
 const res=await fetch(url,{method,headers:{Authorization:`Bearer ${c.token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'},...(body?{body:JSON.stringify(body)}:{}) ,cache:'no-store'})
 const data=await res.json()
 if(!res.ok)throw new Error(data.message||'GitHub request failed.')
 return data
}

async function requireAuth(){
 const store=await cookies()
 if(store.get(COOKIE)?.value!=='authenticated')return false
 return true
}

async function readMovies(){
 const data=await github('GET')
 const text=Buffer.from(data.content.replace(/\n/g,''),'base64').toString('utf8')
 return {movies:JSON.parse(text||'[]'),sha:data.sha}
}

async function writeMovies(movies,sha,message){
 const c=config()
 const content=Buffer.from(JSON.stringify(movies,null,2)+'\n','utf8').toString('base64')
 return github('PUT',{message,content,sha,branch:c.branch})
}

export async function GET(){
 try{
  if(!(await requireAuth()))return Response.json({error:'Unauthorized.'},{status:401})
  const {movies}=await readMovies()
  return Response.json({movies})
 }catch(error){return Response.json({error:error.message},{status:500})}
}

export async function POST(request){
 try{
  if(!(await requireAuth()))return Response.json({error:'Unauthorized.'},{status:401})
  const movie=await request.json()
  if(!movie.title?.trim()||!movie.year)return Response.json({error:'Title and year are required.'},{status:400})
  const {movies,sha}=await readMovies()
  const id=movie.title.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-')+'-'+movie.year
  const clean={id,title:movie.title.trim(),year:String(movie.year),genre:movie.genre||'Drama',rating:movie.rating||'',description:movie.description||'',embed:movie.embed||''}
  const next=[...movies.filter(item=>item.id!==id),clean]
  await writeMovies(next,sha,`Add/update movie: ${clean.title}`)
  return Response.json({ok:true,movie:clean,movies:next})
 }catch(error){return Response.json({error:error.message},{status:500})}
}

export async function DELETE(request){
 try{
  if(!(await requireAuth()))return Response.json({error:'Unauthorized.'},{status:401})
  const {id}=await request.json()
  const {movies,sha}=await readMovies()
  const removed=movies.find(item=>item.id===id)
  const next=movies.filter(item=>item.id!==id)
  if(!removed)return Response.json({error:'Movie not found.'},{status:404})
  await writeMovies(next,sha,`Remove movie: ${removed.title}`)
  return Response.json({ok:true,movies:next})
 }catch(error){return Response.json({error:error.message},{status:500})}
}
