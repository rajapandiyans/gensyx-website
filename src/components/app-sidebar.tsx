'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar, // Import useSidebar hook
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, Info, BriefcaseBusiness, Handshake, Mail, LogIn, UserPlus, PanelLeftOpen, PanelLeftClose } from 'lucide-react';

// Paths where the main navigation should be hidden or adjusted
const AUTH_PATHS = ['/login', '/signup'];

export function AppSidebar() {
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar(); // Get sidebar state and toggle function
  const isAuthPage = AUTH_PATHS.includes(pathname);

  const isActive = (path: string) => pathname === path || (path === '/services' && pathname.startsWith('/services/')); // Highlight services parent link

  return (
    <>
      <SidebarHeader className="flex items-center justify-between p-3 border-b border-sidebar-border/50">
         <Link href="/" className="flex items-center gap-2 overflow-hidden" aria-label="Go to Homepage">
            <Image
              src="/images/gensyx-logo.png"
              alt="GenSyx Logo"
              width={state === 'expanded' ? 120 : 32} // Adjust size based on state
              height={state === 'expanded' ? 28 : 32} // Adjust size based on state
              priority
              className={`transition-all duration-300 ease-in-out ${state === 'collapsed' ? 'rounded-full' : ''}`} // Smooth transition and round when collapsed
            />
             {state === 'expanded' && <span className="font-semibold text-lg whitespace-nowrap">GenSyx</span>}
          </Link>
        {/* Trigger is now part of the header in floating mode */}
        {/* <SidebarTrigger className="md:hidden" /> */}
        {/* Button to toggle sidebar manually */}
         <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex h-8 w-8 text-muted-foreground hover:text-foreground">
           {state === 'expanded' ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
           <span className="sr-only">Toggle Sidebar</span>
         </Button>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto p-2">
        {/* Conditionally render the main menu */}
        {!isAuthPage && (
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/')}
                  tooltip={{ children: "Home", side: "right", align: "center", sideOffset: 10 }}
                >
                  <Link href="/">
                     {/* Wrap icon and text in a single span */}
                     <span className="flex items-center gap-2.5">
                       <Home />
                       <span>Home</span>
                     </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/about')}
                   tooltip={{ children: "About Us", side: "right", align: "center", sideOffset: 10 }}
                >
                  <Link href="/about">
                    {/* Wrap icon and text in a single span */}
                    <span className="flex items-center gap-2.5">
                       <Info />
                       <span>About Us</span>
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/projects')}
                   tooltip={{ children: "Our Projects", side: "right", align: "center", sideOffset: 10 }}
                >
                  <Link href="/projects">
                     {/* Wrap icon and text in a single span */}
                     <span className="flex items-center gap-2.5">
                       <BriefcaseBusiness />
                       <span>Projects</span>
                     </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/services')}
                   tooltip={{ children: "Services Offered", side: "right", align: "center", sideOffset: 10 }}
                >
                  <Link href="/services">
                     {/* Wrap icon and text in a single span */}
                     <span className="flex items-center gap-2.5">
                       <Handshake />
                       <span>Services</span>
                     </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/contact')}
                   tooltip={{ children: "Contact Us", side: "right", align: "center", sideOffset: 10 }}
                >
                  <Link href="/contact">
                    {/* Wrap icon and text in a single span */}
                    <span className="flex items-center gap-2.5">
                       <Mail />
                       <span>Contact Us</span>
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
        )}
        {/* Placeholder for no menu on auth pages */}
        {isAuthPage && state === 'expanded' && (
          <div className="p-4 text-sm text-muted-foreground text-center">
            Navigation is hidden on authentication pages.
          </div>
        )}
      </SidebarContent>

       {/* Footer: Adjust based on auth state and sidebar state */}
       {!isAuthPage && (
           <SidebarFooter className="p-2 border-t border-sidebar-border/50 mt-auto">
            {/* TODO: Implement actual auth state logic */}
            {state === 'expanded' ? (
              <div className="flex flex-col gap-2">
                 <Button variant="ghost" size="sm" asChild>
                   <Link href="/login">
                    {/* Ensure single child */}
                    <span className="flex items-center justify-start gap-2">
                       <LogIn /> Login
                    </span>
                   </Link>
                 </Button>
                 <Button variant="default" size="sm" asChild>
                   <Link href="/signup">
                    {/* Ensure single child */}
                    <span className="flex items-center justify-start gap-2">
                      <UserPlus /> Sign Up
                    </span>
                  </Link>
                </Button>
              </div>
            ) : (
               <div className="flex flex-col gap-2 items-center">
                  <SidebarMenuButton asChild tooltip={{ children: "Login", side: "right", align: "center", sideOffset: 10 }}>
                     <Link href="/login">
                       {/* Ensure single child */}
                       <LogIn />
                     </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild tooltip={{ children: "Sign Up", side: "right", align: "center", sideOffset: 10 }}>
                    <Link href="/signup">
                      {/* Ensure single child */}
                      <UserPlus />
                    </Link>
                  </SidebarMenuButton>
               </div>
            )}
           </SidebarFooter>
       )}
    </>
  );
}