import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Search, Palette, BarChart3, Network, UserCheck } from 'lucide-react'; // Updated imports

// Service data with icons included and correct IDs for linking
const services = [
  {
    id: "website-design", // Matches the key in serviceDetailsData
    title: "Web Design & Development",
    icon: Code,
    description: "Building responsive, high-performance websites that captivate and convert.",
    link: "/services/website-design",
    aiHint: "website interface code responsive",
  },
  {
    id: "seo", // Matches the key in serviceDetailsData
    title: "SEO Strategy",
    icon: Search,
    description: "Boosting your visibility on search engines to attract qualified organic traffic.",
    link: "/services/seo",
     aiHint: "search engine optimization graph",
  },
  {
    id: "branding", // Matches the key in serviceDetailsData
    title: "Branding & Identity",
    icon: Palette,
    description: "Crafting memorable logos and cohesive brand identities that stand out.",
    link: "/services/branding",
     aiHint: "brand logo design identity",
  },
  {
    id: "digital-marketing", // Matches the key in serviceDetailsData
    title: "Digital Marketing",
    icon: BarChart3,
    description: "Data-driven strategies across online channels to reach audiences and drive leads.",
    link: "/services/digital-marketing",
     aiHint: "digital marketing analytics chart",
  },
  {
    id: "social-media", // Matches the key in serviceDetailsData
    title: "Social Media Management",
    icon: Network,
    description: "Engaging content and community management to grow your online presence.",
    link: "/services/social-media",
     aiHint: "social media connection network",
  },
  {
    id: "google-profile", // Matches the key in serviceDetailsData
    title: "Google Business Profile",
    icon: UserCheck,
    description: "Optimizing your Google profile for maximum local visibility and customer trust.",
    link: "/services/google-profile",
     aiHint: "google business profile optimization",
  },
];

export default function ServicesPage() {
  return (
     <div className="relative isolate overflow-hidden bg-background py-16 md:py-20 lg:py-24">
      {/* Background Image and Overlay */}
       <div
        className="absolute inset-0 -z-10 h-full w-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://wallpaperbat.com/img/59432-wallpaper-futuristic-technology.jpg')" }}
        data-ai-hint="abstract technology background digital services connection nodes blue purple"
       ></div>
        <div className="bg-overlay"></div> {/* Use shared overlay class */}

      <div className="container mx-auto px-4 relative z-10"> {/* Content container */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in-down text-primary">
            Our Digital Expertise
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
            We offer a comprehensive suite of digital services tailored to elevate your brand, engage your audience, and achieve tangible business results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const ServiceIcon = service.icon; // Get the icon component
            return (
            <Card
              key={service.id}
              className="card-base group flex flex-col justify-between text-center overflow-hidden animate-subtle-slide-up bg-card/80 backdrop-blur-md border border-border/30 hover:border-primary/50 transition-colors duration-300" // Card transparency
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <CardHeader className="items-center pt-8 pb-4">
                <div className="mb-5 flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 group-hover:text-primary">
                   <ServiceIcon size={34} strokeWidth={1.5} /> {/* Render the icon component */}
                </div>
                <CardTitle className="text-xl md:text-2xl font-semibold text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 flex-grow">
                <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
              </CardContent>
               <CardFooter className="p-6 pt-0 mt-auto border-t border-border/20">
                <Button variant="outline" asChild className="w-full transform hover:scale-105 transition-transform duration-300 hover:bg-primary/10 hover:text-primary border-primary/50 text-primary/90">
                  <Link href={service.link}> {/* Link uses the defined path */}
                    <span className="flex items-center justify-center gap-2">
                      Learn More <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}