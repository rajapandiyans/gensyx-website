import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

// Updated project data
const projects = [
 {
    id: 1,
    title: "GPT3",
    description: "Let’s Build Something amazing with GPT-3 – Harness AI for creative and business solutions.", // Using 'description' key for consistency
    imageUrl: "https://picsum.photos/seed/gpt3/600/400", // Placeholder image
    link: "https://gpt3-gensyx.vercel.app/#wgpt3",
    aiHint: "ai interface abstract",
  },
  {
    id: 2,
    title: "Travela",
    description: "Your perfect travel companion - Discover curated destinations and seamless trip planning for unforgettable journeys.",
    imageUrl: "https://picsum.photos/seed/travela/600/400", // Placeholder image
    link: "https://tourism-gensyx.vercel.app/",
    aiHint: "travel website destination",
  },
  {
    id: 3,
    title: "Caterserv",
    description: "Book CaterServ For Your Dream Event – Simplify planning with all-in-one vendor bookings.",
    imageUrl: "https://picsum.photos/seed/caterserv/600/400", // Placeholder image
    link: "https://caterserv-gensyx.vercel.app/",
     aiHint: "catering event food",
  },
  {
    id: 4,
    title: "ECommerce",
    description: "Simplify shopping with seamless UX, secure payments, and AI-driven recommendations.",
    imageUrl: "https://picsum.photos/seed/ecommerce/600/400", // Placeholder image
    link: "https://e-commerce-gensyx.vercel.app/index.html",
    aiHint: "online shopping interface",
  },
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <h1 className="text-4xl font-bold text-center mb-12 animate-subtle-fade-in text-primary">Our Projects</h1>
      <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-subtle-fade-in" style={{ animationDelay: '0.1s' }}>
        Explore a selection of projects showcasing our expertise in delivering impactful digital solutions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card key={project.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 animate-subtle-slide-up flex flex-col" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
            <CardHeader className="p-0 relative aspect-video"> {/* Maintain aspect ratio */}
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill // Use fill to cover the container
                className="object-cover" // Ensure image covers the area
                data-ai-hint={project.aiHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
              />
            </CardHeader>
            <CardContent className="p-6 flex-grow"> {/* Allow content to grow */}
              <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
              <CardDescription className="mb-4 text-muted-foreground">{project.description}</CardDescription>
              {/* Tags removed as they are not in the new data */}
            </CardContent>
            <CardFooter className="p-6 pt-0 mt-auto"> {/* Push footer to bottom */}
               <Button variant="outline" size="sm" asChild>
                 <a href={project.link} target="_blank" rel="noopener noreferrer">
                   View Project <ExternalLink className="ml-2 h-4 w-4" />
                 </a>
               </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
