
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Rocket, Code } from "lucide-react"; // Add relevant icons

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 overflow-hidden perspective-1000"> {/* Add perspective */}
      {/* Hero Section Card with 3D rotate-in animation */}
      <Card className="w-full max-w-4xl text-center card-base animate-rotate-in bg-gradient-to-br from-card via-primary/5 to-secondary/10 backdrop-blur-lg border-primary/10 shadow-2xl transform-style-3d">
        <CardHeader className="pt-10 pb-6 animate-fade-in-down">
           {/* Animated Icon with Floating Effect */}
           <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tl from-primary/10 via-primary/20 to-primary/10 text-primary animate-float transform-style-3d"> {/* Apply float animation */}
             <Zap size={50} strokeWidth={1.5} />
           </div>
          <CardTitle className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Elevate Your Digital Presence
          </CardTitle>
          <CardDescription className="mt-3 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            GenSyx Solutions: Crafting innovative web experiences, driving growth with strategic marketing, and building brands that resonate.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p className="mb-10 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            We blend creativity with technology to deliver cutting-edge digital solutions. From sleek websites to impactful marketing campaigns, partner with us to transform your vision into reality and achieve remarkable results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-all duration-300 animate-subtle-scale-in transform hover:scale-105 hover:translate-z-[5px]" style={{ animationDelay: '0.4s' }}>
              <Link href="/services">
                 {/* Removed span, icon and text are direct children of Link */}
                 <Rocket className="mr-2" /> {/* Added margin back */}
                 Discover Our Services
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="shadow-md hover:shadow-lg transition-all duration-300 animate-subtle-scale-in transform hover:scale-105 hover:translate-z-[5px]" style={{ animationDelay: '0.5s' }}>
              <Link href="/contact">
                 {/* Removed span, icon and text are direct children of Link */}
                 <Code className="mr-2" /> {/* Added margin back */}
                 Let's Build Together
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Optional: Add subtle background elements or shapes for more depth */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
         {/* Use 3D transforms for background elements */}
         <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-2000 transform rotate-x-45 rotate-y-30 translate-z-[-100px]"></div>
         <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/5 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000 transform rotate-x-[-30deg] rotate-y-[-20deg] translate-z-[-150px]"></div>
       </div>
    </div>
  );
}
