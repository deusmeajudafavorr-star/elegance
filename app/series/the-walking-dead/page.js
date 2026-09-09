import Link from 'next/link'

export const metadata = {
  title: 'Assistir The Walking Dead Online — Temporadas, Episódios e Elenco',
  description: 'Veja informações sobre The Walking Dead, suas 11 temporadas, 177 episódios, elenco, sinopse e guia da série.',
  keywords: ['The Walking Dead', 'assistir The Walking Dead', 'The Walking Dead online', 'The Walking Dead temporadas', 'The Walking Dead episódios', 'The Walking Dead elenco'],
  alternates: { canonical: '/series/the-walking-dead' },
  openGraph: { title: 'The Walking Dead — Temporadas, Episódios e Elenco | Filmes', description: 'Informações, temporadas, episódios e elenco de The Walking Dead.', type: 'website' },
}

const poster = 'https://image.tmdb.org/t/p/w342/9lb02gTh4LLB17yAEXFd4C3R4JP.jpg'
const player = 'https://myembed.biz/serie/1402'
const cast=['Andrew Lincoln','Norman Reedus','Melissa McBride','Lauren Cohan','Danai Gurira','Jeffrey Dean Morgan']

export default function WalkingDeadPage(){return <main className="seriesPage">
<header><div className="nav"><Link href="/" className="brand"><span>F</span> FILMES</Link><nav><Link href="/">Filmes</Link><Link href="/#genres">Gêneros</Link><Link href="/#about">Sobre</Link></nav></div></header>
<article className="seriesArticle">
<div className="seriesBreadcrumb"><Link href="/">Início</Link><span>/</span><span>Séries</span><span>/</span><strong>The Walking Dead</strong></div>
<section className="seriesHero"><div className="seriesPoster"><img src={poster} alt="Pôster de The Walking Dead" loading="eager"/><span>FILMES</span><strong>THE<br/>WALKING<br/>DEAD</strong><small>2010 — 2022</small></div><div><span className="kicker">SÉRIE • DRAMA • TERROR</span><h1>Assistir The Walking Dead Online</h1><p className="seriesMeta">2010–2022 · 11 temporadas · 177 episódios · 42 min em média</p><p className="seriesRating">★ 8,1/10 <span>Série de TV</span></p><p className="seriesDescription">Após um apocalipse zumbi, um grupo de sobreviventes liderado pelo ex-policial Rick Grimes atravessa um mundo perigoso em busca de segurança, abrigo e um novo lar.</p><div className="seriesActions"><a href="#assistir" className="seriesButton">Assistir</a></div></div></section>
<section id="assistir" className="seriesPlayer"><div className="seriesSectionHead"><div><span className="kicker">PLAYER</span><h2>Assistir The Walking Dead</h2></div></div><div className="playerFrame"><iframe src={player} width="100%" height="70vh" frameBorder="0" scrolling="no" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen title="The Walking Dead player"/></div></section>
<section id="info" className="seriesInfo"><div><span className="kicker">SOBRE A SÉRIE</span><h2>The Walking Dead</h2></div><div><p><strong>The Walking Dead</strong> é uma série dramática pós-apocalíptica americana baseada nos quadrinhos de Robert Kirkman, Tony Moore e Charlie Adlard. Estreou em 31 de outubro de 2010 e terminou em 20 de novembro de 2022.</p><p>A história acompanha sobreviventes em um mundo transformado por um misterioso surto, combinando sobrevivência, terror, drama e conflitos entre diferentes comunidades.</p></div></section>
<section className="seriesFacts"><div><span>Título original</span><strong>The Walking Dead</strong></div><div><span>Primeiro episódio</span><strong>31 de outubro de 2010</strong></div><div><span>Último episódio</span><strong>20 de novembro de 2022</strong></div><div><span>Temporadas</span><strong>11</strong></div><div><span>Episódios</span><strong>177</strong></div><div><span>Gêneros</span><strong>Drama · Terror · Suspense</strong></div></section>
<section className="seriesCast"><span className="kicker">ELENCO PRINCIPAL</span><h2>Elenco</h2><div>{cast.map(person=><span key={person}>{person}</span>)}</div></section>
<section className="seriesLegal"><strong>Informações de exibição</strong><p>Disponibilidade e condições de reprodução podem variar conforme o serviço e a região.</p></section>
</article><footer><div className="brand"><span>F</span> FILMES</div><p>Filmes e séries para quem gosta de descobrir.</p><Link href="/">Ver catálogo</Link></footer></main>}
