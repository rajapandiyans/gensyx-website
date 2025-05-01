'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, Info, BriefcaseBusiness, Handshake, Mail, LogIn, UserPlus, Code } from 'lucide-react'; // Added Code icon

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <SidebarHeader className="flex items-center justify-between p-4">
         {/* Placeholder for Logo */}
         <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" /> {/* Placeholder Icon */}
            <span className="text-lg font-semibold text-foreground">GenSyx</span>
          </div>
        <SidebarTrigger className="md:hidden" />
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto p-4">
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
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        {/* Auth Buttons Placeholder - Implement actual auth state logic here */}
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
    </>
  );
}
