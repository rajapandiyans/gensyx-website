import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Search, Gem, Signal, Smartphone, UserCheck } from 'lucide-react'; // Icons for services

// Placeholder service data
const services = [
  {
    id: "website-design",
    title: "Website Design",
    icon: Code,
    description: "Crafting visually stunning and user-friendly websites tailored to your brand.",
    link: "/services/website-design",
    aiHint: "website design interface code",
  },
  {
    id: "seo",
    title: "SEO",
    icon: Search,
    description: "Optimizing your online presence to rank higher in search engine results.",
    link: "/services/seo",
     aiHint: "search engine graph chart",
  },
  {
    id: "branding",
    title: "Logo & Brand Building",
    icon: Gem,
    description: "Creating unique logos and cohesive brand identities that resonate.",
    link: "/services/branding",
     aiHint: "brand logo design minimal",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: Signal,
    description: "Implementing data-driven strategies to boost your reach and engagement.",
    link: "/services/digital-marketing",
     aiHint: "digital marketing chart graph",
  },
  {
    id: "social-media",
    title: "Social Media Management",
    icon: Smartphone,
    description: "Managing your social platforms to build community and drive results.",
    link: "/services/social-media",
     aiHint: "social media icons phone",
  },
  {
    id: "google-profile",
    title: "Google Profile Management",
    icon: UserCheck,
    description: "Optimizing your Google Business Profile for maximum local visibility.",
    link: "/services/google-profile",
     aiHint: "google business profile map",
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <h1 className="text-4xl font-bold text-center mb-12 animate-subtle-fade-in text-primary">Our Services</h1>
      <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-subtle-fade-in" style={{ animationDelay: '0.1s' }}>
        We offer a comprehensive suite of digital services designed to elevate your brand and achieve your business goals.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={service.id} className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300 animate-subtle-slide-up" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
            <CardHeader>
              <div className="mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto">
                 <service.icon size={32} />
              </div>
              <CardTitle className="text-2xl text-center">{service.title}</CardTitle>
              <CardDescription className="text-center pt-2">{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center mt-auto p-6 pt-0">
              {/* Placeholder Link - In a real app, this would link to a detailed service page */}
              <Button variant="outline" asChild>
                <Link href={service.link}>
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
