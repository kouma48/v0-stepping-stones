import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import SiteHeader from '@/components/site-header'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Stepping Stones School',
  description: 'A nurturing independent school offering outstanding education from Early Years through to Sixth Form.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <SiteHeader />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
