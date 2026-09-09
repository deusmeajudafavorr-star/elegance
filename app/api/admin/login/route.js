import {cookies} from 'next/headers'

const COOKIE='openfilm-admin-session'

export async function POST(request){
 try{
  const {password}=await request.json()
  const expected=process.env.OPENFILM_ADMIN_PASSWORD
  if(!expected)return Response.json({error:'Admin password is not configured on Vercel.'},{status:500})
  if(password!==expected)return Response.json({error:'Incorrect password.'},{status:401})
  const store=await cookies()
  store.set(COOKIE,'authenticated',{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:60*60*24*7})
  return Response.json({ok:true})
 }catch{return Response.json({error:'Invalid request.'},{status:400})}
}

export async function DELETE(){
 const store=await cookies()
 store.delete(COOKIE)
 return Response.json({ok:true})
}
