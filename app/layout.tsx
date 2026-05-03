import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/Toast';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bellybento.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BellyBento - Homemade Tiffins, Delivered Daily',
    template: '%s | BellyBento',
  },
  description: 'Join the waitlist for BellyBento - connecting you with trusted tiffin providers in your area. Fresh, homemade meals delivered to your doorstep daily in Pune.',
  keywords: ['tiffin service', 'homemade food', 'food delivery', 'daily meals', 'tiffin provider', 'tiffin pune', 'home cooked meals', 'dabba service', 'meal subscription'],
  authors: [{ name: 'BellyBento' }],
  creator: 'BellyBento',
  publisher: 'BellyBento',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'BellyBento - Homemade Tiffins, Delivered Daily',
    description: 'Join the waitlist for BellyBento - connecting you with trusted tiffin providers in your area. Fresh, homemade meals delivered daily.',
    type: 'website',
    url: siteUrl,
    siteName: 'BellyBento',
    locale: 'en_IN',
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
    site: '@trybellybento',
    creator: '@trybellybento',
    title: 'BellyBento - Homemade Tiffins, Delivered Daily',
    description: 'Join the waitlist for BellyBento - connecting you with trusted tiffin providers in your area.',
    images: ['/bellybento_banner.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add these after setting up Search Console
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'BellyBento',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/bellybento_banner.png`,
      },
      sameAs: [
        'https://x.com/trybellybento',
        'https://www.instagram.com/trybellybento/',
        'https://www.facebook.com/trybellybento',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@bellybento.com',
        contactType: 'customer service',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'BellyBento',
      description: 'Connecting tiffin lovers with trusted home cooks',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#localbusiness`,
      name: 'BellyBento',
      description: 'Homemade tiffin delivery service connecting customers with trusted home cooks',
      url: siteUrl,
      email: 'hello@bellybento.com',
      areaServed: {
        '@type': 'City',
        name: 'Pune',
        '@id': 'https://www.wikidata.org/wiki/Q1538',
      },
      priceRange: '₹₹',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
