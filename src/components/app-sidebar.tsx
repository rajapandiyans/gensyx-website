'use client';

import Link from 'next/link';
import Image from 'next/image'; // Import next/image
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, Info, BriefcaseBusiness, Handshake, Mail, LogIn, UserPlus } from 'lucide-react';

// Paths where the main navigation should be hidden
const AUTH_PATHS = ['/login', '/signup'];

export function AppSidebar() {
  const pathname = usePathname();
  const isAuthPage = AUTH_PATHS.includes(pathname);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <SidebarHeader className="flex items-center justify-between p-4 border-b border-sidebar-border">
         {/* Use the uploaded logo */}
         <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/gensyx-logo.png" // Corrected path relative to the public folder
              alt="GenSyx Logo"
              width={130}
              height={30}
              priority // Load logo quickly
            />
          </Link>
        <SidebarTrigger className="md:hidden" />
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto p-4">
        {/* Conditionally render the main menu */}
        {!isAuthPage && (
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/')}
                  tooltip="Home"
                >
                  <Link href="/">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/about')}
                  tooltip="About"
                >
                  <Link href="/about">
                    <Info />
                    <span>About</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/projects')}
                  tooltip="Projects"
                >
                  <Link href="/projects">
                    <BriefcaseBusiness />
                    <span>Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/services')}
                  tooltip="Services"
                >
                  <Link href="/services">
                    <Handshake />
                    <span>Services</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/contact')}
                  tooltip="Contact Us"
                >
                  <Link href="/contact">
                    <Mail />
                    <span>Contact Us</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
        )}
      </SidebarContent>
       {/* Always show footer with auth buttons, adjust based on auth state later */}
       {!isAuthPage && (
           <SidebarFooter className="p-4 border-t border-sidebar-border">
            {/* TODO: Implement actual auth state logic here to show/hide buttons */}
            <div className="flex flex-col gap-2">
               <Button variant="outline" size="sm" asChild>
                 <Link href="/login">
                   <LogIn className="mr-2 h-4 w-4" /> Login
                 </Link>
               </Button>
               <Button variant="default" size="sm" asChild>
                 <Link href="/signup">
                  <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                </Link>
              </Button>
            </div>
           </SidebarFooter>
       )}
    </>
  );
}
