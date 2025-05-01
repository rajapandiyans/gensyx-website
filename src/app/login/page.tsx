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
import { LogIn, Code } from 'lucide-react';

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
      throw new Error("Invalid email or password.");
  }

  // On successful login, redirect or update UI state (handled by auth provider usually)
  console.log("Login successful!");
  return { success: true, message: "Login successful!" };
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
         });
        // TODO: Redirect user to dashboard or home page
        // Example: router.push('/dashboard');
       }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed. Please check your credentials.";
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-background via-background to-secondary/10">
      <Card className="w-full max-w-md shadow-2xl border border-primary/10 animate-subtle-fade-in">
         <CardHeader className="text-center">
           <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
             <Code size={28} />
           </div>
           <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
           <CardDescription>Log in to your GenSyx account.</CardDescription>
         </CardHeader>
         <CardContent>
           <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <FormField
                 control={form.control}
                 name="email"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                       <Input type="email" placeholder="you@example.com" {...field} />
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
                     <FormLabel>Password</FormLabel>
                     <FormControl>
                       <Input type="password" placeholder="********" {...field} />
                     </FormControl>
                     <FormMessage />
                     {/* Add Forgot Password link here if needed */}
                     <div className="text-right mt-1">
                        <Link href="/forgot-password" /* Replace with actual link */ className="text-xs text-muted-foreground hover:text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                   </FormItem>
                 )}
               />
               <Button type="submit" className="w-full" disabled={isSubmitting}>
                 <LogIn className="mr-2 h-4 w-4" />
                 {isSubmitting ? "Logging in..." : "Log In"}
               </Button>
             </form>
           </Form>
         </CardContent>
         <CardFooter className="flex flex-col items-center text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                Sign Up
              </Link>
            </p>
         </CardFooter>
      </Card>
    </div>
  );
}
