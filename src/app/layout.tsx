import './globals.css'
import { Inter } from 'next/font/google' //edit font later maybe

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Expenses',
  description: 'Keeps Track of your expenses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} container mx-auto p-4`}>{children}</body>
    </html>
  )
}
