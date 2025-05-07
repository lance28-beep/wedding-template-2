import "./globals.css"
import { Inter } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import "@fontsource/great-vibes/400.css"
import { Metadata } from "next"
import { Toaster } from "sonner"

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

export const metadata: Metadata = {
  title: "Lance & Rosa Wedding | Join Our Celebration",
  description: "Join Lance and Rosa in celebrating their special day. RSVP, view wedding details, and share in our joy as we begin our journey together.",
  keywords: "wedding, Lance and Rosa, wedding celebration, wedding details, RSVP, wedding registry",
  authors: [{ name: "Lance and Rosa" }],
  creator: "Lance and Rosa",
  publisher: "Lance and Rosa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://wedding-template2-lilac.vercel.app/'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Lance & Rosa Wedding | Join Our Celebration",
    description: "Join Lance and Rosa in celebrating their special day. RSVP, view wedding details, and share in our joy as we begin our journey together.",
    url: 'https://lanceandrosa.com', // Replace with your actual domain
    siteName: "Lance & Rosa Wedding",
    images: [
      {
        url: '/og-image.jpg', // Add your wedding photo here
        width: 1200,
        height: 630,
        alt: 'Lance and Rosa Wedding',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lance & Rosa Wedding | Join Our Celebration",
    description: "Join Lance and Rosa in celebrating their special day. RSVP, view wedding details, and share in our joy as we begin our journey together.",
    images: ['/og-image.jpg'], // Add your wedding photo here
    creator: '@lanceandrosa', // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification', // Add your Google verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  )
}
