'use client'
import {useEffect,useState} from 'react'
import Link from 'next/link'
import {ArrowLeft,Film,Plus,Save,Trash2,LogOut} from 'lucide-react'

const EMPTY={title:'',year:'',genre:'Drama',rating:'',description:'',embed:''}

export default function Admin(){
 const [logged,setLogged]=useState(false)
 const [checking,setChecking]=useState(true)
 const [password,setPassword]=useState('')
 const [error,setError]=useState('')
 const [movies,setMovies]=useState([])
 const [form,setForm]=useState(EMPTY)
 const [saving,setSaving]=useState(false)

 async function loadMovies(){
  const res=await fetch('/api/admin/movies',{cache:'no-store'})
  const data=await res.json()
  if(!res.ok)throw new Error(data.error||'Could not load movies.')
  setMovies(data.movies||[])
 }

 useEffect(()=>{
  fetch('/api/admin/movies',{cache:'no-store'}).then(async res=>{
   if(res.ok){const data=await res.json();setMovies(data.movies||[]);setLogged(true)}
  }).catch(()=>{}).finally(()=>setChecking(false))
 },[])

 async function login(e){
  e.preventDefault();setError('')
  const res=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})})
  const data=await res.json()
  if(!res.ok){setError(data.error||'Login failed.');return}
  setLogged(true);setPassword('')
  try{await loadMovies()}catch(err){setError(err.message)}
 }
 async function logout(){await fetch('/api/admin/login',{method:'DELETE'});setLogged(false);setMovies([])}
 function update(name,value){setForm(f=>({...f,[name]:value}))}
 async function add(e){
  e.preventDefault();setError('');setSaving(true)
  try{
   const res=await fetch('/api/admin/movies',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
   const data=await res.json()
   if(!res.ok)throw new Error(data.error||'Could not save movie.')
   setMovies(data.movies||[]);setForm(EMPTY)
  }catch(err){setError(err.message)}finally{setSaving(false)}
 }
 async function remove(id){
  setError('')
  try{
   const res=await fetch('/api/admin/movies',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})})
   const data=await res.json()
   if(!res.ok)throw new Error(data.error||'Could not remove movie.')
   setMovies(data.movies||[])
  }catch(err){setError(err.message)}
 }

 if(checking)return <main className="adminPage"><div className="login"><div className="adminIcon"><Film/></div><h1>Admin Studio</h1><p>Checking secure session...</p></div></main>
 if(!logged)return <main className="adminPage"><Link href="/" className="back"><ArrowLeft/> Back to OpenFilm</Link><div className="login"><div className="adminIcon"><Film/></div><h1>Admin Studio</h1><p>Manage your movie catalog and authorized embeds.</p><form onSubmit={login}><input aria-label="Admin password" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Admin password" autoComplete="current-password" autoFocus required/><button type="submit">Enter dashboard</button></form>{error&&<p role="alert" className="loginError">{error}</p>}<small>Admin password is configured securely in Vercel.</small></div></main>

 return <main className="adminPage"><div className="adminTop"><Link href="/" className="brand"><span>O</span> OPENFILM</Link><div className="adminLinks"><Link href="/">View site ↗</Link><button type="button" onClick={logout}><LogOut/> Log out</button></div></div><div className="dashboard"><div><span className="kicker">CONTENT MANAGEMENT</span><h1>Movie catalog</h1><p>Movies are saved directly to the OpenFilm GitHub repository and become part of the deployed catalog.</p></div>{error&&<p role="alert" className="loginError">{error}</p>}<form className="movieForm" onSubmit={add}><h2><Plus/> Add a movie</h2><div className="formGrid"><input placeholder="Movie title *" value={form.title} onChange={e=>update('title',e.target.value)} required/><input placeholder="Year *" type="number" min="1888" max="2100" value={form.year} onChange={e=>update('year',e.target.value)} required/><input placeholder="Genre" value={form.genre} onChange={e=>update('genre',e.target.value)}/><input placeholder="Rating (e.g. 7.8)" value={form.rating} onChange={e=>update('rating',e.target.value)}/></div><textarea placeholder="Short SEO description" value={form.description} onChange={e=>update('description',e.target.value)}/><input placeholder="Authorized embed / iframe URL" type="url" value={form.embed} onChange={e=>update('embed',e.target.value)}/><button type="submit" className="save" disabled={saving}><Save/> {saving?'Saving to GitHub...':'Save movie'}</button></form><div className="adminList"><h2>Your added movies <span>{movies.length}</span></h2>{movies.map(m=><div className="adminMovie" key={m.id}><div><b>{m.title}</b><small>{m.year} • {m.genre} • {m.embed?'Embed ready':'No embed yet'}</small></div><button type="button" onClick={()=>remove(m.id)} aria-label={'Remove '+m.title}><Trash2/></button></div>)}{!movies.length&&<div className="adminEmpty">No custom movies yet.</div>}</div></div></main>
}
