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
  title: 'Bravine Alusiola - Software Engineer & Backend Developer',
  description: 'Backend Engineer with 3+ years of experience building scalable APIs, e-commerce platforms, and event-driven systems. Specialized in Node.js, Vendure.js, and Azure AD B2C.',
  keywords: 'Backend Developer, Node.js, Vendure.js, Azure AD B2C, Kong API Gateway, Elasticsearch, MongoDB, Docker, Software Engineer, Portfolio',
  authors: [{ name: 'Bravine Alusiola' }],
  creator: 'Bravine Alusiola',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bravine.dev',
    title: 'Bravine Alusiola - Software Engineer & Backend Developer',
    description: 'Backend Engineer with 3+ years of experience building scalable APIs, e-commerce platforms, and event-driven systems.',
    siteName: 'Bravine Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bravine Alusiola - Software Engineer & Backend Developer',
    description: 'Backend Engineer with 3+ years of experience building scalable APIs, e-commerce platforms, and event-driven systems.',
    creator: '@LuckyBravine',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
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
