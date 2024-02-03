import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/nav/Navbar'
import ToasterProvider from '@/provider/ToasterProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Company Management',
  description: 'NEXT STEP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir='rtl'>
      <body className={inter.className}>
        <ToasterProvider />
        <Navbar />
        <main className='container mx-auto px-5 pt-10'>
          {children}
        </main>
      </body>
    </html>
  )
}
