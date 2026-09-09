import './globals.css'

export const metadata={title:{default:'OpenFilm — Free Classic Movies Online','template':'%s | OpenFilm'},description:'Watch classic movies online for free. Explore a curated collection of public-domain cinema by genre, decade, and title.',keywords:['free classic movies','public domain movies','classic movies online','free movies online','public domain films'],robots:{index:true,follow:true}}

export default function RootLayout({children}){return <html lang="en"><body>{children}</body></html>}