import './globals.css'
import { Inter, Poppins, Playfair_Display } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'Bravine Alusiola - Frontend Developer',
  description: 'Professional Frontend Developer specializing in React, TypeScript, and modern web technologies. Creating stunning, responsive, and performant web experiences.',
  keywords: 'Frontend Developer, React, TypeScript, Next.js, Web Development, Portfolio',
  authors: [{ name: 'Bravine Alusiola' }],
  creator: 'Bravine Alusiola',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bravine.dev',
    title: 'Bravine Alusiola - Frontend Developer',
    description: 'Professional Frontend Developer specializing in React, TypeScript, and modern web technologies.',
    siteName: 'Bravine Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bravine Alusiola - Frontend Developer',
    description: 'Professional Frontend Developer specializing in React, TypeScript, and modern web technologies.',
    creator: '@LuckyBravine',
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${playfair.variable}`}>
      <body className="font-inter antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}
