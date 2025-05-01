import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Rocket, Code } from "lucide-react"; // Icons for buttons

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 md:px-8 overflow-hidden animate-background-pan"> {/* Adjust min-height for header, add background animation */}

      {/* Background overlay/gradient (optional, for visual effect) */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/50 z-0"></div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl py-20 md:py-32">

        {/* Animated Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6 animate-fade-in-down">
          The <span className="text-primary">Harmonized Arena</span> for
        </h1>

        {/* Description */}
        <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          We are the leading provider of comprehensive <span className="font-semibold text-foreground">Digital Solutions and Services</span> to organizations worldwide.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
           <Button asChild size="lg" className="shadow-md hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-semibold">
             <Link href="/services">
               {/* Ensure single child wrapper */}
               <span className="flex items-center justify-center gap-2">
                 <Rocket className="h-5 w-5" />
                 Our Services
               </span>
             </Link>
           </Button>
           <Button variant="outline" size="lg" asChild className="shadow-md hover:shadow-secondary/30 transition-all duration-300 transform hover:scale-105 hover:bg-secondary/10 border-secondary text-secondary px-8 py-3 text-base font-semibold">
             <Link href="/contact">
               {/* Ensure single child wrapper */}
               <span className="flex items-center justify-center gap-2">
                 <Code className="h-5 w-5" />
                 Get in Touch
               </span>
             </Link>
           </Button>
         </div>
      </div>

        {/* Subtle Background Elements (Similar to reference image's lines) */}
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-10 dark:opacity-5">
           {/* Add more complex/abstract background shapes if desired */}
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                 <circle id="pattern-circle" cx="20" cy="20" r="1" fill="hsl(var(--foreground) / 0.5)"></circle>
               </pattern>
               <pattern id="pattern-lines" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                   <line x1="0" y1="0" x2="0" y2="50" stroke="hsl(var(--foreground) / 0.3)" strokeWidth="0.5"/>
                   <line x1="0" y1="0" x2="50" y2="0" stroke="hsl(var(--foreground) / 0.3)" strokeWidth="0.5"/>
               </pattern>
             </defs>
              {/* Mix patterns or use just one */}
             <rect width="100%" height="100%" fill="url(#pattern-lines)"></rect>
             {/* <rect width="100%" height="100%" fill="url(#pattern-circles)"></rect> */}
           </svg>
       </div>

    </div>
  );
}
