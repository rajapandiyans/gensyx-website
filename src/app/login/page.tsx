'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Lock, Mail } from 'lucide-react'; // Updated icons

// Define the form schema using Zod
const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, { // Basic password validation
    message: "Password must be at least 8 characters.",
  }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

// Server action to handle login (placeholder)
async function handleLogin(data: LoginFormValues) {
  console.log("Attempting login with:", data);
  // Replace with actual authentication API call
  // Example: const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(data) });
  // Handle JWT token storage (e.g., in HttpOnly cookie or secure local storage)

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate success/error (replace with actual logic)
  if (data.password !== 'password123') { // Example incorrect password
      throw new Error("Invalid email or password combination.");
  }

  // On successful login, redirect or update UI state (handled by auth provider usually)
  console.log("Login successful!");
  return { success: true, message: "Login successful! Redirecting..." };
}


export default function LoginPage() {
  const { toast } = useToast();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

   const {formState: {isSubmitting}} = form;

  async function onSubmit(data: LoginFormValues) {
    try {
      const result = await handleLogin(data);
       if (result.success) {
         toast({
           title: "Login Successful",
           description: "Welcome back!",
           variant: "default", // Use default style for success
         });
        // TODO: Redirect user after a short delay
        // setTimeout(() => router.push('/dashboard'), 1000);
       }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed. Please try again.";
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-background via-primary/5 to-secondary/10 perspective-1000"> {/* Add perspective */}
      <Card className="w-full max-w-md card-base card-hover shadow-2xl border-primary/10 animate-rotate-in transform-style-3d transition-transform duration-700"> {/* Apply rotate-in animation and 3D styles */}
         <CardHeader className="text-center p-8">
           <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary animate-pulse-glow transform hover:scale-110 hover:translate-z-[10px] transition-transform duration-300">
             <LogIn size={32} strokeWidth={1.5} />
           </div>
           <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
           <CardDescription className="text-lg text-muted-foreground mt-1">Log in to access your GenSyx account.</CardDescription>
         </CardHeader>
         <CardContent className="px-6 pb-6">
           <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <FormField
                 control={form.control}
                 name="email"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel className="flex items-center gap-1.5"> <Mail size={16} /> Email Address</FormLabel>
                     <FormControl>
                       <Input type="email" placeholder="you@example.com" {...field} className="transform hover:scale-[1.02] hover:translate-z-[3px] transition-transform duration-200"/>
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
               <FormField
                 control={form.control}
                 name="password"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel className="flex items-center gap-1.5"><Lock size={16} /> Password</FormLabel>
                     <FormControl>
                       <Input type="password" placeholder="••••••••" {...field} className="transform hover:scale-[1.02] hover:translate-z-[3px] transition-transform duration-200"/> {/* Use dots for placeholder */}
                     </FormControl>
                     <FormMessage />
                     <div className="text-right mt-2">
                        <Link href="#" /* Placeholder - Replace with actual link */ className="text-xs text-muted-foreground hover:text-primary hover:underline transition-colors transform hover:translate-z-[2px]">
                          {/* Ensure single child */}
                          <span>Forgot password?</span>
                        </Link>
                      </div>
                   </FormItem>
                 )}
               />
                <Button type="submit" className="w-full mt-2 transform hover:scale-105 hover:translate-z-[5px] transition-transform duration-300" size="lg" disabled={isSubmitting}>
                 {/* Ensure single child */}
                 <span className="flex items-center justify-center gap-2">
                     <LogIn className="mr-1 h-5 w-5" />
                     {isSubmitting ? "Logging In..." : "Log In"}
                 </span>
               </Button>
             </form>
           </Form>
         </CardContent>
         <CardFooter className="flex flex-col items-center text-center p-6 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-primary hover:underline transition-colors transform hover:translate-z-[2px]">
                {/* Ensure single child */}
                <span>Sign up here</span>
              </Link>
            </p>
         </CardFooter>
      </Card>
    </div>
  );
}
