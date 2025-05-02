
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
import { LogIn, Lock, Mail } from 'lucide-react';
import { db } from "@/lib/firebase/firebase"; // Import Firestore instance
import { doc, getDoc } from "firebase/firestore";
import bcrypt from 'bcrypt'; // Import bcrypt

// Define the form schema using Zod
const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).transform((email) => email.toLowerCase()), // Normalize email to lowercase
  password: z.string().min(1, { // Password cannot be empty
    message: "Password is required.",
  }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

// Server action to handle login
async function handleLogin(data: LoginFormValues) {
  console.log("Attempting login with email:", data.email);

  // 1. Fetch user data from Firestore using the normalized email
  const userDocRef = doc(db, "users", data.email);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    console.log("Login failed: User not found for email:", data.email);
    throw new Error("Invalid email or password combination.");
  }

  const userData = userDocSnap.data();
  console.log("User data found for:", data.email);

  // 2. Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(data.password, userData.hashedPassword);

  if (!isPasswordValid) {
    console.log("Login failed: Invalid password for email:", data.email);
    throw new Error("Invalid email or password combination.");
  }

  console.log("Password validated successfully for:", data.email);
  // Login successful
  // In a real app, you would typically generate a session token (e.g., JWT) here
  // and send it back to the client to store (e.g., in cookies or local storage).
  return { success: true, message: "Login successful! Redirecting...", userName: userData.name };
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
           description: `Welcome back, ${result.userName}!`, // Use the name from DB
           variant: "default",
         });
        // TODO: Implement actual session management and redirection
        // Example: Redirect to a dashboard or home page
        // router.push('/dashboard');
       }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed. Please try again.";
      // Log the specific error server-side for debugging, but show generic message to user
      console.error("Login failed for", data.email, ":", error);
      toast({
        title: "Login Failed",
        description: "Invalid email or password combination.", // Keep the message generic for security
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background animate-background-pan"> {/* Use background animation */}
      <Card className="w-full max-w-md card-base shadow-2xl border border-border/30 animate-rotate-in bg-card">
         <CardHeader className="text-center p-8">
           <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary animate-pulse-glow transform hover:scale-110 transition-transform duration-300">
             <LogIn size={32} strokeWidth={1.5} />
           </div>
           <CardTitle className="text-3xl font-bold text-foreground">Welcome Back</CardTitle>
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
                     <FormLabel className="flex items-center gap-1.5 text-muted-foreground"> <Mail size={16} /> Email Address</FormLabel>
                     <FormControl>
                       <Input
                         type="email"
                         placeholder="you@example.com"
                         className="transform hover:scale-[1.02] transition-transform duration-200 bg-input border-border/50 focus:border-primary focus:ring-primary/50"
                         {...field} // Spread field props here
                         disabled={isSubmitting}
                       />
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
                     <FormLabel className="flex items-center gap-1.5 text-muted-foreground"><Lock size={16} /> Password</FormLabel>
                     <FormControl>
                       <Input
                         type="password"
                         placeholder="••••••••"
                         className="transform hover:scale-[1.02] transition-transform duration-200 bg-input border-border/50 focus:border-primary focus:ring-primary/50"
                         {...field} // Spread field props here
                          disabled={isSubmitting}
                       />
                     </FormControl>
                     <FormMessage />
                     <div className="text-right mt-2">
                        <Link href="#" className="text-xs text-muted-foreground hover:text-primary hover:underline transition-colors">
                          <span>Forgot password?</span>
                        </Link>
                      </div>
                   </FormItem>
                 )}
               />
                <Button type="submit" className="w-full mt-2 transform hover:scale-105 transition-transform duration-300" size="lg" disabled={isSubmitting}>
                 <span className="flex items-center justify-center gap-2">
                     <LogIn className="mr-1 h-5 w-5" />
                     {isSubmitting ? "Logging In..." : "Log In"}
                 </span>
               </Button>
             </form>
           </Form>
         </CardContent>
         <CardFooter className="flex flex-col items-center text-center p-6 pt-4 border-t border-border/20">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-primary hover:underline transition-colors">
                <span>Sign up here</span>
              </Link>
            </p>
         </CardFooter>
      </Card>
    </div>
  );
}
