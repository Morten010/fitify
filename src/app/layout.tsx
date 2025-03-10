import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../components/providers/ThemeProvider'
import ReactQueryProvider from '../components/providers/ReactQueryProvider'
import Provider from '../components/providers/Provider'
import { Toaster } from '../components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

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
