import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css';
import Header from '@/components/common/Header/Header';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400','500','600', '700'],
})

export const metadata: Metadata = {
  title: 'Adventurer',
  description: 'Twój przewodnik i doradca w podróżowaniu. Znajdź dopasowany do Ciebie, oryginalny pomysł na podróż w dowolnym celu.',
  keywords: "podróż, przewodnik, pomysły, wakacje, praca za granicą, emigracja, wskazówki"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={`${inter.className} bg-emerald-300 h-full min-h-screen`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
 