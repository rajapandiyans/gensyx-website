
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Rocket, Code, Target, Eye, Zap, CheckCircle, Award, Users, Search, Palette, ExternalLink, ArrowRight, BarChart3, Network, UserCheck } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Updated featured projects to use custom image paths (assuming images are placed in public/images)
const featuredProjects = [
 {
    id: 1,
    title: "GPT3 Integration",
    description: "Harnessing AI for creative and business solutions.",
    imageUrl: "/images/gpt3.jpg", // Custom image path
    link: "https://gpt3-gensyx.vercel.app/#wgpt3",
  },
  {
    id: 2,
    title: "Travela Booking Platform",
    description: "Your perfect travel companion for seamless trip planning.",
    imageUrl: "/images/travela.jpg", // Custom image path
    link: "https://tourism-gensyx.vercel.app/",
  },
   {
    id: 3,
    title: "Caterserv Event Planning",
    description: "Simplify event planning with all-in-one vendor bookings.",
    imageUrl: "/images/caterserv.jpg", // Custom image path
    link: "https://caterserv-gensyx.vercel.app/",
  },
  {
    id: 4,
    title: "Modern E-Commerce Store",
    description: "Seamless UX, secure payments, and AI-driven recommendations.",
    imageUrl: "/images/multishop.jpg", // Custom image path
    link: "https://e-commerce-gensyx.vercel.app/index.html",
  },
];

// Updated featured services data to include all services with correct icons and links
const featuredServices = [
  {
    id: "website-design",
    title: "Web Design & Dev", // Shortened for consistency
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
   {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: BarChart3, // Added
    description: "Data-driven strategies to reach audiences and drive leads.",
    link: "/services/digital-marketing",
  },
   {
    id: "social-media",
    title: "Social Media Mgmt",
    icon: Network, // Added
    description: "Engaging content and community management for growth.",
    link: "/services/social-media",
  },
    {
    id: "google-profile",
    title: "Google Business", // Shortened
    icon: UserCheck, // Added
    description: "Optimizing your Google profile for local visibility.",
    link: "/services/google-profile",
  },
];

// Customizable Testimonials Data
const testimonialsData = [
  {
    id: 1,
    quote: "GenSyx Solutions transformed our online presence with a stunning website and effective SEO strategies. Our traffic has increased significantly!",
    clientName: "Alex Chen",
    clientPosition: "CEO, Tech Innovators Inc.",
    avatarUrl: "https://i.pravatar.cc/40?u=alexchen",
  },
  {
    id: 2,
    quote: "The branding work GenSyx did for us was exceptional. They truly understood our vision and created a brand identity that resonates with our audience.",
    clientName: "Sarah Miller",
    clientPosition: "Founder, Bloom Creatives",
    avatarUrl: "https://i.pravatar.cc/40?u=sarahmiller",
  },
  {
    id: 3,
    quote: "Working with GenSyx on our digital marketing campaigns has been a game-changer. Their team is knowledgeable, responsive, and delivers results.",
    clientName: "David Kim",
    clientPosition: "Marketing Director, Fusion Corp",
    avatarUrl: "https://i.pravatar.cc/40?u=davidkim",
  },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section with Background Image */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[calc(80vh)] md:min-h-[calc(90vh)] text-center px-4 md:px-8 py-20 md:py-32 bg-cover bg-center bg-no-repeat text-white isolate"
        style={{ backgroundImage: "url('https://picsum.photos/seed/heroVibrantTechUnique/1920/1080')" }}
        data-ai-hint="vibrant abstract technology futuristic cyber purple blue unique fresh"
      >
        {/* Overlay */}
        <div className="bg-hero-overlay"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Heading Group with Icon */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-6 animate-fade-in-down">
            <Zap size={48} className="text-primary animate-pulse-glow order-1 md:order-none md:size-16" strokeWidth={1.5}/>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-shadow-lg order-2 md:order-none">
              <span className="text-primary">GenSyx</span> Solutions
            </h1>
          </div>
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
      <section
        className="relative py-16 md:py-24 bg-cover bg-center isolate"
        style={{ backgroundImage: "url('https://picsum.photos/seed/servicesPatternFresh/1920/1080')" }}
        data-ai-hint="subtle geometric pattern digital network blue white fresh clean"
      >
        <div className="bg-overlay backdrop-blur-sm"></div> {/* Overlay with blur */}
        <div className="relative container mx-auto px-4 z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">What We Do</h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Offering a suite of services designed to build, grow, and enhance your online presence.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Adjusted grid for better responsiveness */}
            {featuredServices.map((service, index) => {
              const ServiceIcon = service.icon; // Get the icon component
              return (
              <Card
                key={service.id}
                className="card-base group overflow-hidden animate-subtle-slide-up text-center border-border/30 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 bg-card/80 backdrop-blur-md"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="items-center pb-4">
                   <div className="mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <ServiceIcon size={32} strokeWidth={1.5} /> {/* Render the icon */}
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
             );
            })}
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
       <section
         className="relative py-16 md:py-24 bg-cover bg-center isolate"
         style={{ backgroundImage: "url('https://picsum.photos/seed/projectGridFresh/1920/1080')" }}
         data-ai-hint="modern workspace design project portfolio dark grey fresh unique"
       >
         <div className="bg-overlay backdrop-blur-sm"></div> {/* Overlay with blur */}
         <div className="relative container mx-auto px-4 z-10">
           <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">Featured Projects</h2>
           <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
             Take a glimpse at some of the impactful solutions we've delivered for our clients.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {featuredProjects.map((project, index) => (
               <Card
                 key={project.id}
                 className="card-base group overflow-hidden animate-subtle-scale-in flex flex-col md:flex-row items-center border-border/30 hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-md"
                 style={{ animationDelay: `${index * 0.15}s` }}
               >
                 <div className="relative w-full md:w-1/3 h-48 md:h-full overflow-hidden flex-shrink-0">
                    <Image
                       src={project.imageUrl} // Use updated custom image path
                       alt={project.title}
                       fill
                       className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
                    />
                 </div>
                 <div className="flex flex-col justify-between p-6 flex-grow">
                   <div>
                      <CardTitle className="text-xl font-semibold mb-2">{project.title}</CardTitle>
                      <CardDescription className="mb-4">{project.description}</CardDescription>
                   </div>
                    <Button variant="outline" size="sm" asChild className="mt-auto w-full sm:w-auto self-start border-primary/50 text-primary/90 hover:bg-primary/10 hover:text-primary">
                       <a href={project.link} target="_blank" rel="noopener noreferrer"> {/* Use <a> for external links */}
                          <span className="flex items-center justify-center gap-2">
                             View Project <ExternalLink className="h-4 w-4" />
                          </span>
                       </a>
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
       <section
         className="relative py-16 md:py-24 bg-cover bg-center isolate"
         style={{ backgroundImage: "url('https://picsum.photos/seed/whyChooseTextureFresh/1920/1080')" }}
         data-ai-hint="abstract light texture professional partnership subtle fresh clean"
       >
          <div className="bg-overlay backdrop-blur-sm"></div> {/* Overlay with blur */}
        <div className="relative container mx-auto px-4 z-10">
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

      {/* Testimonials Section - Updated with customizable data */}
      <section
        className="relative py-16 md:py-24 bg-cover bg-center isolate"
        style={{ backgroundImage: "url('https://picsum.photos/seed/testimonialWaveFresh/1920/1080')" }}
        data-ai-hint="soft wave pattern background customer reviews light blue fresh clean"
      >
        <div className="bg-overlay backdrop-blur-sm"></div> {/* Overlay with blur */}
        <div className="relative container mx-auto px-4 z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">What Our Clients Say</h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Hear from businesses we've helped succeed in the digital world.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
               <Card
                 key={testimonial.id}
                 className="card-base animate-subtle-slide-up border-border/30 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 bg-card/80 backdrop-blur-md"
                 style={{ animationDelay: `${index * 0.1}s` }}
               >
                 <CardContent className="pt-6">
                   <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                     {testimonial.quote}
                   </blockquote>
                 </CardContent>
                 <CardFooter className="pt-4 pb-6 flex items-center gap-3">
                   <Avatar>
                     <AvatarImage src={testimonial.avatarUrl} alt={testimonial.clientName} />
                     <AvatarFallback>{testimonial.clientName.substring(0,1).toUpperCase()}</AvatarFallback>
                   </Avatar>
                   <div>
                     <p className="font-semibold text-foreground">{testimonial.clientName}</p>
                     <p className="text-sm text-muted-foreground">{testimonial.clientPosition}</p>
                   </div>
                 </CardFooter>
               </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section - Added */}
       <section className="py-20 md:py-28 bg-gradient-to-r from-primary/90 to-secondary/90 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in-down text-shadow">
            Ready to Start Your Digital Transformation?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Let's discuss your project and how GenSyx can help you achieve your online goals.
          </p>
          <Button
            size="lg"
            variant="secondary" // Use secondary variant for contrast on gradient
            asChild
            className="animate-fade-in-up shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white hover:bg-gray-100 text-primary px-10 py-3 text-lg font-semibold"
            style={{ animationDelay: '0.2s' }}
          >
            <Link href="/contact">
               Request a Free Consultation
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer Section - Updated Copyright */}
      <footer className="py-6 bg-card border-t border-border/20">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          &copy; 2025 GenSyx Solutions. All rights reserved. {/* Updated year */}
        </div>
      </footer>

    </div>
  );
}
