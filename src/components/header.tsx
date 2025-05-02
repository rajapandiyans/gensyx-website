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

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => pathname === path || (path === '/services' && pathname.startsWith('/services/'));

  return (
    <header className="header">
      <div className="header-container justify-between">
        {/* Logo Text */}
        <Link href="/" className="flex items-center gap-2 mr-4 flex-shrink-0">
           {/* Replaced Image with styled text */}
           <span className="text-2xl font-bold tracking-tight">
             Gen<span style={{ color: '#cbacf9' }}>Syx</span>
           </span>
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
                  {/* Replaced Image with styled text for mobile */}
                 <span className="text-xl font-bold tracking-tight">
                   Gen<span style={{ color: '#cbacf9' }}>Syx</span>
                 </span>
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
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}