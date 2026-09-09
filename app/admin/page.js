'use client'
import {useEffect,useState} from 'react'
import Link from 'next/link'
import {ArrowLeft,Film,Plus,Save,Trash2,LogOut} from 'lucide-react'

const EMPTY={title:'',year:'',genre:'Drama',rating:'',description:'',embed:''}
const KEY='openfilm-movies'
const PASS='admin123'

export default function Admin(){
 const [logged,setLogged]=useState(false)
 const [password,setPassword]=useState('')
 const [error,setError]=useState('')
 const [movies,setMovies]=useState([])
 const [form,setForm]=useState(EMPTY)

 useEffect(()=>{
  try{
   setLogged(sessionStorage.getItem('openfilm-admin')==='1')
   const saved=localStorage.getItem(KEY)
   if(saved)setMovies(JSON.parse(saved))
  }catch{}
 },[])

 function login(e){
  e.preventDefault()
  if(password===PASS){sessionStorage.setItem('openfilm-admin','1');setLogged(true);setError('');setPassword('')}
  else setError('Incorrect password.')
 }
 function logout(){sessionStorage.removeItem('openfilm-admin');setLogged(false)}
 function update(name,value){setForm(f=>({...f,[name]:value}))}
 function add(e){
  e.preventDefault()
  if(!form.title.trim()||!form.year)return
  const id=form.title.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-')+'-'+form.year
  const movie={...form,title:form.title.trim(),id}
  const next=[...movies.filter(m=>m.id!==id),movie]
  setMovies(next)
  localStorage.setItem(KEY,JSON.stringify(next))
  setForm(EMPTY)
 }
 function remove(id){
  const next=movies.filter(m=>m.id!==id)
  setMovies(next)
  localStorage.setItem(KEY,JSON.stringify(next))
 }

 if(!logged)return <main className="adminPage"><Link href="/" className="back"><ArrowLeft/> Back to OpenFilm</Link><div className="login"><div className="adminIcon"><Film/></div><h1>Admin Studio</h1><p>Manage your movie catalog and authorized embeds.</p><form onSubmit={login}><input aria-label="Admin password" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Admin password" autoComplete="current-password" autoFocus required/><button type="submit">Enter dashboard</button></form>{error&&<p role="alert" className="loginError">{error}</p>}<small>Demo password: admin123</small></div></main>

 return <main className="adminPage"><div className="adminTop"><Link href="/" className="brand"><span>O</span> OPENFILM</Link><div className="adminLinks"><Link href="/">View site ↗</Link><button type="button" onClick={logout}><LogOut/> Log out</button></div></div><div className="dashboard"><div><span className="kicker">CONTENT MANAGEMENT</span><h1>Movie catalog</h1><p>Add movies and their authorized embed URLs. Movies added here are stored in this browser in the MVP.</p></div><form className="movieForm" onSubmit={add}><h2><Plus/> Add a movie</h2><div className="formGrid"><input placeholder="Movie title *" value={form.title} onChange={e=>update('title',e.target.value)} required/><input placeholder="Year *" type="number" min="1888" max="2100" value={form.year} onChange={e=>update('year',e.target.value)} required/><input placeholder="Genre" value={form.genre} onChange={e=>update('genre',e.target.value)}/><input placeholder="Rating (e.g. 7.8)" value={form.rating} onChange={e=>update('rating',e.target.value)}/></div><textarea placeholder="Short SEO description" value={form.description} onChange={e=>update('description',e.target.value)}/><input placeholder="Authorized embed / iframe URL" type="url" value={form.embed} onChange={e=>update('embed',e.target.value)}/><button type="submit" className="save"><Save/> Save movie</button></form><div className="adminList"><h2>Your added movies <span>{movies.length}</span></h2>{movies.map(m=><div className="adminMovie" key={m.id}><div><b>{m.title}</b><small>{m.year} • {m.genre} • {m.embed?'Embed ready':'No embed yet'}</small></div><button type="button" onClick={()=>remove(m.id)} aria-label={'Remove '+m.title}><Trash2/></button></div>)}{!movies.length&&<div className="adminEmpty">No custom movies yet.</div>}</div></div></main>
