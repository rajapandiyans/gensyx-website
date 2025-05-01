'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Mail } from 'lucide-react'; // Icons for features and back button
import Link from 'next/link';

// Placeholder service data - In a real app, fetch this from an API or database based on serviceId
const serviceDetailsData: { [key: string]: any } = {
  "website-design": {
    title: "Website Design & Development",
    icon: 'Code', // We'll handle icon rendering separately if needed or pass component itself
    description: "We build beautiful, responsive, and high-performing websites that capture your brand essence and convert visitors into customers. From simple landing pages to complex web applications, we deliver tailored solutions.",
    features: [
      "Custom UI/UX Design",
      "Responsive Development (Mobile, Tablet, Desktop)",
      "Content Management System (CMS) Integration (e.g., WordPress, Strapi)",
      "E-commerce Functionality",
      "Performance Optimization",
      "SEO-Friendly Foundations",
    ],
    visuals: ["https://picsum.photos/seed/webdev1/800/400?grayscale", "https://picsum.photos/seed/webdev2/800/400?grayscale"],
    aiHints: ["website design prototype", "responsive website layout"],
  },
  "seo": {
    title: "Search Engine Optimization (SEO)",
    icon: 'Search',
    description: "Increase your website's visibility on search engines like Google and Bing. Our SEO strategies are designed to attract qualified organic traffic, improve rankings, and drive measurable results.",
    features: [
      "Keyword Research & Strategy",
      "On-Page Optimization",
      "Technical SEO Audit & Implementation",
      "Link Building & Off-Page Strategy",
      "Local SEO (for local businesses)",
      "Analytics & Performance Reporting",
    ],
     visuals: ["https://picsum.photos/seed/seo1/800/400?grayscale", "https://picsum.photos/seed/seo2/800/400?grayscale"],
     aiHints: ["seo analytics dashboard", "keyword research graph"],
  },
   "branding": {
    title: "Logo Design & Brand Building",
    icon: 'Gem',
    description: "Your brand is more than just a logo. We help you craft a compelling brand identity that reflects your values, resonates with your target audience, and sets you apart from the competition.",
    features: [
      "Logo Design & Variations",
      "Brand Style Guide Creation",
      "Color Palette & Typography Selection",
      "Brand Messaging & Tone of Voice",
      "Marketing Collateral Design (Business Cards, Brochures etc.)",
    ],
     visuals: ["https://picsum.photos/seed/brand1/800/400?grayscale", "https://picsum.photos/seed/brand2/800/400?grayscale"],
     aiHints: ["logo design concepts", "brand style guide mockup"],
  },
   "digital-marketing": {
     title: "Digital Marketing Strategy",
     icon: 'Signal',
     description: "Navigate the complex digital landscape with a comprehensive marketing strategy. We combine various online channels to reach your audience, generate leads, and achieve your marketing objectives.",
     features: [
       "Pay-Per-Click (PPC) Advertising (Google Ads, Social Media Ads)",
       "Content Marketing & Strategy",
       "Email Marketing Campaigns",
       "Conversion Rate Optimization (CRO)",
       "Marketing Automation Setup",
       "Detailed Campaign Reporting",
     ],
      visuals: ["https://picsum.photos/seed/digitalm1/800/400?grayscale", "https://picsum.photos/seed/digitalm2/800/400?grayscale"],
      aiHints: ["digital marketing funnel chart", "ppc campaign dashboard"],
   },
   "social-media": {
     title: "Social Media Platform Management",
     icon: 'Smartphone',
     description: "Build and nurture your online community. We manage your social media presence across relevant platforms, creating engaging content, fostering interaction, and driving brand awareness.",
     features: [
       "Platform Strategy & Setup (Facebook, Instagram, LinkedIn, etc.)",
       "Content Calendar Creation & Scheduling",
       "Community Engagement & Moderation",
       "Social Media Advertising Campaigns",
       "Follower Growth Strategies",
       "Performance Analytics & Reporting",
     ],
      visuals: ["https://picsum.photos/seed/social1/800/400?grayscale", "https://picsum.photos/seed/social2/800/400?grayscale"],
      aiHints: ["social media content calendar", "instagram profile mockup"],
   },
   "google-profile": {
     title: "Google Business Profile Management",
     icon: 'UserCheck',
     description: "Optimize your Google Business Profile to dominate local search results. We ensure your profile is accurate, engaging, and effectively attracts local customers.",
     features: [
       "Profile Setup & Optimization",
       "Google Posts Management",
       "Review Management & Response Strategy",
       "Q&A Monitoring & Management",
       "Local SEO Integration",
       "Performance Insights & Reporting",
     ],
      visuals: ["https://picsum.photos/seed/gbp1/800/400?grayscale", "https://picsum.photos/seed/gbp2/800/400?grayscale"],
      aiHints: ["google maps local listing", "business review stars"],
   },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params.serviceId as string;
  const service = serviceDetailsData[serviceId];

  if (!service) {
    // Handle case where service ID is invalid or data isn't found
    return (
       <div className="container mx-auto px-4 py-20 text-center">
         <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
         <p className="text-muted-foreground mb-6">The service you are looking for does not exist.</p>
         <Button asChild variant="outline">
           <Link href="/services">
             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
           </Link>
         </Button>
       </div>
     );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
       <Button asChild variant="ghost" className="mb-8">
         <Link href="/services">
           <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
         </Link>
       </Button>

      <Card className="shadow-xl animate-subtle-fade-in">
        <CardHeader className="text-center pb-8 border-b">
           {/* Can add Icon rendering here if needed */}
          <CardTitle className="text-4xl font-bold text-primary">{service.title}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground max-w-3xl mx-auto pt-2">{service.description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-8 px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             {/* Features Section */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Key Features & Benefits</h3>
              <ul className="space-y-3">
                {service.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visuals Section */}
            <div className="space-y-6">
               <h3 className="text-2xl font-semibold mb-6">Visual Examples</h3>
               {service.visuals.map((url: string, index: number) => (
                   <div key={index} className="rounded-lg overflow-hidden shadow-md border">
                       <img
                          src={url}
                          alt={`${service.title} Visual ${index + 1}`}
                          className="w-full h-auto object-cover"
                          // Consider adding data-ai-hint if these were Next Images
                       />
                   </div>
               ))}
             </div>
           </div>

          {/* Call to Action */}
          <div className="mt-12 text-center border-t pt-8">
            <h3 className="text-xl font-semibold mb-4">Interested in this service?</h3>
            <Button size="lg" asChild>
              <Link href="/contact">
                 <Mail className="mr-2 h-5 w-5" /> Get a Quote
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
