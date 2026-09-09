import Link from 'next/link'

export const metadata = {
  title: 'The Walking Dead Online — Seasons, Episodes and Cast',
  description: 'Explore The Walking Dead: synopsis, 11 seasons, 177 episodes, release information, cast and episode guide. Discover where the series is legally available to watch.',
  keywords: ['The Walking Dead', 'The Walking Dead seasons', 'The Walking Dead episodes', 'The Walking Dead cast', 'The Walking Dead episode guide'],
  alternates: { canonical: '/series/the-walking-dead' },
  openGraph: {
    title: 'The Walking Dead — Seasons, Episodes and Cast | OpenFilm',
    description: 'Explore seasons, episodes, cast and release information for The Walking Dead.',
    type: 'website',
  },
}

const seasons = [
  { number: 1, year: 2010, episodes: 6, titles: ['Days Gone Bye', 'Guts', 'Tell It to the Frogs', 'Vatos', 'Wildfire', 'TS-19'] },
  { number: 2, year: 2011, episodes: 13, titles: ['What Lies Ahead', 'Bloodletting', 'Save the Last One', 'Cherokee Rose', 'Chupacabra', 'Secrets', 'Pretty Much Dead Already', 'Nebraska', 'Triggerfinger', '18 Miles Out', 'Judge, Jury, Executioner', 'Better