"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Form validation schema
const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(100, "Username is too long"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Demo credentials
const VALID_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (
        data.username === VALID_CREDENTIALS.username &&
        data.password === VALID_CREDENTIALS.password
      ) {
        // Store authentication state (example, replace with your auth logic)
        sessionStorage.setItem("pos_authenticated", "true");

        toast.success("Logged in successfully", {
          duration: 3000,
        });

        router.push("/pos");
      } else {
        toast.error("Invalid username or password", {
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("An error occurred while logging in", {
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-md">
        <div className="bg-white px-8 py-12 rounded-lg shadow-lg">
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-neutral-500">
                Enter your credentials to access the POS system
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-neutral-700">Username</label>
                <Input id="username" type="text" placeholder="Enter your username" disabled={isSubmitting} {...form.register("username")} className="w-full" />
                {form.formState.errors.username && (<p className="text-sm text-red-500">{form.formState.errors.username.message}</p>)}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-neutral-700">Password</label>
                <Input id="password" type="password" placeholder="Enter your password" disabled={isSubmitting} {...form.register("password")} className="w-full" />
                {form.formState.errors.password && (<p className="text-sm text-red-500">{form.formState.errors.password.message}</p>)}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
                {isSubmitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing in...</>) : ("Sign in")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}