import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Layers } from 'lucide-react'; // Added Layers icon

// Updated project data (ensure consistency with user request)
const projects = [
 {
    id: 1,
    title: "GPT3 Integration", // Slightly more descriptive title
    description: "Let’s Build Something amazing with GPT-3 – Harness AI for creative and business solutions.",
    imageUrl: "/images/gpt3.png", // Using uploaded image
    link: "https://gpt3-gensyx.vercel.app/#wgpt3",
    aiHint: "ai interface abstract technology", // Added keyword
  },
  {
    id: 2,
    title: "Travela Booking Platform",
    description: "Your perfect travel companion - Discover curated destinations and seamless trip planning for unforgettable journeys.",
    imageUrl: "/images/travela.png", // Using uploaded image
    link: "https://tourism-gensyx.vercel.app/",
    aiHint: "travel website destination booking", // Added keyword
  },
  {
    id: 3,
    title: "Caterserv Event Planning",
    description: "Book CaterServ For Your Dream Event – Simplify planning with all-in-one vendor bookings.",
    imageUrl: "/images/caterserv.png", // Using uploaded image
    link: "https://caterserv-gensyx.vercel.app/",
     aiHint: "catering event food planning", // Added keyword
  },
  {
    id: 4,
    title: "Modern E-Commerce Store",
    description: "Simplify shopping with seamless UX, secure payments, and AI-driven recommendations.",
    imageUrl: "/images/ecommerce.png", // Using uploaded image
    link: "https://e-commerce-gensyx.vercel.app/index.html",
    aiHint: "online shopping interface e-commerce", // Added keyword
  },
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24 perspective-1000"> {/* Add perspective */}
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
             className="card-base card-hover group overflow-hidden animate-subtle-slide-up flex flex-col transform-style-3d transition-transform duration-500" // Apply 3D styles
             style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
          >
            <CardHeader className="p-0 relative aspect-video overflow-hidden">
              {/* Image with subtle zoom on hover */}
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                data-ai-hint={project.aiHint}
                sizes="(max-width: 768px) 100vw, 50vw" // Adjusted sizes
              />
               {/* Optional: Overlay on hover */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </CardHeader>
            <CardContent className="p-6 flex-grow flex flex-col">
              <CardTitle className="text-2xl mb-2 font-semibold">{project.title}</CardTitle>
              <CardDescription className="text-muted-foreground flex-grow mb-4">{project.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 mt-auto border-t border-border/50">
               <Button variant="outline" size="sm" asChild className="w-full sm:w-auto transform hover:scale-105 hover:translate-z-[5px] transition-transform duration-300">
                 <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                   View Project <ExternalLink className="h-4 w-4" />
                 </a>
               </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
