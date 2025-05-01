
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft, PanelLeftOpen, PanelLeftClose } from "lucide-react" // Updated icons

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet" // Added SheetTrigger
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem" // Default width
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "4rem" // Increased icon-only width for better spacing
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
  variant?: "sidebar" | "floating" | "inset"; // Add variant to context
  collapsible?: "offcanvas" | "icon" | "none"; // Add collapsible to context
  side?: "left" | "right"; // Add side to context
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
    // Pass variant, collapsible, side through provider props
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
    side?: "left" | "right"
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      variant = "sidebar", // Default variant
      collapsible = "icon", // Default collapsible
      side = "left", // Default side
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    const [_open, _setOpen] = React.useState(() => {
        // Read initial state from cookie if available
        if (typeof document !== 'undefined') {
            const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith(`${SIDEBAR_COOKIE_NAME}=`))
            ?.split('=')[1];
            if (cookieValue) {
                return cookieValue === 'true';
            }
        }
        return defaultOpen;
    });

    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // This sets the cookie to keep the sidebar state.
        if (typeof document !== 'undefined') {
            document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
        }
      },
      [setOpenProp, open]
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
        variant, // Provide variant in context
        collapsible, // Provide collapsible in context
        side, // Provide side in context
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar, variant, collapsible, side]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full",
              // Apply inset styles directly here if needed
              "has-[[data-variant=inset]]:bg-transparent", // Make wrapper transparent for inset
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentProps<"div">, 'side'> // Omit side from props as it's now from context
>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile, toggleSidebar, variant, collapsible, side } = useSidebar();

    // Always render the trigger for mobile
     const mobileTrigger = (
        <SheetTrigger asChild className="md:hidden fixed top-4 left-4 z-50">
          <Button variant="outline" size="icon" className="shadow-lg">
            <PanelLeftOpen size={18} />
            <span className="sr-only">Open Menu</span>
          </Button>
        </SheetTrigger>
      );

    if (collapsible === "none") {
      return (
         <>
            {mobileTrigger}
             <div
              className={cn(
                 "hidden md:flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground border-r", // Add border for non-collapsible
                 side === 'right' && 'border-l border-r-0',
                 className
              )}
              ref={ref}
              {...props}
             >
              {children}
            </div>
         </>
      )
    }

    // Mobile view uses Sheet
    if (isMobile) {
      return (
         <>
           {mobileTrigger}
            <Sheet open={openMobile} onOpenChange={setOpenMobile}>
              {/* Removed SheetTrigger from here, placed outside */}
              <SheetContent
                 data-sidebar="sidebar"
                 data-mobile="true"
                 className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
                 style={
                   {
                     "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                   } as React.CSSProperties
                 }
                 side={side}
              >
                 <div className="flex h-full w-full flex-col">{children}</div>
               </SheetContent>
             </Sheet>
         </>
      )
    }

    // Desktop view
    return (
      <div
        ref={ref}
        className={cn(
          "group peer hidden md:block text-sidebar-foreground transition-all duration-300 ease-in-out z-10", // Ensure sidebar is above content
          variant === 'floating' && 'p-2', // Padding for floating variant container
          variant === 'inset' && 'p-2', // Padding for inset variant container
          className
        )}
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
        style={{
           width: variant === 'floating' || variant === 'inset'
               ? (state === 'expanded' ? `calc(var(--sidebar-width) + theme(spacing.4))` : `calc(var(--sidebar-width-icon) + theme(spacing.4))`)
               : (state === 'expanded' ? 'var(--sidebar-width)' : 'var(--sidebar-width-icon)'),
           position: variant === 'floating' || variant === 'inset' ? 'relative' : 'relative', // Keep relative for layout flow
        }}
        {...props}
      >
         {/* The actual sidebar element */}
         <div
           data-sidebar="sidebar"
           className={cn(
               "flex h-full w-full flex-col bg-sidebar transition-all duration-300 ease-in-out overflow-hidden", // Ensure smooth transition
               (variant === 'floating' || variant === 'inset') && 'rounded-lg border border-sidebar-border/70 shadow-lg', // Styles for floating/inset
               variant === 'sidebar' && (side === 'left' ? 'border-r border-sidebar-border/70' : 'border-l border-sidebar-border/70') // Border for default sidebar
           )}
         >
           {children}
         </div>
        {/* Sidebar Rail - only for non-floating/inset */}
        {(variant === 'sidebar' && collapsible === 'icon') && <SidebarRail />}
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

// SidebarTrigger - Primarily for mobile now, integrated into header for desktop
const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("md:hidden h-7 w-7", className)} // Hide on desktop
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftOpen />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

// SidebarRail - For resizing/toggling on desktop for the 'sidebar' variant
const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar, side, state } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar (Ctrl+B)"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-5 transition-all ease-linear group", // Group for hover effect
        "after:absolute after:inset-y-0 after:w-[3px] after:transition-colors after:duration-200", // The visible line
        "hover:after:bg-primary/50", // Hover effect on the line
        side === 'left' ? "right-0 translate-x-1/2 after:left-1/2 cursor-ew-resize" : "left-0 -translate-x-1/2 after:right-1/2 cursor-ew-resize",
        "md:flex", // Only show on desktop
        className
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

// SidebarInset - Main content area
const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
   const { state, variant } = useSidebar(); // Access variant from context

  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background transition-all duration-300 ease-in-out",
         // No specific inset styling needed here if Sidebar handles its own padding/margin
        className
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

// SidebarInput - Input field within the sidebar
const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  const { state } = useSidebar()
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-9 w-full bg-sidebar-accent/50 border-sidebar-border shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring placeholder:text-muted-foreground/70 transition-opacity duration-200",
        state === 'collapsed' && 'opacity-0 pointer-events-none', // Hide when collapsed
        className
      )}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

// SidebarHeader - Container for the top section of the sidebar
const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)} // Reduced padding slightly
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

// SidebarFooter - Container for the bottom section
const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2 mt-auto", className)} // Ensure footer sticks to bottom
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

// SidebarSeparator - Visual separator
const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  const { state } = useSidebar()
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn(
          "mx-2 w-auto bg-sidebar-border/70 transition-opacity duration-200",
          state === 'collapsed' && 'opacity-0', // Hide when collapsed
          className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

// SidebarContent - Main scrollable content area
const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden", // Allow vertical scroll, hide horizontal
        "scrollbar-thin scrollbar-thumb-muted-foreground/30 hover:scrollbar-thumb-muted-foreground/50 scrollbar-track-transparent", // Custom scrollbar
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

// SidebarGroup - A section within the sidebar, often with a label
const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col px-2 py-1", className)} // Adjusted padding
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

// SidebarGroupLabel - Label for a SidebarGroup
const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"
  const { state } = useSidebar()

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "duration-200 flex h-7 shrink-0 items-center px-2 text-xs font-medium text-sidebar-foreground/60 transition-opacity ease-linear",
        state === 'collapsed' ? "opacity-0 h-0 p-0 m-0 pointer-events-none" : "opacity-100", // Hide smoothly
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

// SidebarGroupAction - Action button within a SidebarGroupLabel (e.g., add button)
const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  const { state } = useSidebar()

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-[calc(50%-10px)] flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-opacity hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        state === 'collapsed' ? "opacity-0 pointer-events-none" : "opacity-100", // Hide when collapsed
        className
      )}
      {...props}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

// SidebarGroupContent - Content area within a SidebarGroup
const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

// SidebarMenu - List container for menu items
const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-0.5", className)} // Reduced gap slightly
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

// SidebarMenuItem - List item wrapper for menu buttons
const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

// SidebarMenuButton variants
const sidebarMenuButtonVariants = cva(
  "peer/menu-button relative flex w-full items-center gap-2.5 overflow-hidden rounded-md px-2.5 py-2 text-left text-sm outline-none ring-sidebar-ring transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent/80 active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-primary data-[active=true]:font-semibold data-[active=true]:text-sidebar-primary-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:size-10 [&>span]:opacity-100 [&>span]:transition-opacity [&>span]:duration-150 [&>span]:ease-linear group-data-[collapsible=icon]:[&>span]:w-0 group-data-[collapsible=icon]:[&>span]:opacity-0 group-data-[collapsible=icon]:[&>span]:p-0 group-data-[collapsible=icon]:[&>span]:m-0 [&>svg]:size-5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "", // Base styles handled above
        outline: "border border-sidebar-border hover:border-sidebar-accent",
      },
      size: { // Simplified sizes or keep as is
        default: "h-10", // Base height adjusted
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)


// SidebarMenuButton - The actual button/link component
const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement, // Can be button or anchor
  (React.ComponentProps<"button"> | React.ComponentProps<"a">) & { // Union of props
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      children, // Accept children
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"; // Default to button if not asChild
    const { state, isMobile } = useSidebar();

    // Determine if the component should be rendered as an anchor tag
    // This assumes if `href` prop is present, it's intended as a link.
    const isLink = typeof props === 'object' && props !== null && 'href' in props;
    const Element = asChild ? Slot : (isLink ? 'a' : 'button');


    // Create the button/link element directly using Element
    const buttonElement = (
      <Element
        ref={ref as any} // Use 'any' for ref due to union type complexity
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props} // Spread the remaining props
      >
        {children} {/* Render children passed to the button */}
      </Element>
    );

    // Tooltip logic: Show only when collapsed and not on mobile
    const showTooltip = state === 'collapsed' && !isMobile && tooltip;

    if (!showTooltip) {
      return buttonElement;
    }

    let tooltipContentProps: React.ComponentProps<typeof TooltipContent> = {};
    if (typeof tooltip === "string") {
      tooltipContentProps = { children: tooltip };
    } else {
      tooltipContentProps = tooltip;
    }

    return (
      <Tooltip>
         {/* Remove asChild here as the buttonElement is already the trigger */}
        <TooltipTrigger>{buttonElement}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          sideOffset={10} // Adjust offset
          className="bg-background text-foreground border-border shadow-lg" // Style tooltip
          {...tooltipContentProps}
        />
      </Tooltip>
    );
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";


// SidebarMenuAction - Action button within a menu item (e.g., edit, delete)
const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    showOnHover?: boolean
  }
>(({ className, asChild = false, showOnHover = true, ...props }, ref) => { // Default showOnHover to true
  const Comp = asChild ? Slot : "button"
  const { state } = useSidebar()

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1.5 top-1/2 -translate-y-1/2 flex aspect-square w-6 h-6 items-center justify-center rounded-md p-0 text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-opacity hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        state === 'collapsed' ? "opacity-0 pointer-events-none" : "", // Hide when collapsed
        showOnHover && "opacity-0 group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100", // Hover effect
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

// SidebarMenuBadge - Badge indicator on a menu item
const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { state } = useSidebar()
  return (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        "absolute right-2 top-1/2 -translate-y-1/2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold tabular-nums text-primary-foreground select-none pointer-events-none transition-opacity duration-200",
        state === 'collapsed' ? "opacity-0 pointer-events-none" : "opacity-100", // Hide when collapsed
        className
      )}
      {...props}
    />
)})
SidebarMenuBadge.displayName = "SidebarMenuBadge"

// SidebarMenuSkeleton - Skeleton loader for menu items
const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean
  }
>(({ className, showIcon = true, ...props }, ref) => {
  const { state } = useSidebar()
  const width = React.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, [])

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn(
        "rounded-md h-10 flex gap-2.5 px-2.5 items-center",
         state === 'collapsed' && 'justify-center px-0 size-10',
        className
      )}
      {...props}
    >
      {showIcon && (
        <Skeleton className="size-5 rounded-md shrink-0" />
      )}
      {state === 'expanded' && (
         <Skeleton
           className="h-4 flex-1 max-w-[--skeleton-width]"
           style={{ "--skeleton-width": width } as React.CSSProperties}
         />
      )}
    </div>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

// SidebarMenuSub - Container for sub-menu items
const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => {
  const { state } = useSidebar()
  return (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        "ml-5 flex min-w-0 flex-col gap-0.5 border-l border-sidebar-border/70 pl-3.5 py-1 transition-opacity duration-200",
        state === 'collapsed' ? "opacity-0 h-0 p-0 m-0 pointer-events-none" : "opacity-100", // Hide when collapsed
        className
      )}
      {...props}
    />
)})
SidebarMenuSub.displayName = "SidebarMenuSub"

// SidebarMenuSubItem - List item wrapper for sub-menu buttons
const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => <li ref={ref} className={cn("relative", className)} {...props} />) // Added relative positioning
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

// SidebarMenuSubButton - Button/link component for sub-menu items
const SidebarMenuSubButton = React.forwardRef<
   HTMLButtonElement | HTMLAnchorElement, // Allow button or anchor
   (React.ComponentProps<"button"> | React.ComponentProps<"a">) & { // Union of props
    asChild?: boolean
    size?: "sm" | "md" // Keep sizes if needed
    isActive?: boolean
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
   const isLink = typeof props === 'object' && props !== null && 'href' in props;
   const Comp = asChild ? Slot : (isLink ? 'a' : 'button');
   const { state } = useSidebar()

  return (
    <Comp
      ref={ref as any} // Use 'any' for ref due to union type complexity
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex w-full h-8 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 py-1.5 text-sidebar-foreground/80 outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent/80 active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium",
        size === "sm" && "text-xs h-7",
        size === "md" && "text-sm",
        state === 'collapsed' ? "opacity-0 pointer-events-none" : "opacity-100", // Hide when collapsed
        className
      )}
      {...props} // Spread the remaining props
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"


// Exports
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}


