import './globals.css'

export const metadata = {
  title: 'A Filmes Pobreflix',
  description: 'A Filmes Pobreflix — filmes e séries online.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  verification: {
    google: 'bhBWxdXxAmGREMu0QwknslC-seAh-0WLlqPr4CRgoX8',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="bhBWxdXxAmGREMu0QwknslC-seAh-0WLlqPr4CRgoX8"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
