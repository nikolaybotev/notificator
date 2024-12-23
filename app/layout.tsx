import React from 'react'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import './globals.css'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import Header from './components/Header'
import { TRPCProvider } from '@/providers/trpc'
import { NotificationsProvider } from '@/providers/notifications'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import NotificationsPrefetch from './components/NotificationsPrefetch'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern Next.js App',
  description: 'Built with Next.js 14 and Radix UI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ padding: '20px' }}>
        <TRPCProvider>
          <NotificationsProvider>
            <ThemeProvider attribute="class">
              <Theme accentColor="blue" radius="medium">
                <Header />
                {children}
                <NotificationsPrefetch />
              </Theme>
            </ThemeProvider>
          </NotificationsProvider>
        </TRPCProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
