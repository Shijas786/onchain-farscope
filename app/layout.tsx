import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Based Oracle | Your Onchain Destiny",
  description: "Your onchain destiny, written in the blocks. Connect your wallet and discover what the chain foretells.",
  icons: {
    icon: [
      { url: '/oracle-icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/oracle-icon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/oracle-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/oracle-icon.png',
      },
    ],
  },
  openGraph: {
    title: "The Based Oracle",
    description: "Your onchain destiny, written in the blocks",
    images: ["/oracle-icon.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Based Oracle",
    description: "Your onchain destiny, written in the blocks",
    images: ["/oracle-icon.png"],
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

