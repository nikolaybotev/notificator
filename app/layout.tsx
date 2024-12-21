import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import Header from "./components/Header"
import { TRPCProvider } from '@/providers/trpc'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Modern Next.js App",
  description: "Built with Next.js 14 and Radix UI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ padding: "20px" }}>
        <TRPCProvider>
          <Theme appearance="light" accentColor="blue" radius="medium">
            <Header />
            {children}
          </Theme>
        </TRPCProvider>
      </body>
    </html>
  )
} 