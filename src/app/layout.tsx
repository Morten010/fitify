import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../components/providers/ThemeProvider'
import ReactQueryProvider from '../components/providers/ReactQueryProvider'
import Provider from '../components/providers/Provider'
import { Toaster } from '../components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Fitness App - Your Path to a Healthier You",
  description: "Discover a wide range of workout programs designed to help you achieve your fitness goals. Join our community and embark on a journey to better health and wellness.",
  manifest: "/manifest.json",
  themeColor: "#2563EB",
  
  icons: [
    { rel: "apple-touch-icon", url: "/icon-512x512.png" },
    { rel: "shortcut icon", url: "/favicon.ico" },
  ],
  keywords: ["fitify", "workout", "workout app", "workout program", "custom workout Routine", "workout app"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ReactQueryProvider>
                {children}
                <Toaster />
            </ReactQueryProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
