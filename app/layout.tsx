import "./globals.css"
import { Inter } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import "@fontsource/great-vibes/400.css"

const greatVibes = {
  variable: "--font-script",
  style: { fontFamily: '"Great Vibes", cursive' },
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata = {
  title: "Emma & James Wedding",
  description: "Join us to celebrate our special day",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
