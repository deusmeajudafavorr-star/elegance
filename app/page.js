'use client'
import {useMemo,useState} from 'react'
import Link from 'next/link'
import {Search,Play,ShieldCheck,Film,Menu,X} from 'lucide-react'
import customMovies from '../data/movies.json'

const starter=[
{id:'all-quiet-on-the-western-front-1930',title:'All Quiet on the Western Front',year:1930,genre:'War',rating:'8.1',desc:'Lewis Milestone’s landmark anti-war drama following young German soldiers during World War I.',embed:''},
{id:'the-blue-angel-1930',title:'The Blue Angel',year:1930,genre:'Drama',rating:'7.3',desc:'A celebrated early sound film starring Marlene Dietrich and Emil Jannings.',embed:''},
{id:'animal-crackers-1930',title:'Animal Crackers',year:1930,genre:'Comedy',rating:'7.4',desc:'The Marx Brothers bring their anarchic comedy to a lavish country-house gathering.',embed:''},
{id:'morocco-1930',title:'Morocco',year:1930,genre:'Romance',rating:'7.0',desc:'A glamorous pre-Code romance directed by Josef von Sternberg.',embed:''},
{id:'the-big-trail-1930',title:'The Big Trail',year:1930,genre:'Western',rating:'7.0',desc:'A sweeping western adventure starring a young John Wayne.',embed:''},
{id:'the-divorcee-1930',title:'The Divorcee',year:1930,genre:'Drama',rating:'6.9',desc:'Norma Shearer stars in a bold pre-Code drama about marriage and independence.',embed:''},
{id:'the-dawn-patrol-1930',title:'The Dawn Patrol',year:1930,genre:'War',rating:'7.0',desc:'A tense aviation drama about Royal Flying Corps pilots during World War I.',embed:''},
{id:'murder-1930',title:'Murder!',year:1930,genre:'Mystery',rating:'6.9',desc:'Alfred Hitchcock’s early British murder mystery about an actor serving on a jury.',embed:''},
{id:'anna-christie-1930',title:'Anna Christie',year:1930,genre:'Drama',rating:'6.9',desc:'Greta Garbo stars in Eugene O’Neill’s story of a woman rebuilding her life.',embed:''},
{id:'hells-angels-1930',title:"Hell's Angels",year:1930,genre:'War',rating:'7.0',desc:'Howard Hughes’ spectacular aviation epic centered on two brothers and a daring pilot.',embed:''},
{id:'the-big-house-1930',title:'The Big House',year:1930,genre:'Crime',rating:'7.0',desc:'An influential prison drama that helped define the early sound-era crime film.',embed:''},
{id:'king-of-jazz-1930',title:'King of Jazz',year:1930,genre:'Musical',rating:'7.0',desc:'A lavish Universal musical revue featuring Paul Whiteman and an unforgettable visual style.',embed:''},
{id:'soup-to-nuts-1930',title:'Soup to Nuts',year:1930,genre:'Comedy',rating:'6.1',desc:'An early comedy showcase featuring the trio that would become The Three Stooges.',embed:''}
]
const colors=['#6d5dfc','#e5484d','#16a085','#e67e22','#2980b9','#8e44ad','#d35400','#27ae60']
function Poster({movie,index}){return <div className="poster" style={{background:`linear-gradient(145deg,${colors[index%colors.length]},#101018)`}}><span className="posterYear">{movie.year}</span><div><small>OPENFILM</small><strong>{movie.title}</strong></div></div>}
function Card({movie,index,onPlay}){return <article className="card"><button className="posterBtn" onClick={()=>onPlay(movie)} aria-label={`Watch ${movie.title}`}><Poster movie={movie} index={index}/><span className="play"><Play size={18} fill="currentColor"/></span></button><div className="cardInfo"><h3>{movie.title}</h3><p>{movie.year} • {movie.genre} • ★ {movie.rating}</p></div></article>}
export default function Home(){
 const movies=useMemo(()=>[...starter,...customMovies.filter(m=>!starter.some(s=>s.id===m.id))],[ ])
 const [q,setQ]=useState(''); const [genre,setGenre]=useState('All'); const [selected,setSelected]=useState(null); const [menu,setMenu]=useState(false)
 const genres=['All',...Array.from(new Set(movies.map(m=>m.genre)))]
 const filtered=useMemo(()=>movies.filter(m=>(genre==='All'||m.genre===genre)&&`${m.title} ${m.year} ${m.genre}`.toLowerCase().includes(q.toLowerCase())),[movies,q,genre])
 return <main><header><div className="nav"><Link href="/" className="brand"><span>O</span> OPENFILM</Link><button className="menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button><nav className={menu?'open':''}><Link href="#browse">Browse</Link><Link href="#genres">Genres</Link><Link href="#about">About</Link><Link href="/admin" className="adminLink">Admin</Link></nav></div></header>
 <section className="hero"><div className="heroGlow"/><div className="heroContent"><div className="eyebrow"><ShieldCheck size={16}/> LEGAL CLASSIC CINEMA</div><h1>Great movies.<br/><em>Free to watch.</em></h1><p>Discover a growing collection of classic cinema, carefully curated for free viewing.</p><div className="search"><Search size={20}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search movies, genres, years..."/></div></div></section>
 <section className="content" id="browse"><div className="sectionHead"><div><span className="kicker">THE COLLECTION</span><h2>Classic movies</h2></div><div className="chips">{genres.map(g=><button key={g} className={genre===g?'active':''} onClick={()=>setGenre(g)}>{g}</button>)}</div></div>
 <div className="grid">{filtered.map((m,i)=><Card key={m.id} movie={m} index={i} onPlay={setSelected}/>)}</div>{!filtered.length&&<div className="empty">No movies found. Try another title or genre.</div>}</section>
 <section className="about" id="about"><div><span className="kicker">WHY OPENFILM</span><h2>Classic cinema, without the clutter.</h2></div><p>OpenFilm is built around a simple idea: make legally available classic cinema easier to discover. Every title can include a source provided by the site administrator, with clear information about its availability and era.</p></section>
 <footer><div className="brand"><span>O</span> OPENFILM</div><p>Classic movies for curious viewers.</p><Link href="/admin">Admin</Link></footer>
 {selected&&<div className="modal" onClick={()=>setSelected(null)}><div className="watch" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}><X/></button><div className="video">{selected.embed?<iframe src={selected.embed} title={selected.title} allowFullScreen/>:<div className="noVideo"><Film size={42}/><h3>{selected.title}</h3><p>This title is in the catalog. Add its authorized embed URL in the admin area to enable playback.</p><Link href="/admin">Open Admin</Link></div>}</div><div className="watchMeta"><h2>{selected.title}</h2><p>{selected.year} • {selected.genre} • ★ {selected.rating}</p><p>{selected.desc||selected.description}</p></div></div></div>}
 </main>
}
