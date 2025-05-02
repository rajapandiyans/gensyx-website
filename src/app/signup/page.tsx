
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
import { UserPlus, User, Mail, Lock } from 'lucide-react';
import { db } from "@/lib/firebase/firebase"; // Import Firestore instance
import { doc, setDoc, getDoc } from "firebase/firestore";
import bcrypt from 'bcrypt'; // Import bcrypt

// Define the form schema using Zod
const signupFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).transform((email) => email.toLowerCase()), // Normalize email to lowercase
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

// Server action to handle signup
async function handleSignup(data: SignupFormValues) {
  console.log("Attempting signup with:", { name: data.name, email: data.email });

  // 1. Check if user already exists
  const userDocRef = doc(db, "users", data.email); // Use email as document ID (normalized)
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    throw new Error("This email address is already registered.");
  }

  // 2. Hash the password
  const saltRounds = 10; // Recommended salt rounds
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  console.log("Password hashed successfully.");

  // 3. Store user data in Firestore
  await setDoc(userDocRef, {
    name: data.name,
    email: data.email, // Store normalized email
    hashedPassword: hashedPassword,
    createdAt: new Date(), // Optional: add a timestamp
  });

  console.log("User data stored successfully in Firestore for:", data.email);

  // Removed email verification simulation as it's not implemented
  return { success: true, message: "Account created successfully! You can now log in." };
}


export default function SignupPage() {
  const { toast } = useToast();
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const {formState: {isSubmitting}} = form;

  async function onSubmit(data: SignupFormValues) {
     try {
       const result = await handleSignup(data);
       if (result.success) {
         toast({
           title: "Account Created Successfully!",
           description: result.message,
           variant: "default",
         });
         form.reset();
         // TODO: Optionally redirect to login page after a short delay
       }
     } catch (error) {
        const message = error instanceof Error ? error.message : "Signup failed. Please try again.";
        console.error("Signup Error:", error); // Log the error server-side
        toast({
          title: "Signup Error",
          description: message, // Display user-friendly message
          variant: "destructive",
        });
     }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background animate-background-pan"> {/* Use background animation */}
      <Card className="w-full max-w-md card-base shadow-2xl border border-border/30 animate-rotate-in bg-card">
         <CardHeader className="text-center p-8">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary animate-pulse-glow transform hover:scale-110 transition-transform duration-300">
             <UserPlus size={32} strokeWidth={1.5} />
           </div>
           <CardTitle className="text-3xl font-bold text-foreground">Create Your Account</CardTitle>
           <CardDescription className="text-lg text-muted-foreground mt-1">Join GenSyx and start your digital journey.</CardDescription>
         </CardHeader>
         <CardContent className="px-6 pb-6">
           <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
               <FormField
                 control={form.control}
                 name="name"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel className="flex items-center gap-1.5 text-muted-foreground"><User size={16}/> Full Name</FormLabel>
                     <FormControl>
                       <Input
                         placeholder="e.g., John Smith"
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
                 name="email"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel className="flex items-center gap-1.5 text-muted-foreground"><Mail size={16}/> Email Address</FormLabel>
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
                     <FormLabel className="flex items-center gap-1.5 text-muted-foreground"><Lock size={16}/> Password</FormLabel>
                     <FormControl>
                       <Input
                         type="password"
                         placeholder="Choose a strong password (min 8 chars)"
                         className="transform hover:scale-[1.02] transition-transform duration-200 bg-input border-border/50 focus:border-primary focus:ring-primary/50"
                         {...field} // Spread field props here
                          disabled={isSubmitting}
                       />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
                <Button type="submit" className="w-full mt-2 transform hover:scale-105 transition-transform duration-300" size="lg" disabled={isSubmitting}>
                  <span className="flex items-center justify-center gap-2">
                    <UserPlus className="mr-1 h-5 w-5" />
                    {isSubmitting ? "Creating Account..." : "Sign Up Now"}
                  </span>
               </Button>
             </form>
           </Form>
         </CardContent>
          <CardFooter className="flex flex-col items-center text-center p-6 pt-4 border-t border-border/20">
             <p className="text-sm text-muted-foreground">
               Already have an account?{' '}
               <Link href="/login" className="font-medium text-primary hover:underline transition-colors">
                 <span>Log in instead</span>
               </Link>
             </p>
          </CardFooter>
      </Card>
    </div>
  );
}
