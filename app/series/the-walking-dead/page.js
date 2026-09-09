import Link from 'next/link'

export const metadata = {
  title: 'The Walking Dead Online — Seasons, Episodes and Cast',
  description: 'Explore The Walking Dead: synopsis, 11 seasons, 177 episodes, release information, cast and episode guide. Discover where the series is legally available to watch.',
  keywords: ['The Walking Dead', 'The Walking Dead seasons', 'The Walking Dead episodes', 'The Walking Dead cast', 'The Walking Dead episode guide'],
  alternates: { canonical: '/series/the-walking-dead' },
  openGraph: { title: 'The Walking Dead — Seasons, Episodes and Cast | OpenFilm', description: 'Explore seasons, episodes, cast and release information for The Walking Dead.', type: 'website' },
}

const poster = 'https://image.tmdb.org/t/p/w342/9lb02gTh4LLB17yAEXFd4C3R4JP.jpg'
const seasons = [
  [1,2010,6],[2,2011,13],[3,2012,16],[4,2013,16],[5,2014,16],[6,2015,16],[7,2016,16],[8,2017,16],[9,2018,16],[10,2019,22],[11,2021,24]
]
const cast=['Andrew Lincoln','Norman Reedus','Melissa McBride','Lauren Cohan','Danai Gurira','Jeffrey Dean Morgan']

export default function WalkingDeadPage(){return <main className="seriesPage">
<header><div className="nav"><Link href="/" className="brand"><span>O</span> OPENFILM</Link><nav><Link href="/">Browse</Link><Link href="/#genres">Genres</Link><Link href="/#about">About</Link></nav></div></header>
<article className="seriesArticle">
<div className="seriesBreadcrumb"><Link href="/">Home</Link><span>/</span><span>Series</span><span>/</span><strong>The Walking Dead</strong></div>
<section className="seriesHero"><div className="seriesPoster"><img src={poster} alt="The Walking Dead poster" loading="eager"/><span>OPENFILM</span><strong>THE<br/>WALKING<br/>DEAD</strong><small>2010 — 2022</small></div><div><span className="kicker">SERIES • DRAMA • HORROR</span><h1>Assistir The Walking Dead Online</h1><p className="seriesMeta">2010–2022 · 11 Seasons · 177 Episodes · 42 min average</p><p className="seriesRating">★ 8.1/10 <span>TV Series</span></p><p className="seriesDescription">After a zombie apocalypse, a group of survivors led by former police officer Rick Grimes travels across a dangerous world in search of safety, shelter and a new home. Along the way, the group faces walkers, rival communities and difficult choices about survival.</p><div className="seriesActions"><a href="#episodes" className="seriesButton">Explore episodes</a><a href="#info" className="seriesGhost">Series information</a></div></div></section>
<section id="episodes" className="episodeSection"><div className="seriesSectionHead"><div><span className="kicker">EPISODE GUIDE</span><h2>Seasons and episodes</h2></div><span className="episodeCount">11 seasons · 177 episodes</span></div><div className="seasonGrid">{seasons.map(([number,year,count])=><section className="seasonCard" key={number}><div className="seasonTitle"><strong>Season {number}</strong><span>{year} · {count} episodes</span></div><div className="episodeRows">{Array.from({length:count},(_,i)=><div className="episodeRow" key={i}><span>S{String(number).padStart(2,'0')}E{String(i+1).padStart(2,'0')}</span><b>Episode {i+1}</b><small>Episode guide</small></div>)}</div></section>)}</div></section>
<section id="info" className="seriesInfo"><div><span className="kicker">ABOUT THE SERIES</span><h2>The Walking Dead</h2></div><div><p><strong>The Walking Dead</strong> is an American post-apocalyptic drama series based on the comic book series by Robert Kirkman, Tony Moore and Charlie Adlard. It premiered on October 31, 2010 and concluded on November 20, 2022.</p><p>The story follows survivors as they navigate a world transformed by a mysterious outbreak, combining survival, horror, character drama and conflicts between human communities.</p></div></section>
<section className="seriesFacts"><div><span>Original title</span><strong>The Walking Dead</strong></div><div><span>First aired</span><strong>October 31, 2010</strong></div><div><span>Final episode</span><strong>November 20, 2022</strong></div><div><span>Seasons</span><strong>11</strong></div><div><span>Episodes</span><strong>177</strong></div><div><span>Genres</span><strong>Drama · Horror · Thriller</strong></div></section>
<section className="seriesCast"><span className="kicker">MAIN CAST</span><h2>Cast</h2><div>{cast.map(person=><span key={person}>{person}</span>)}</div></section>
<section className="seriesLegal"><strong>Viewing information</strong><p>OpenFilm catalogs and helps discover legally available cinema and television content. This page does not provide unauthorized copies or links to pirated streams. Availability can vary by country and service.</p></section>
</article><footer><div className="brand"><span>O</span> OPENFILM</div><p>Classic movies and series for curious viewers.</p><Link href="/">Browse catalog</Link></footer></main>}
