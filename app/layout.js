import './globals.css'

export const metadata={title:{default:'Filmes — Filmes Online Grátis','template':'%s | Filmes'},description:'Encontre filmes clássicos, séries, gêneros e informações sobre onde assistir online.',keywords:['filmes online','filmes grátis','filmes clássicos','assistir filmes online','séries online'],robots:{index:true,follow:true},openGraph:{title:'Filmes — Filmes Online Grátis',description:'Encontre filmes clássicos e séries online.',type:'website'}}

export default function RootLayout({children}){return <html lang="pt-BR"><body>{children}</body></html>}