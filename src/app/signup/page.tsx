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
import { UserPlus, Code } from 'lucide-react';
import { sendVerificationEmail } from '@/services/email'; // Import the email service

// Define the form schema using Zod
const signupFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  // Optional: Add password confirmation if needed
  // confirmPassword: z.string().min(8),
})
// Optional: Refine schema to check if passwords match
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"], // path of error
// });

type SignupFormValues = z.infer<typeof signupFormSchema>;

// Server action to handle signup (placeholder)
async function handleSignup(data: SignupFormValues) {
  console.log("Attempting signup with:", data);

  // **Important:** In a real backend, hash the password before storing!
  // Example (using bcrypt - needs installation: npm install bcrypt @types/bcrypt):
  // const hashedPassword = await bcrypt.hash(data.password, 10);
  // const userData = { name: data.name, email: data.email, password: hashedPassword };

  // Replace with actual API call to backend to create user
  // Example: const response = await fetch('/api/auth/signup', { method: 'POST', body: JSON.stringify(userData) });
  // Handle potential errors like duplicate email

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate success/error (replace with actual logic)
  const success = Math.random() > 0.1; // 90% chance of success
  if (!success) {
    throw new Error("Signup failed. An account with this email might already exist.");
  }

  // Send verification email on successful signup
  try {
     await sendVerificationEmail(data.email);
     console.log("Verification email sent to:", data.email);
  } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      // Optionally inform the user, but the account might still be created
  }


  // Return success message
  return { success: true, message: "Account created successfully! Please check your email to verify your account." };
}


export default function SignupPage() {
  const { toast } = useToast();
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      // confirmPassword: "",
    },
    mode: "onChange",
  });

  const {formState: {isSubmitting}} = form;

  async function onSubmit(data: SignupFormValues) {
     try {
       const result = await handleSignup(data);
       if (result.success) {
         toast({
           title: "Account Created!",
           description: result.message,
         });
         // TODO: Optionally redirect to a "check your email" page or login page
         form.reset(); // Reset form on success
       }
     } catch (error) {
        const message = error instanceof Error ? error.message : "Signup failed. Please try again.";
        toast({
          title: "Signup Failed",
          description: message,
          variant: "destructive",
        });
     }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-background via-background to-primary/10">
      <Card className="w-full max-w-md shadow-2xl border border-primary/10 animate-subtle-fade-in">
         <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
             <Code size={28} />
           </div>
           <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
           <CardDescription>Join GenSyx and start your digital journey.</CardDescription>
         </CardHeader>
         <CardContent>
           <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
               <FormField
                 control={form.control}
                 name="name"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Full Name</FormLabel>
                     <FormControl>
                       <Input placeholder="Your Full Name" {...field} />
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
                       <Input type="password" placeholder="Choose a strong password" {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
               {/* Optional Confirm Password Field */}
               {/* <FormField
                 control={form.control}
                 name="confirmPassword"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Confirm Password</FormLabel>
                     <FormControl>
                       <Input type="password" placeholder="Confirm your password" {...field} />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               /> */}
               <Button type="submit" className="w-full" disabled={isSubmitting}>
                 <UserPlus className="mr-2 h-4 w-4" />
                 {isSubmitting ? "Creating Account..." : "Sign Up"}
               </Button>
             </form>
           </Form>
         </CardContent>
          <CardFooter className="flex flex-col items-center text-center pt-4">
             <p className="text-sm text-muted-foreground">
               Already have an account?{' '}
               <Link href="/login" className="font-medium text-primary hover:underline">
                 Log In
               </Link>
             </p>
          </CardFooter>
      </Card>
    </div>
  );
}
