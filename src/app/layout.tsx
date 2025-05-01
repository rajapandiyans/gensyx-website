import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header'; // Import the new Header
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GenSyx Digital Hub',
  description: 'Modern Digital Solutions for Your Business',
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
        <Header /> {/* Use the Header component */}
        <main className="pt-16"> {/* Add padding top to account for sticky header */}
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
