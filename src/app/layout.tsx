import type { Metadata } from 'next'
import './globals.css'

// Ganti URL ini dengan domain kamu setelah deploy
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.vercel.app'

const frameEmbed = {
  version: "1",
  imageUrl: `${APP_URL}/og-image.png`,
  button: {
    title: "🎮 Play 2048",
    action: {
      type: "launch_frame",
      name: "2048 Game",
      url: APP_URL,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: "#0f0f23"
    }
  }
}

export const metadata: Metadata = {
  title: '2048 Game | Farcaster Mini App',
  description: 'Play the classic 2048 puzzle game on Farcaster!',
  openGraph: {
    title: '2048 Game',
    description: 'Challenge yourself with the addictive 2048 puzzle game!',
    images: [`${APP_URL}/og-image.png`],
  },
  other: {
    'fc:miniapp': JSON.stringify(frameEmbed),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
