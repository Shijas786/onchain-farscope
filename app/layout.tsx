import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Onchain Horoscope | Your Cosmic Degen Destiny",
  description: "Get your personalized onchain horoscope based on your Base wallet activity. Connect your wallet and discover your cosmic degen destiny!",
  openGraph: {
    title: "Onchain Horoscope",
    description: "Discover your cosmic degen destiny based on your onchain activity",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Onchain Horoscope",
    description: "Discover your cosmic degen destiny based on your onchain activity",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

