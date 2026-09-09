import {notFound} from 'next/navigation'
import Link from 'next/link'
const movies={
'all-quiet-on-the-western-front-1930':['All Quiet on the Western Front',1930,'War','8.1','Lewis Milestone’s landmark anti-war drama following young German soldiers during World War I.'],
'the-blue-angel-1930':['The Blue Angel',1930,'Drama','7.3','A celebrated early sound film starring Marlene Dietrich and Emil Jannings.'],
'animal-crackers-1930':['Animal Crackers',1930,'Comedy','7.4','The Marx Brothers bring their anarchic comedy to a lavish country-house gathering.'],
'morocco-1930':['Morocco',1930,'Romance','7.0','A glamorous pre-Code romance directed by Josef von Sternberg.'],
'the-big-trail-1930':['The Big Trail',1930,'Western','7.0','A sweeping western adventure starring a young John Wayne.'],
'the-divorcee-1930':['The Divorcee',1930,'Drama','6.9','Norma Shearer stars in a bold pre-Code drama about marriage and independence.'],
'the-dawn-patrol-1930':['The Dawn Patrol',1930,'War','7.0','A tense aviation drama about Royal Flying Corps pilots during World War I.'],
'murder-1930':['Murder!',1930,'Mystery','6.9','Alfred Hitchcock’s early British murder mystery about an actor serving on a jury.'],
'anna-christie-1930':['Anna Christie',1930,'Drama','6.9','Greta Garbo stars in Eugene O’Neill’s story of a woman rebuilding her life.'],
'hells-angels-1930':["Hell's Angels",1930,'War','7.0','Howard Hughes’ spectacular aviation epic centered on two brothers and a daring pilot.'],
'the-big-house-1930':['The Big House',1930,'Crime','7.0','An influential prison drama that helped define the early sound-era crime film.'],
'king-of-jazz-1930':['King of Jazz',1930,'Musical','7.0','A lavish Universal musical revue featuring Paul Whiteman and an unforgettable visual style.'],
'soup-to-nuts-1930':['Soup to Nuts',1930,'Comedy','6.1','An early comedy showcase featuring the trio that would become The Three Stooges.']}
export function generateStaticParams(){return Object.keys(movies).map(slug=>({slug}))}
export function generateMetadata({params}){const m=movies[params.slug];if(!m)return{};return {title:`Watch ${m[0]} (${m[1]}) Free Online`,description:`Watch ${m[0]} (${m[1]}) online. Explore this classic ${m[2].toLowerCase()} film, cast, year, rating and viewing information on OpenFilm.`}}
export default function Movie({params}){const m=movies[params.slug];if(!m)return notFound();return <main className="moviePage"><header><div className="nav"><Link href="/" className="brand"><span>O</span> OPENFILM</Link><Link href="/">Browse all movies</Link></div></header><article><div className="movieHero"><div className="moviePoster"><span>{m[1]}</span><strong>{m[0]}</strong></div><div><span className="kicker">CLASSIC CINEMA • {m[2].toUpperCase()}</span><h1>Watch {m[0]} ({m[1]}) Free Online</h1><p className="meta">{m[1]} • {m[2]} • ★ {m[3]}</p><p>{m[4]}</p><div className="notice">Viewing source can be added by the site administrator when an authorized embed is available.</div></div></div><section><h2>About {m[0]}</h2><p>{m[4]} OpenFilm provides discovery pages for classic cinema and clearly identifies viewing availability.</p></section></article></main>}