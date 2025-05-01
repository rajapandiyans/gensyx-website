import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react"; // Icon for hero section

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <Card className="w-full max-w-3xl text-center shadow-lg animate-subtle-fade-in border border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardHeader className="animate-subtle-slide-up">
           {/* Placeholder for animated hero section element */}
           <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary animate-pulse">
             <Zap size={40} />
           </div>
          <CardTitle className="text-4xl font-bold tracking-tight text-foreground">
            Welcome to GenSyx Digital Hub
          </CardTitle>
          <CardDescription className="mt-2 text-lg text-muted-foreground">
            Your Partner in Digital Transformation
          </CardDescription>
        </CardHeader>
        <CardContent className="animate-subtle-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="mb-8 text-base leading-relaxed">
            GenSyx Solutions crafts cutting-edge digital experiences. We specialize in innovative web development, strategic digital marketing, and compelling branding to elevate your online presence and drive growth. Let's build the future, together.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/services">Explore Services</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
