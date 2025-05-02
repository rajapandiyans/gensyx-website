'use client';

import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarFooter,
  SidebarHeading,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarOverlay,
  SidebarContent,
  SidebarClose,
} from '@/components/ui/sidebar';
import {
  Home,
  Briefcase,
  Settings,
  User,
  LogOut,
  Info,
  Mails,
  LayoutGrid,
  SquareCode,
  Menu as MenuIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';


const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: Info },
  { href: '/projects', label: 'Projects', icon: SquareCode },
  { href: '/services', label: 'Services', icon: LayoutGrid },
  { href: '/contact', label: 'Contact', icon: Mails },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') {
      return false;
    }
    return pathname.startsWith(path);
  };


  return (
      <>
       <SidebarTrigger asChild>
         <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm">
           <MenuIcon />
           <span className="sr-only">Toggle Sidebar</span>
         </Button>
       </SidebarTrigger>

      <SidebarContent>
        <SidebarHeader>
          {/* Replaced Logo Image with Text */}
           <Link href="/" className="flex items-center gap-2">
             <span className="text-xl font-bold tracking-tight text-foreground">
               Gen<span style={{ color: '#cbacf9' }}>Syx</span>
             </span>
           </Link>
           <SidebarClose />
        </SidebarHeader>

        <SidebarBody className="flex-grow">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem
                key={item.href}
                href={item.href}
                icon={<item.icon size={18} />}
                active={isActive(item.href)}
              >
                {item.label}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarBody>

         <SidebarFooter>
             <p className="text-xs text-muted-foreground text-center px-4 pb-2">
               © 2025 GenSyx Solutions
             </p>
         </SidebarFooter>
      </SidebarContent>
      <SidebarOverlay />
    </>
  );
}