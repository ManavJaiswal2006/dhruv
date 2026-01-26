import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Unbreakable Vow - A Magical Proposal',
  description: 'I solemnly swear that I am up to no good...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-handwritten">{children}</body>
    </html>
  )
}
