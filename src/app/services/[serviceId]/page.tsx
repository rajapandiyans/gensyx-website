'use client';

import { useParams, useRouter } from 'next/navigation'; // Added useRouter for back button logic
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Mail, Code, Search, Palette, BarChart3, Network, UserCheck } from 'lucide-react'; // Added service icons
import Link from 'next/link';
import Image from 'next/image'; // Use Next Image for optimization


// Service data with icons included directly
const serviceDetailsData: { [key: string]: any } = {
  "website-design": {
    title: "Website Design & Development",
    icon: Code,
    description: "We build beautiful, responsive, and high-performing websites that capture your brand essence and convert visitors into customers. From simple landing pages to complex web applications, we deliver tailored solutions.",
    features: [
      "Custom UI/UX Design Tailored to Your Brand",
      "Responsive Development (Mobile, Tablet, Desktop)",
      "Content Management System (CMS) Integration",
      "E-commerce Functionality & Secure Payments",
      "Performance & Speed Optimization",
      "SEO-Friendly Foundations for Visibility",
      "Ongoing Maintenance & Support Options",
    ],
    visuals: ["https://picsum.photos/seed/webdev1/800/450", "https://picsum.photos/seed/webdev2/800/450"],
    aiHints: ["website design prototype interface", "responsive website mockup devices"],
  },
  "seo": {
    title: "Search Engine Optimization (SEO)",
    icon: Search,
    description: "Increase your website's visibility on search engines like Google and Bing. Our SEO strategies are designed to attract qualified organic traffic, improve rankings, and drive measurable results.",
    features: [
      "In-Depth Keyword Research & Competitive Analysis",
      "Comprehensive On-Page & Technical SEO Audits",
      "Content Strategy & Optimization",
      "High-Quality Link Building & Outreach",
      "Local SEO Optimization (Google Maps & Directories)",
      "Performance Tracking & Analytics Reporting",
      "Algorithm Update Monitoring & Adaptation",
    ],
     visuals: ["https://picsum.photos/seed/seo1/800/450", "https://picsum.photos/seed/seo2/800/450"],
     aiHints: ["seo analytics dashboard graph", "keyword research analysis chart"],
  },
   "branding": {
    title: "Logo Design & Brand Identity", // Refined title
    icon: Palette,
    description: "Your brand is more than just a logo. We help you craft a compelling brand identity that reflects your values, resonates with your target audience, and sets you apart from the competition.",
    features: [
      "Unique Logo Design Concepts & Revisions",
      "Comprehensive Brand Style Guide Creation",
      "Color Palette & Typography System",
      "Brand Messaging & Tone of Voice Development",
      "Marketing Collateral Design (Cards, Brochures, etc.)",
      "Brand Strategy & Positioning",
      "Visual Identity Application Across Platforms",
    ],
     visuals: ["https://picsum.photos/seed/brand1/800/450", "https://picsum.photos/seed/brand2/800/450"],
     aiHints: ["logo design concepts variations", "brand style guide mockup presentation"],
  },
   "digital-marketing": {
     title: "Digital Marketing Strategy",
     icon: BarChart3,
     description: "Navigate the complex digital landscape with a comprehensive marketing strategy. We combine various online channels to reach your audience, generate leads, and achieve your marketing objectives.",
     features: [
       "Pay-Per-Click (PPC) Campaign Management (Google, Social)",
       "Content Marketing & Blog Strategy",
       "Email Marketing Automation & Campaigns",
       "Social Media Marketing & Advertising",
       "Conversion Rate Optimization (CRO)",
       "Marketing Analytics & ROI Reporting",
       "Integrated Multi-Channel Strategy",
     ],
      visuals: ["https://picsum.photos/seed/digitalm1/800/450", "https://picsum.photos/seed/digitalm2/800/450"],
      aiHints: ["digital marketing funnel chart analytics", "ppc campaign dashboard performance"],
   },
   "social-media": {
     title: "Social Media Management", // Refined title
     icon: Network,
     description: "Build and nurture your online community. We manage your social media presence across relevant platforms, creating engaging content, fostering interaction, and driving brand awareness.",
     features: [
       "Platform-Specific Strategy & Account Setup",
       "Content Creation, Curation & Scheduling",
       "Community Engagement & Interaction Monitoring",
       "Targeted Social Media Advertising Campaigns",
       "Influencer Collaboration & Outreach",
       "Performance Analytics & Growth Reporting",
       "Brand Reputation Management",
     ],
      visuals: ["https://picsum.photos/seed/social1/800/450", "https://picsum.photos/seed/social2/800/450"],
      aiHints: ["social media content calendar strategy", "instagram profile engagement mockup"],
   },
   "google-profile": {
     title: "Google Business Profile Optimization", // Refined title
     icon: UserCheck,
     description: "Optimize your Google Business Profile to dominate local search results. We ensure your profile is accurate, engaging, and effectively attracts local customers.",
     features: [
       "Complete Profile Setup & Verification Assistance",
       "NAP (Name, Address, Phone) Consistency Management",
       "Engaging Google Posts & Updates Creation",
       "Proactive Review Generation & Response Strategy",
       "Q&A Monitoring & Management",
       "Local SEO Integration & Citation Building",
       "Detailed Performance Insights & Reporting",
     ],
      visuals: ["https://picsum.photos/seed/gbp1/800/450", "https://picsum.photos/seed/gbp2/800/450"],
      aiHints: ["google maps local business listing", "business online review management stars"],
   },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter(); // Use router for navigation
  const serviceId = params.serviceId as string;
  const service = serviceDetailsData[serviceId];

  // Handle case where service ID is invalid or data isn't found
  if (!service) {
    return (
       <div className="container mx-auto px-4 py-20 text-center animate-fade-in-down">
         <h1 className="text-3xl md:text-4xl font-bold mb-4 text-destructive">Service Not Found</h1>
         <p className="text-lg text-muted-foreground mb-8">Oops! The service you're looking for doesn't seem to exist.</p>
         <Button onClick={() => router.back()} variant="outline" className="transform hover:scale-105 hover:translate-z-[5px] transition-transform duration-300">
           {/* Ensure single child */}
            <span className="flex items-center justify-center gap-2">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </span>
         </Button>
       </div>
     );
  }

  const ServiceIcon = service.icon; // Get the icon component

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 perspective-1000"> {/* Add perspective */}
       <Button onClick={() => router.back()} variant="ghost" className="mb-8 group animate-fade-in-down transform hover:scale-105 hover:translate-z-[5px] transition-transform duration-300">
         {/* Ensure single child */}
         <span className="flex items-center justify-center gap-2">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" /> Back to Services
         </span>
       </Button>

      <Card className="card-base card-hover shadow-xl overflow-hidden animate-subtle-scale-in transform-style-3d transition-transform duration-500"> {/* Apply 3D styles */}
        <CardHeader className="text-center p-8 md:p-12 border-b bg-gradient-to-br from-card to-primary/5">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary animate-pulse-glow transform hover:scale-110 hover:translate-z-[10px] transition-transform duration-300">
              <ServiceIcon size={40} strokeWidth={1.5} />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-extrabold text-primary">{service.title}</CardTitle>
            <CardDescription className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto pt-3 leading-relaxed">{service.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">

             {/* Key Features Section */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">What's Included</h3>
              <ul className="space-y-4">
                {service.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 transform hover:translate-x-1 hover:translate-z-[3px] transition-transform duration-200">
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-base text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Examples Section */}
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
               <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">Visual Examples</h3>
               {service.visuals.map((url: string, index: number) => (
                   <div key={index} className="rounded-lg overflow-hidden shadow-md border group relative aspect-video transform-style-3d hover:scale-[1.03] hover:rotate-y-[-3deg] hover:translate-z-[10px] transition-transform duration-500"> {/* 3D hover effect */}
                       <Image
                          src={url}
                          alt={`${service.title} Visual Example ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                          data-ai-hint={service.aiHints[index]}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                       />
                       <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                   </div>
               ))}
             </div>
           </div>

          {/* Enhanced Call to Action */}
          <div className="mt-16 text-center border-t pt-10 md:pt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">Ready to Elevate Your Project?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Let's discuss how our {service.title.toLowerCase()} service can help you achieve your goals.</p>
            <Button size="lg" asChild className="shadow-lg hover:shadow-xl transform hover:scale-105 hover:translate-z-[5px] transition-transform duration-300">
              <Link href="/contact">
                {/* Ensure single child wrapper */}
                <span className="flex items-center justify-center gap-2">
                 <Mail className="mr-2 h-5 w-5" /> Request a Consultation
                </span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}