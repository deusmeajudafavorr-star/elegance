import './globals.css'

export const metadata = {
  title: 'A Filmes Pobreflix',
  description: 'A Filmes Pobreflix — filmes e séries online.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
