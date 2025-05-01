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
import { MapPin, Mail, Phone } from 'lucide-react'; // Icons for contact info

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
    throw new Error("Failed to send message. Please try again.");
  }
  return { message: "Message sent successfully!" };
}


export default function ContactPage() {
  const { toast } = useToast();
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
        title: "Success!",
        description: result.message,
        variant: "default", // Use default (greenish in dark mode usually)
      });
      form.reset(); // Reset form on success
    } catch (error) {
       const message = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <h1 className="text-4xl font-bold text-center mb-12 animate-subtle-fade-in text-primary">Contact Us</h1>
      <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-subtle-fade-in" style={{ animationDelay: '0.1s' }}>
        Have a question or a project in mind? We'd love to hear from you. Fill out the form below or use our contact details.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form Card */}
        <Card className="shadow-lg animate-subtle-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="text-2xl">Send us a Message</CardTitle>
            <CardDescription>We typically respond within 24 hours.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
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
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project or inquiry..."
                          className="resize-none"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Contact Info & Map Card */}
        <div className="space-y-8 animate-subtle-slide-up" style={{ animationDelay: '0.3s' }}>
           <Card className="shadow-lg">
             <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
                <CardDescription>Reach out to us directly.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                   <Mail className="h-5 w-5 text-primary" />
                   <a href="mailto:info@gensyx.com" className="text-foreground hover:text-primary">info@gensyx.com</a>
                 </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-foreground">(123) 456-7890</span> {/* Placeholder number */}
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <span className="text-foreground">123 Digital Avenue, Tech City, TX 75001</span> {/* Placeholder address */}
                </div>
             </CardContent>
           </Card>

          {/* Placeholder for Google Maps */}
          <Card className="shadow-lg overflow-hidden">
             <CardHeader>
                <CardTitle className="text-2xl">Our Location</CardTitle>
             </CardHeader>
            <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                   {/* Replace this div with actual Google Maps Embed/Component */}
                   <MapPin className="h-16 w-16 opacity-50" />
                    <span className="ml-2">Map Placeholder</span>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
