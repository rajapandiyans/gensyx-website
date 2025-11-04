
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header'; // Import the Header component
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Enhanced Metadata for SEO and Social Sharing
export const metadata: Metadata = {
  title: {
    default: 'GenSyx Solutions | Web Development, SEO & Server Management',
    template: '%s | GenSyx Solutions',
  },
  description: 'GenSyx Solutions offers expert web development, SEO strategy, domain management, and server solutions to elevate your digital presence. Partner with us for innovative and reliable digital services.',
  keywords: ['Web Development', 'SEO', 'Domain Management', 'Server Management', 'Digital Solutions', 'GenSyx Solutions', 'Website Design'],
  creator: 'GenSyx Solutions',
  publisher: 'GenSyx Solutions',
  openGraph: {
    title: 'GenSyx Solutions | Digital Innovation Partner',
    description: 'Expert web development, SEO, and server management to grow your business.',
    url: 'https://www.gensyx.com', // Replace with your actual domain
    siteName: 'GenSyx Solutions',
    images: [
      {
        url: '/images/og-image.jpg', // It's recommended to create a social sharing image at this path
        width: 1200,
        height: 630,
        alt: 'GenSyx Solutions - Digital Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GenSyx Solutions | Web Development, SEO & Server Management',
    description: 'Elevate your digital presence with our expert web, SEO, and server management services.',
    images: ['/images/og-image.jpg'], // Use the same image as Open Graph
  },
  icons: {
    icon: '/favicon.ico', // It's recommended to have a favicon
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
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'GenSyx Solutions',
  url: 'https://www.gensyx.com', // Replace with your actual domain
  logo: 'https://www.gensyx.com/images/logo.png', // Replace with your logo URL
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9361104465',
    contactType: 'Customer Service',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Coimbatore',
    addressCountry: 'IN',
  },
  description: 'Providing high-quality Website Development, SEO, Domain, and Server Management services.',
  hasOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Website Development',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Search Engine Optimization (SEO)',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Domain Management',
      },
    },
     {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Server Management',
      },
    },
  ],
  sameAs: [
    'https://github.com/Gensyx-Solutions',
    'https://x.com/i/flow/login?redirect_after_login=%2FGensyxSolutions',
    'https://www.linkedin.com/company/gensyx-solutions/',
    'https://www.instagram.com/gensyx_solutions?igsh=OTduZ3RibWI2Nm5m',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply dark theme by default and suppress hydration warnings related to theme/class changes
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}>
        {/* Add JSON-LD to the body */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="flex flex-col min-h-screen"> {/* Ensure main content area takes height */}
          <Header /> {/* Header is now smart enough to hide itself on auth pages */}
          <main className="flex-grow"> {/* Let main content grow */}
            {children}
          </main>
        </div>
        <Toaster />

      </body>
    </html>
  );
}
