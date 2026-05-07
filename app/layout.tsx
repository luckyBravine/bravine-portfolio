import './globals.css'
import { Inter, Poppins, Playfair_Display } from 'next/font/google'
import { CapabilityProvider } from '@/lib/contexts/capability-context'
import OfflineIndicator from '@/components/layout/OfflineIndicator'

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
  title: 'Micheal Atandi - Software Engineer & Backend Developer',
  description: 'Backend Engineer with 3+ years of experience building scalable APIs, e-commerce platforms, and event-driven systems. Specialized in Node.js, Vendure.js, and Azure AD B2C.',
  keywords: 'Backend Developer, Node.js, Vendure.js, Azure AD B2C, Kong API Gateway, Elasticsearch, MongoDB, Docker, Software Engineer, Portfolio',
  authors: [{ name: 'Micheal Atandi' }],
  creator: 'Micheal Atandi',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bravine.dev',
    title: 'Micheal Atandi - Software Engineer & Backend Developer',
    description: 'Backend Engineer with 3+ years of experience building scalable APIs, e-commerce platforms, and event-driven systems.',
    siteName: 'Micheal Atandi Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Micheal Atandi - Software Engineer & Backend Developer',
    description: 'Backend Engineer with 3+ years of experience building scalable APIs, e-commerce platforms, and event-driven systems.',
    creator: '@LuckyBravine',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Micheal Atandi Portfolio',
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
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-inter antialiased bg-gray-900 text-gray-100">
        <CapabilityProvider>
          <OfflineIndicator />
          {children}
        </CapabilityProvider>
      </body>
    </html>
  )
}
