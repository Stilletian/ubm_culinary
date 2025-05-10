import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "UBM's Culinary",
  description: 'Rekomendasi Makanan di Kampus Universitas Bunda Mulia Serpong',
  generator: 'v0.dev',
  icons: {
    icon: '/icons.png'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png"/>
      </head>
      <body>{children}</body>
    </html>
  )
}
