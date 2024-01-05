import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css';
import Header from '@/components/pages/main/Header/Header';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Adventurer',
  description: 'Twój przewodnik i doradca w podróżowaniu. Znajdź dopasowany do Ciebie, ooryginalny pomysł na podróż.',
  keywords: "podróż, przewodnik, pomysły, wakacje, wskazówki"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
 