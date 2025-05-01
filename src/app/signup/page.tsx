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
import { sendVerificationEmail } from '@/services/email';

// Define the form schema using Zod
const signupFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

// Server action to handle signup (placeholder)
async function handleSignup(data: SignupFormValues) {
  console.log("Attempting signup with:", data);
  await new Promise(resolve => setTimeout(resolve, 1500));
  const success = Math.random() > 0.1;
  if (!success) {
    throw new Error("Signup failed. This email might already be registered.");
  }
  try {
     await sendVerificationEmail(data.email);
     console.log("Verification email sent to:", data.email);
  } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      // Optionally, inform the user that the verification email failed, but the account was created
  }
  return { success: true, message: "Account created! Check your email to verify." };
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
         // TODO: Optionally redirect
       }
     } catch (error) {
        const message = error instanceof Error ? error.message : "Signup failed. Please try again.";
        toast({
          title: "Signup Error",
          description: message,
          variant: "destructive",
        });
     }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background animate-background-pan"> {/* Use background animation */}
      <Card className="w-full max-w-md card-base shadow-2xl border border-border/30 animate-rotate-in bg-card"> {/* Removed 3D styles, adjusted styles */}
         <CardHeader className="text-center p-8">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary animate-pulse-glow transform hover:scale-110 transition-transform duration-300"> {/* Kept icon glow */}
             <UserPlus size={32} strokeWidth={1.5} />
           </div>
           <CardTitle className="text-3xl font-bold text-foreground">Create Your Account</CardTitle> {/* Ensured text color */}
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
                     <FormLabel className="flex items-center gap-1.5 text-muted-foreground"><User size={16}/> Full Name</FormLabel> {/* Adjusted label color */}
                     <FormControl>
                       <Input placeholder="e.g., John Smith" {...field} className="transform hover:scale-[1.02] transition-transform duration-200 bg-input border-border/50 focus:border-primary focus:ring-primary/50"/> {/* Added input style */}
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
                     <FormLabel className="flex items-center gap-1.5 text-muted-foreground"><Mail size={16}/> Email Address</FormLabel> {/* Adjusted label color */}
                     <FormControl>
                       <Input type="email" placeholder="you@example.com" {...field} className="transform hover:scale-[1.02] transition-transform duration-200 bg-input border-border/50 focus:border-primary focus:ring-primary/50"/> {/* Added input style */}
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
                     <FormLabel className="flex items-center gap-1.5 text-muted-foreground"><Lock size={16}/> Password</FormLabel> {/* Adjusted label color */}
                     <FormControl>
                       <Input type="password" placeholder="Choose a strong password (min 8 chars)" {...field} className="transform hover:scale-[1.02] transition-transform duration-200 bg-input border-border/50 focus:border-primary focus:ring-primary/50"/> {/* Added input style */}
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
          <CardFooter className="flex flex-col items-center text-center p-6 pt-4 border-t border-border/20"> {/* Lighter border */}
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
