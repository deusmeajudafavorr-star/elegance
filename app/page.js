'use client'
import {useMemo,useState} from 'react'
import Link from 'next/link'
import {Search,Play,ShieldCheck,Film,Menu,X} from 'lucide-react'
import customMovies from '../data/movies.json'

const starter=[
{id:'all-quiet-on-the-western-front-1930',title:'Nada de Novo no Front',year:1930,genre:'Guerra',rating:'8.1',desc:'Drama antiguerra de Lewis Milestone que acompanha jovens soldados alemães durante a Primeira Guerra Mundial.',embed:''},
{id:'the-blue-angel-1930',title:'O Anjo Azul',year:1930,genre:'Drama',rating:'7.3',desc:'Clássico do início do cinema sonoro estrelado por Marlene Dietrich e Emil Jannings.',embed:''},
{id:'animal-crackers-1930',title:'Os Galhofeiros',year:1930,genre:'Comédia',rating:'7.4',desc:'Os Irmãos Marx levam sua comédia caótica para uma luxuosa reunião em uma casa de campo.',embed:''},
{id:'morocco-1930',title:'Marrocos',year:1930,genre:'Romance',rating:'7.0',desc:'Romance pré-Código dirigido por Josef von Sternberg.',embed:''},
{id:'the-big-trail-1930',title:'A Grande Jornada',year:1930,genre:'Faroeste',rating:'7.0',desc:'Grande aventura de faroeste estrelada por um jovem John Wayne.',embed:''},
{id:'the-divorcee-1930',title:'A Divorciada',year:1930,genre:'Drama',rating:'6.9',desc:'Norma Shearer estrela um ousado drama sobre casamento e independência.',embed:''},
{id:'the-dawn-patrol-1930',title:'A Patrulha da Madrugada',year:1930,genre:'Guerra',rating:'7.0',desc:'Drama de aviação sobre pilotos do Royal Flying Corps durante a Primeira Guerra Mundial.',embed:''},
{id:'murder-1930',title:'Assassinato!',year:1930,genre:'Mistério',rating:'6.9',desc:'Um dos primeiros mistérios de assassinato britânicos de Alfred Hitchcock.',embed:''},
{id:'anna-christie-1930',title:'Anna Christie',year:1930,genre:'Drama',rating:'6.9',desc:'Greta Garbo estrela a história de uma mulher reconstruindo sua vida.',embed:''},
{id:'hells-angels-1930',title:'Anjos do Inferno',year:1930,genre:'Guerra',rating:'7.0',desc:'Épico de aviação de Howard Hughes centrado em dois irmãos e um piloto.',embed:''},
{id:'the-big-house-1930',title:'A Grande Prisão',year:1930,genre:'Crime',rating:'7.0',desc:'Influente drama prisional que ajudou a definir o cinema policial do início do cinema sonoro.',embed:''},
{id:'king-of-jazz-1930',title:'Rei do Jazz',year:1930,genre:'Musical',rating:'7.0',desc:'Grande revista musical da Universal com Paul Whiteman e um estilo visual marcante.',embed:''},
{id:'soup-to-nuts-1930',title:'Soup to Nuts',year:1930,genre:'Comédia',rating:'6.1',desc:'Uma das primeiras comédias com o trio que se tornaria Os Três Patetas.',embed:''}
]
const colors=['#6d5dfc','#e5484d','#16a085','#e67e22','#2980b9','#8e44ad','#d35400','#27ae60']
function Poster({movie,index}){return <div className="poster" style={{background:`linear-gradient(145deg,${colors[index%colors.length]},#101018)`}}><span className="posterYear">{movie.year}</span><div><small>A FILMES POBREFLIX</small><strong>{movie.title}</strong></div></div>}
function Card({movie,index,onPlay}){return <article className="card"><button className="posterBtn" onClick={()=>onPlay(movie)} aria-label={`Assistir ${movie.title}`}><Poster movie={movie} index={index}/><span className="play"><Play size={18} fill="currentColor"/></span></button><div className="cardInfo"><h3>{movie.title}</h3><p>{movie.year} • {movie.genre} • ★ {movie.rating}</p></div></article>}
export default function Home(){
 const movies=useMemo(()=>[...starter,...customMovies.filter(m=>!starter.some(s=>s.id===m.id))],[ ])
 const [q,setQ]=useState(''); const [genre,setGenre]=useState('Todos'); const [selected,setSelected]=useState(null); const [menu,setMenu]=useState(false)
 const genres=['Todos',...Array.from(new Set(movies.map(m=>m.genre)))]
 const filtered=useMemo(()=>movies.filter(m=>(genre==='Todos'||m.genre===genre)&&`${m.title} ${m.year} ${m.genre}`.toLowerCase().includes(q.toLowerCase())),[movies,q,genre])
 return <main><header><div className="nav"><Link href="/" className="brand"><span>AF</span> A FILMES POBREFLIX</Link><button className="menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button><nav className={menu?'open':''}><Link href="#browse">Filmes</Link><Link href="#genres">Gêneros</Link><Link href="#about">Sobre</Link><Link href="/admin" className="adminLink">Admin</Link></nav></div></header>
 <section className="hero"><div className="heroGlow"/><div className="heroContent"><div className="eyebrow"><ShieldCheck size={16}/> CINEMA CLÁSSICO LEGAL</div><h1>Grandes filmes.<br/><em>Grátis para assistir.</em></h1><p>Descubra uma coleção de clássicos do cinema, selecionados para facilitar sua descoberta e visualização.</p><div className="search"><Search size={20}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar filmes, gêneros, anos..." aria-label="Buscar filmes"/></div></div></section>
 <section className="content" id="browse"><div className="sectionHead"><div><span className="kicker">A COLEÇÃO</span><h2>Filmes clássicos</h2></div><div className="chips" id="genres">{genres.map(g=><button key={g} className={genre===g?'active':''} onClick={()=>setGenre(g)}>{g}</button>)}</div></div>
 <div className="grid">{filtered.map((m,i)=><Card key={m.id} movie={m} index={i} onPlay={setSelected}/>)}</div>{!filtered.length&&<div className="empty">Nenhum filme encontrado. Tente outro título ou gênero.</div>}</section>
 <section className="about" id="about"><div><span className="kicker">POR QUE A FILMES POBREFLIX</span><h2>Cinema clássico, sem complicação.</h2></div><p>O A Filmes Pobreflix foi criado para facilitar a descoberta de obras clássicas disponíveis legalmente. Cada título pode incluir uma fonte autorizada, além de informações claras sobre sua disponibilidade e época.</p></section>
 <footer><div className="brand"><span>AF</span> A FILMES POBREFLIX</div><p>Filmes clássicos para quem gosta de descobrir.</p><Link href="/admin">Admin</Link></footer>
 {selected&&<div className="modal" onClick={()=>setSelected(null)}><div className="watch" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)} aria-label="Fechar"><X/></button><div className="video">{selected.embed?<iframe src={selected.embed} title={selected.title} allowFullScreen/>:<div className="noVideo"><Film size={42}/><h3>{selected.title}</h3><p>Este título está no catálogo. Adicione uma URL de embed autorizada na área administrativa para habilitar a reprodução.</p><Link href="/admin">Abrir Admin</Link></div>}</div><div className="watchMeta"><h2>{selected.title}</h2><p>{selected.year} • {selected.genre} • ★ {selected.rating}</p><p>{selected.desc||selected.description}</p></div></div></div>}
 </main>
}
