import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import localFont from "next/font/local"
import "../globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const roxborough = localFont({
  src: "../../public/fonts/RoxboroughCF.ttf",
  variable: "--font-roxborough",
})

export const metadata: Metadata = {
  title: "Header Embed",
  description: "Stepping Stones School Header",
}

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roxborough.variable}`}>
      <body style={{ margin: 0, padding: 0, background: "transparent", overflow: "hidden" }}>
        {children}
      </body>
    </html>
  )
}
