import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/Toast';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bellybento.com'),
  title: 'BellyBento - Homemade Tiffins, Delivered Daily',
  description: 'Join the waitlist for BellyBento - connecting you with trusted tiffin providers in your area. Fresh, homemade meals delivered to your doorstep daily.',
  keywords: ['tiffin service', 'homemade food', 'food delivery', 'daily meals', 'tiffin provider'],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'BellyBento - Homemade Tiffins, Delivered Daily',
    description: 'Join the waitlist for BellyBento - connecting you with trusted tiffin providers in your area.',
    type: 'website',
    url: 'https://bellybento.com',
    siteName: 'BellyBento',
    images: [
      {
        url: '/bellybento_banner.png',
        width: 1200,
        height: 630,
        alt: 'BellyBento - Homemade Tiffins, Delivered Daily',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BellyBento - Homemade Tiffins, Delivered Daily',
    description: 'Join the waitlist for BellyBento - connecting you with trusted tiffin providers in your area.',
    images: ['/bellybento_banner.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
