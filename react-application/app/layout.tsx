import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "@/components/ClientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "React Application",
  description: "A comprehensive application with Counter, User Form, and Rich Text Editor",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}



import './globals.css'