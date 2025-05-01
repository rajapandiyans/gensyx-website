import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

// Placeholder project data
const projects = [
  {
    id: 1,
    title: "E-commerce Platform Overhaul",
    description: "Revamped user interface and backend for increased performance and sales conversion.",
    imageUrl: "https://picsum.photos/seed/project1/600/400",
    tags: ["Web Development", "UI/UX", "E-commerce"],
    link: "#", // Replace with actual link
    aiHint: "online store website",
  },
  {
    id: 2,
    title: "Startup Branding & Website",
    description: "Developed a complete brand identity and built a modern marketing website from scratch.",
    imageUrl: "https://picsum.photos/seed/project2/600/400",
    tags: ["Branding", "Logo Design", "Web Design"],
    link: "#",
     aiHint: "modern startup website",
  },
  {
    id: 3,
    title: "SEO Campaign for Local Business",
    description: "Implemented a targeted SEO strategy resulting in a 200% increase in organic traffic.",
    imageUrl: "https://picsum.photos/seed/project3/600/400",
    tags: ["SEO", "Digital Marketing", "Local SEO"],
    link: "#",
     aiHint: "search engine optimization graph",
  },
    {
    id: 4,
    title: "Social Media Growth Strategy",
    description: "Managed social media platforms, significantly boosting engagement and follower count.",
    imageUrl: "https://picsum.photos/seed/project4/600/400",
    tags: ["Social Media", "Digital Marketing", "Content Creation"],
    link: "#",
     aiHint: "social media icons interface",
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
          <Card key={project.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 animate-subtle-slide-up" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
            <CardHeader className="p-0">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
                data-ai-hint={project.aiHint}
              />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
              <CardDescription className="mb-4 text-muted-foreground">{project.description}</CardDescription>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
               <Button variant="outline" size="sm" asChild disabled={project.link === '#'}>
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
