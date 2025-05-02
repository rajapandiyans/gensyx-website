
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import emailjs from 'emailjs-com';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mail, Phone, Send, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import Link from "next/link";

// Define the form schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(500, {
    message: "Message cannot exceed 500 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onChange", // Validate on change for better UX
  });

  const { formState: { isSubmitting } } = form;

  // Fetch EmailJS credentials from environment variables
  // IMPORTANT: Ensure these variables are set in your .env.local file
  // NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
  // NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
  // NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
  const emailJsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const emailJsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const emailJsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  async function onSubmit(data: ContactFormValues) {

    if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
        console.error("EmailJS environment variables are not configured. Please check your .env.local file.");
        toast({
          title: "Configuration Error",
          description: "Unable to send message due to missing configuration. Please contact support or try again later.",
          variant: "destructive",
        });
        return; // Stop submission if config is missing
    }

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
    };

    try {
        console.log("Sending email with params:", templateParams);
        const response = await emailjs.send(
            emailJsServiceId,
            emailJsTemplateId,
            templateParams,
            emailJsPublicKey
        );

        console.log('EmailJS SUCCESS!', response.status, response.text);
        toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. Your message has been sent successfully!",
            variant: "default", // Use default for success
        });
        form.reset(); // Reset form after successful submission

    } catch (error: any) {
        console.error('EmailJS FAILED...', error);
        // Provide a more user-friendly error message
        toast({
            title: "Submission Error",
            description: `We encountered an issue sending your message. Error: ${error?.text || 'Unknown error'}. Please try again later or contact us directly.`,
            variant: "destructive",
        });
    }
  }

  return (
     <div className="relative isolate overflow-hidden bg-background py-16 md:py-20 lg:py-24">
       {/* Background Image and Overlay */}
       <div
        className="absolute inset-0 -z-10 h-full w-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://picsum.photos/seed/contactMapNetwork/1920/1080')" }}
        data-ai-hint="abstract network connection lines map global communication blue"
       ></div>
       <div className="bg-overlay"></div> {/* Use shared overlay class */}


      <div className="container mx-auto px-4 relative z-10"> {/* Content container */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 animate-fade-in-down text-primary">Get in Touch</h1>
        <p className="text-center text-lg text-muted-foreground mb-16 max-w-3xl mx-auto animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
          We're excited to hear about your project or answer any questions you may have. Reach out using the form below or through our contact details.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form Card (Spanning 3 columns on large screens) */}
          <Card className="lg:col-span-3 card-base animate-subtle-slide-up shadow-xl bg-card/80 backdrop-blur-md border border-border/30"> {/* Card transparency */}
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-foreground">Send Us a Message</CardTitle>
              <CardDescription className="text-muted-foreground">We'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                {/* Form now directly calls the onSubmit handler which uses EmailJS */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                           {/* Ensure Input receives all necessary field props */}
                          <Input
                            placeholder="e.g., Jane Doe"
                            className="bg-input/70 border-border/50 focus:border-primary focus:ring-primary/50"
                            {...field} // Spread field props here
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          {/* Ensure Input receives all necessary field props */}
                          <Input
                            type="email"
                            placeholder="e.g., jane.doe@example.com"
                            className="bg-input/70 border-border/50 focus:border-primary focus:ring-primary/50"
                             {...field} // Spread field props here
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                           {/* Ensure Textarea receives all necessary field props */}
                          <Textarea
                            placeholder="Tell us how we can help..."
                            className="resize-none min-h-[120px] bg-input/70 border-border/50 focus:border-primary focus:ring-primary/50"
                            rows={5}
                            {...field} // Spread field props here
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full mt-2 transform hover:scale-105 transition-transform duration-300" size="lg" disabled={isSubmitting}>
                    <span className="flex items-center justify-center gap-2">
                      <Send className="mr-1 h-5 w-5" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Contact Info & Socials Card (Spanning 2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-8 animate-subtle-slide-up" style={{ animationDelay: '0.2s' }}>
            <Card className="card-base shadow-xl bg-card/80 backdrop-blur-md border border-border/30"> {/* Card transparency */}
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl text-foreground">Contact Information</CardTitle>
                <CardDescription className="text-muted-foreground">Other ways to reach us.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors transform hover:translate-x-1">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <a href="mailto:gensyx6@gmail.com" className="text-foreground hover:text-primary text-base break-all">gensyx6@gmail.com</a>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors transform hover:translate-x-1">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-foreground text-base">9361104465</span>
                </div>
                <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors transform hover:translate-x-1">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <span className="text-foreground text-base">Coimbatore, India</span>
                </div>
              </CardContent>
            </Card>

             {/* Social Media Links Card */}
             <Card className="card-base shadow-xl bg-card/80 backdrop-blur-md border border-border/30">
               <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl text-foreground">Connect With Us</CardTitle>
               </CardHeader>
               <CardContent className="flex justify-around items-center space-x-4 pt-2 pb-4">
                 <Link href="https://github.com/Gensyx-Solutions" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110">
                    <Github size={28} />
                   <span className="sr-only">GitHub</span>
                 </Link>
                 <Link href="https://x.com/i/flow/login?redirect_after_login=%2FGensyxSolutions" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110">
                    <Twitter size={28} />
                   <span className="sr-only">X (Twitter)</span>
                 </Link>
                 <Link href="https://www.linkedin.com/company/gensyx-solutions/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110">
                    <Linkedin size={28} />
                   <span className="sr-only">LinkedIn</span>
                 </Link>
                 <Link href="https://www.instagram.com/gensyx_solutions?igsh=OTduZ3RibWI2Nm5m" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110">
                    <Instagram size={28} />
                   <span className="sr-only">Instagram</span>
                 </Link>
               </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

