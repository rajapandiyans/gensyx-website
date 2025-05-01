import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Rocket, Code, Target, Eye, Zap, CheckCircle, Award, Users } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data (replace with actual data if needed)
const featuredProjects = [
 {
    id: 1,
    title: "GPT3 Integration",
    description: "Harnessing AI for creative and business solutions.",
    imageUrl: "/images/gpt3.png", // Make sure this image exists
    link: "/projects", // Link to projects page or specific project
    aiHint: "ai interface abstract technology",
  },
  {
    id: 2,
    title: "Travela Booking Platform",
    description: "Your perfect travel companion for seamless trip planning.",
    imageUrl: "/images/travela.png", // Make sure this image exists
    link: "/projects",
    aiHint: "travel website destination booking",
  },
];

const featuredServices = [
  {
    id: "website-design",
    title: "Web Design & Development",
    icon: Code,
    description: "Building responsive, high-performance websites that captivate.",
    link: "/services/website-design",
  },
  {
    id: "seo",
    title: "SEO Strategy",
    icon: Search,
    description: "Boosting visibility on search engines for organic traffic.",
    link: "/services/seo",
  },
   {
    id: "branding",
    title: "Branding & Identity",
    icon: Palette,
    description: "Crafting memorable logos and cohesive brand identities.",
    link: "/services/branding",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section with Background Image */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[calc(80vh)] md:min-h-[calc(90vh)] text-center px-4 md:px-8 py-20 md:py-32 bg-cover bg-center bg-no-repeat text-white"
        style={{ backgroundImage: "url('https://picsum.photos/seed/homepagebg/1920/1080')" }}
        data-ai-hint="modern technology abstract background"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80 z-0"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <Zap size={64} className="text-primary mb-6 animate-pulse-glow" strokeWidth={1.5}/>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-down text-shadow-lg">
             <span className="text-primary">GenSyx</span> Solutions
          </h1>
           <p className="text-lg md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             Empowering Your Digital Future with Innovative Web & Marketing Strategies.
           </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button asChild size="lg" className="shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-semibold">
              <Link href="/services">
                <span className="flex items-center justify-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Explore Services
                </span>
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="shadow-lg hover:shadow-secondary/30 transition-all duration-300 transform hover:scale-105 hover:bg-white/10 border-primary-foreground/50 text-primary-foreground hover:text-white hover:border-white px-8 py-3 text-base font-semibold">
              <Link href="/contact">
                <span className="flex items-center justify-center gap-2">
                  <Code className="h-5 w-5" />
                  Get in Touch
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

       {/* Services Overview Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">What We Do</h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Offering a suite of services designed to build, grow, and enhance your online presence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
               <Card
                 key={service.id}
                 className="card-base group overflow-hidden animate-subtle-slide-up text-center border-border/30 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2"
                 style={{ animationDelay: `${index * 0.1}s` }}
               >
                 <CardHeader className="items-center pb-4">
                    <div className="mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                       <service.icon size={32} strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <CardDescription>{service.description}</CardDescription>
                 </CardContent>
                  <CardFooter className="justify-center pb-6">
                    <Button variant="link" size="sm" asChild className="text-primary group-hover:underline">
                       <Link href={service.link}>Learn More <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" /></Link>
                    </Button>
                 </CardFooter>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
                 <Link href="/services">
                    View All Services
                 </Link>
              </Button>
           </div>
        </div>
      </section>

      {/* Featured Projects Section */}
       <section className="py-16 md:py-24 bg-muted/40">
         <div className="container mx-auto px-4">
           <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">Featured Projects</h2>
           <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
             Take a glimpse at some of the impactful solutions we've delivered for our clients.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {featuredProjects.map((project, index) => (
               <Card
                 key={project.id}
                 className="card-base group overflow-hidden animate-subtle-scale-in flex flex-col md:flex-row items-center border-border/30 hover:shadow-xl transition-all duration-300"
                 style={{ animationDelay: `${index * 0.15}s` }}
               >
                 <div className="relative w-full md:w-1/3 h-48 md:h-full overflow-hidden flex-shrink-0">
                    <Image
                       src={project.imageUrl}
                       alt={project.title}
                       fill
                       className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                       data-ai-hint={project.aiHint}
                       sizes="(max-width: 768px) 100vw, 33vw"
                    />
                 </div>
                 <div className="flex flex-col justify-between p-6 flex-grow">
                   <div>
                      <CardTitle className="text-xl font-semibold mb-2">{project.title}</CardTitle>
                      <CardDescription className="mb-4">{project.description}</CardDescription>
                   </div>
                    <Button variant="outline" size="sm" asChild className="mt-auto w-full sm:w-auto self-start border-primary/50 text-primary/90 hover:bg-primary/10 hover:text-primary">
                       <Link href={project.link}>
                          <span className="flex items-center justify-center gap-2">
                             View Project <ExternalLink className="h-4 w-4" />
                          </span>
                       </Link>
                    </Button>
                 </div>
               </Card>
             ))}
           </div>
            <div className="text-center mt-12">
              <Button asChild size="lg">
                 <Link href="/projects">
                    Explore More Projects
                 </Link>
              </Button>
           </div>
         </div>
       </section>

       {/* Why Choose Us Section */}
       <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Why Partner with GenSyx?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0s' }}>
              <div className="mb-4 p-4 rounded-full bg-primary/10 text-primary">
                <Award size={32} strokeWidth={1.5}/>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expertise & Innovation</h3>
              <p className="text-muted-foreground">Leveraging the latest technologies and trends to deliver cutting-edge solutions.</p>
            </div>
            <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="mb-4 p-4 rounded-full bg-primary/10 text-primary">
                 <Target size={32} strokeWidth={1.5}/>
              </div>
              <h3 className="text-xl font-semibold mb-2">Client-Centric Approach</h3>
              <p className="text-muted-foreground">Understanding your unique needs to provide tailored strategies and support.</p>
            </div>
            <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="mb-4 p-4 rounded-full bg-primary/10 text-primary">
                 <CheckCircle size={32} strokeWidth={1.5}/>
              </div>
              <h3 className="text-xl font-semibold mb-2">Measurable Results</h3>
              <p className="text-muted-foreground">Focused on delivering tangible outcomes that drive growth and ROI.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}


// Add missing imports
import { ArrowRight, ExternalLink, Search, Palette } from "lucide-react";
