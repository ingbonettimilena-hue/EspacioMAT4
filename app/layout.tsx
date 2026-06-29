import type { Metadata } from 'next'
import { Playfair_Display, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { CustomCursor } from '@/components/custom-cursor'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

const lora = Lora({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Espacio MAT | Psicología Gestáltica & Coaching Ontológico',
  description: 'Fusión holística entre Psicología gestáltica y Coaching ontológico. Descubre tus dones y talentos, emprendé tu proyecto de vida y tu misión.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/logo.jpeg',
        sizes: '32x32',
        type: 'image/jpeg',
      },
    ],
    apple: '/logo.jpeg',
    shortcut: '/logo.jpeg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${lora.variable} bg-background`}>
      <body className="font-sans antialiased">
        <CustomCursor />
        {children}
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}
