'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { MapPin, Mail, Phone, Send } from 'lucide-react'; // Icons for contact info and send button

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

// Server action to handle form submission (placeholder)
async function submitContactForm(data: ContactFormValues) {
  console.log("Submitting contact form data:", data);
  // Replace with actual API call to backend
  // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate success/error
  const success = Math.random() > 0.2; // 80% chance of success
  if (!success) {
    throw new Error("Failed to send message. Please try again later.");
  }
  return { message: "Your message has been sent successfully!" };
}


export default function ContactPage() {
  const { toast } } from useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onChange", // Validate on change
  });

  const {formState: {isSubmitting}} = form;

  async function onSubmit(data: ContactFormValues) {
    try {
      const result = await submitContactForm(data);
      toast({
        title: "Message Sent!",
        description: result.message,
        variant: "default",
      });
      form.reset(); // Reset form on success
    } catch (error) {
       const message = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        title: "Submission Error",
        description: message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24 perspective-1000"> {/* Add perspective */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 animate-fade-in-down text-primary">Get in Touch</h1>
      <p className="text-center text-lg text-muted-foreground mb-16 max-w-3xl mx-auto animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
        We're excited to hear about your project or answer any questions you may have. Reach out using the form below or through our contact details.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Contact Form Card (Spanning 3 columns on large screens) */}
        <Card className="lg:col-span-3 card-base card-hover animate-subtle-slide-up shadow-xl transform-style-3d transition-transform duration-500">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Send Us a Message</CardTitle>
            <CardDescription>We'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
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
                        <Input type="email" placeholder="e.g., jane.doe@example.com" {...field} />
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
                        <Textarea
                          placeholder="Tell us how we can help..."
                          className="resize-none min-h-[120px]"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <Button type="submit" className="w-full mt-2 transform hover:scale-105 hover:translate-z-[5px] transition-transform duration-300" size="lg" disabled={isSubmitting}>
                   {/* Ensure single child */}
                   <span className="flex items-center justify-center gap-2">
                       <Send className="mr-2 h-5 w-5" />
                       {isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                 </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Contact Info & Map Card (Spanning 2 columns on large screens) */}
        <div className="lg:col-span-2 space-y-8 animate-subtle-slide-up" style={{ animationDelay: '0.2s' }}>
           <Card className="card-base card-hover shadow-xl transform-style-3d transition-transform duration-500">
             <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">Contact Information</CardTitle>
                <CardDescription>Other ways to reach us.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-5">
                <div className="flex items-center gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors transform hover:translate-x-1 hover:translate-z-[3px]">
                   <Mail className="h-6 w-6 text-primary flex-shrink-0" strokeWidth={1.5} />
                   <a href="mailto:info@gensyx.com" className="text-foreground hover:text-primary text-base break-all">info@gensyx.com</a>
                 </div>
                <div className="flex items-center gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors transform hover:translate-x-1 hover:translate-z-[3px]">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-foreground text-base">(123) 456-7890</span> {/* Placeholder */}
                </div>
                <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors transform hover:translate-x-1 hover:translate-z-[3px]">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <span className="text-foreground text-base">123 Digital Avenue, Tech City, TX 75001</span> {/* Placeholder */}
                </div>
             </CardContent>
           </Card>

          {/* Placeholder for Map */}
          <Card className="card-base card-hover shadow-xl overflow-hidden transform-style-3d transition-transform duration-500">
             <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">Our Location</CardTitle>
             </CardHeader>
            <CardContent>
                <div className="aspect-video bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg flex items-center justify-center text-muted-foreground border border-border transform-style-3d hover:scale-105 transition-transform duration-300">
                   {/* Replace this div with actual Map Embed */}
                   <MapPin className="h-16 w-16 opacity-30" />
                   <span className="ml-3 text-lg font-medium opacity-70">Interactive Map Coming Soon</span>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}