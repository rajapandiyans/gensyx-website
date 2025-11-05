
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
    default: 'GenSyx Solutions | Custom Web Development & SEO Services',
    template: '%s | GenSyx Solutions',
  },
  description: 'Top-rated Web Development and SEO company in Coimbatore. GenSyx Solutions delivers custom websites, effective SEO strategies, and reliable server management to boost your online presence. Get a free consultation today.',
  keywords: ['Custom Web Development', 'SEO Services Coimbatore', 'Website Design India', 'GenSyx Solutions', 'Server Management', 'Digital Marketing Agency', 'Brand Identity Design', 'E-commerce Website'],
  creator: 'GenSyx Solutions',
  publisher: 'GenSyx Solutions',
  openGraph: {
    title: 'GenSyx Solutions | Innovative Digital Partner',
    description: 'Expert web development, branding, and SEO services in Coimbatore to help your business grow. See our projects.',
    url: 'https://www.gensyx.com', // Replace with your actual domain
    siteName: 'GenSyx Solutions',
    images: [
      {
        url: '/images/og-image.jpg', // It's recommended to create a social sharing image at this path
        width: 1200,
        height: 630,
        alt: 'GenSyx Solutions - Digital Services for Web and SEO',
      },
    ],
    locale: 'en_IN', // Changed to India English
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GenSyx Solutions | Custom Web Development & SEO Services',
    description: 'Elevate your digital presence with our expert web, branding, and SEO services. Based in Coimbatore, serving globally.',
    images: ['/images/og-image.jpg'], // Use the same image as Open Graph
    creator: '@GensyxSolutions', // Added your twitter handle
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
  metadataBase: new URL('https://www.gensyx.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
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
    areaServed: 'IN',
    availableLanguage: ['en'],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Coimbatore',
    addressRegion: 'TN',
    addressCountry: 'IN',
  },
  description: 'GenSyx Solutions is a top-rated digital agency in Coimbatore, India, specializing in high-quality Website Development, Search Engine Optimization (SEO), and Brand Identity services.',
  hasOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Website Design & Development',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Branding & Identity',
      },
    },
  ],
  sameAs: [
    'https://github.com/Gensyx-Solutions',
    'https://x.com/GensyxSolutions',
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
