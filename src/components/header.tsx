
'use client';


import  React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

// Define navigation items
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact Us' },
];

// Paths where the main navigation should be hidden or adjusted
const AUTH_PATHS = ['/login', '/signup'];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isAuthPage = AUTH_PATHS.includes(pathname);

  // Don't render header on auth pages
  if (isAuthPage) {
    return null;
  }

  const isActive = (path: string) => pathname === path || (path === '/services' && pathname.startsWith('/services/'));

  return (
    <header className="header">
      <div className="header-container justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-4 flex-shrink-0">
          {/* Updated image path to the new logo */}
          <Image
            src="/images/gensyx-logo.jpg" // Place your logo here: public/images/gensyx-logo.png
            alt="GenSyx Logo"
            width={70} // Adjust width as needed, keeping aspect ratio
            height={32} // Adjust height as needed, keeping aspect ratio
            priority // Load logo faster
            // Removed className="h-8 w-auto" to avoid conflict with width/height props
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex header-nav gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'header-nav-link',
                isActive(item.href) && 'header-nav-link-active font-semibold text-primary' // Highlight active link
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons (Placeholder) */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
           <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Login</Link>
           </Button>
           <Button variant="default" size="sm" asChild>
              <Link href="/signup">Sign Up</Link>
           </Button>
        </div>


        {/* Mobile Menu Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden ml-auto">
              <Menu />
              <span className="sr-only">Open Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-background p-6 flex flex-col">
             {/* Mobile Menu Header */}
             <div className="flex justify-between items-center mb-8 border-b pb-4">
               <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                 <Image
                   src="/images/gensyx-logo.png" // Use new logo path here too
                   alt="GenSyx Logo"
                    width={120} // Explicit width for mobile
                    height={28} // Explicit height for mobile
                   priority
                   // Removed className="h-7 w-auto" to avoid conflict with width/height props
                 />
               </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X />
                  <span className="sr-only">Close Menu</span>
                </Button>
             </div>

             {/* Mobile Navigation */}
            <nav className="flex flex-col gap-4 flex-grow">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-lg font-medium transition-colors hover:text-primary',
                     isActive(item.href) ? 'text-primary' : 'text-foreground/80'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Buttons (Placeholder) */}
            <div className="mt-auto flex flex-col gap-3 pt-6 border-t">
               <Button variant="ghost" size="lg" asChild>
                 <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
               </Button>
               <Button variant="default" size="lg" asChild>
                 <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
               </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

    