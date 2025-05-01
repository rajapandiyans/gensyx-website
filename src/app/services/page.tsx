

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Search, Gem, BarChart3, Smartphone, UserCheck, Palette, Network } from 'lucide-react'; // Updated and added icons

// Service data with updated icons and slightly refined descriptions
const services = [
  {
    id: "website-design",
    title: "Web Design & Dev", // Shortened for card
    icon: Code,
    description: "Building responsive, high-performance websites that captivate and convert.",
    link: "/services/website-design",
    aiHint: "website interface code responsive",
  },
  {
    id: "seo",
    title: "SEO Strategy",
    icon: Search, // Changed to Search for better SEO representation
    description: "Boosting your visibility on search engines to attract qualified organic traffic.",
    link: "/services/seo",
     aiHint: "search engine optimization graph",
  },
  {
    id: "branding",
    title: "Branding & Identity", // More descriptive
    icon: Palette, // Changed to Palette for branding
    description: "Crafting memorable logos and cohesive brand identities that stand out.",
    link: "/services/branding",
     aiHint: "brand logo design identity",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: BarChart3, // Changed to BarChart3 for marketing data
    description: "Data-driven strategies across online channels to reach audiences and drive leads.",
    link: "/services/digital-marketing",
     aiHint: "digital marketing analytics chart",
  },
  {
    id: "social-media",
    title: "Social Media Mgmt", // Shortened
    icon: Network, // Changed to Network for social connection
    description: "Engaging content and community management to grow your online presence.",
    link: "/services/social-media",
     aiHint: "social media connection network",
  },
  {
    id: "google-profile",
    title: "Google Business Profile",
    icon: UserCheck,
    description: "Optimizing your Google profile for maximum local visibility and customer trust.",
    link: "/services/google-profile",
     aiHint: "google business profile optimization",
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24 perspective-1000"> {/* Add perspective */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in-down text-primary">
          Our Digital Expertise
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
          We offer a comprehensive suite of digital services tailored to elevate your brand, engage your audience, and achieve tangible business results.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card
            key={service.id}
            className="card-base card-hover group flex flex-col justify-between text-center overflow-hidden animate-subtle-slide-up transform-style-3d transition-transform duration-500" // Apply 3D styles
            style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
          >
            <CardHeader className="items-center pt-8 pb-4">
              <div className="mb-5 flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15 group-hover:text-accent transform group-hover:translate-z-[10px]"> {/* 3D Icon */}
                 <service.icon size={34} strokeWidth={1.5} />
              </div>
              <CardTitle className="text-xl md:text-2xl font-semibold">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 flex-grow">
              <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
            </CardContent>
             <CardFooter className="p-6 pt-0 mt-auto">
              <Button variant="outline" asChild className="w-full transform hover:scale-105 hover:translate-z-[5px] transition-transform duration-300">
                <Link href={service.link}>
                  {/* Ensure single child wrapper */}
                  <span className="flex items-center justify-center gap-2">
                    Learn More <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
