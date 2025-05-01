
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header'; // Import the Header component
import { Toaster } from '@/components/ui/toaster';
// Removed SidebarProvider and Sidebar imports as they are no longer used
// import { AppSidebar } from '@/components/app-sidebar';

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
        {/* Removed SidebarProvider wrapper */}
        {/* Removed Sidebar component */}
        {/* <AppSidebar /> Removed AppSidebar */}
        <div className="flex flex-col min-h-screen"> {/* Ensure main content area takes height */}
          <Header /> {/* Use the Header component */}
          <main className="flex-grow"> {/* Let main content grow */}
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
