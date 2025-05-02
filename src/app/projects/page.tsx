import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

// Updated project data with custom image paths (assuming images are in public/images)
const projects = [
 {
    id: 1,
    title: "GPT3 Integration",
    description: "Let’s Build Something amazing with GPT-3 – Harness AI for creative and business solutions.",
    imageUrl: "/images/gpt3.jpg", // Custom image path
    link: "https://gpt3-gensyx.vercel.app/#wgpt3",
  },
  {
    id: 2,
    title: "Travela Booking Platform",
    description: "Your perfect travel companion - Discover curated destinations and seamless trip planning for unforgettable journeys.",
    imageUrl: "/images/travela.jpg", // Custom image path
    link: "https://tourism-gensyx.vercel.app/",
  },
  {
    id: 3,
    title: "Caterserv Event Planning",
    description: "Book CaterServ For Your Dream Event – Simplify planning with all-in-one vendor bookings.",
    imageUrl: "/images/caterserv.jpg", // Custom image path
    link: "https://caterserv-gensyx.vercel.app/",
  },
  {
    id: 4,
    title: "Modern E-Commerce Store",
    description: "Simplify shopping with seamless UX, secure payments, and AI-driven recommendations.",
    imageUrl: "/images/multishop.jpg", // Custom image path
    link: "https://e-commerce-gensyx.vercel.app/index.html",
  },
];

export default function ProjectsPage() {
  return (
    <div className="relative isolate overflow-hidden bg-background py-16 md:py-20 lg:py-24">
      {/* Background Image and Overlay */}
       <div
        className="absolute inset-0 -z-10 h-full w-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp2823533.jpg')" }}
        data-ai-hint="technology circuit board code software development abstract tech"
       ></div>
       <div className="bg-overlay"></div> {/* Use shared overlay class */}

      <div className="container mx-auto px-4 relative z-10"> {/* Content container */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in-down text-primary">
            Showcasing Our Work
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
            Explore a selection of projects highlighting our capability to deliver innovative and impactful digital solutions across various domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <Card
               key={project.id}
               className="card-base group overflow-hidden animate-subtle-slide-up flex flex-col bg-card/80 backdrop-blur-md border border-border/30 hover:border-primary/50 transition-colors duration-300"
               style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
            >
              <CardHeader className="p-0 relative aspect-video overflow-hidden">
                {/* Image with subtle zoom on hover */}
                <Image
                  src={project.imageUrl} // Use the updated custom image path
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                 {/* Optional: Darker overlay on hover */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col">
                <CardTitle className="text-2xl mb-2 font-semibold text-foreground">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground flex-grow mb-4">{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0 mt-auto border-t border-border/20">
                 <Button variant="outline" size="sm" asChild className="w-full sm:w-auto transform hover:scale-105 transition-transform duration-300 hover:bg-primary/10 hover:text-primary border-primary/50 text-primary/90">
                   <a href={project.link} target="_blank" rel="noopener noreferrer">
                     <span className="flex items-center justify-center gap-2">
                          View Project <ExternalLink className="h-4 w-4" />
                      </span>
                   </a>
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

    