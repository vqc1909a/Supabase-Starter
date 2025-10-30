"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const {error} = await supabase.auth.signUp({
				email,
				password,
				options: {
					// where to redirect the user after they click the confirmation link in their email. Let me break this down:
					// 1. User fills out sign-up form and submits
					//                     ↓
					// 2. You will be redirected to the sign-up success page
					//                     ↓
					// 3. Supabase sends confirmation email to user
					//                     ↓
					// 4. User clicks link in email
					//                     ↓
					// 5. User is redirected to `/protected` page (emailRedirectTo) due to the last line below
					//                     ↓
					// 6. User is redirected to the login page
					//                     ↓
					// 7. User logs in and accesses protected content
					//
					// Note: You need to handle the redirect in your app. Supabase won't do it for you.
					//
					// Also, make sure to add the below redirect URL to the "URL Configuration" option (https://supabase.com/dashboard/project/id_project/auth/url-configuration)
					// in your Supabase Url Configuration, otherwise the redirect to the link in the email won't work.
					emailRedirectTo: `${window.location.origin}/protected`,
				},
			});
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Sign up</CardTitle>
					<CardDescription>Create a new account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSignUp}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>
								<Input
									id="password"
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="repeat-password">Repeat Password</Label>
								</div>
								<Input
									id="repeat-password"
									type="password"
									required
									value={repeatPassword}
									onChange={(e) => setRepeatPassword(e.target.value)}
								/>
							</div>
							{error && <p className="text-sm text-red-500">{error}</p>}
							<Button
								type="submit"
								className="w-full"
								disabled={isLoading}
								variant="destructive"
							>
								{isLoading ? "Creating an account..." : "Sign up"}
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Already have an account?{" "}
							<Link href="/auth/login" className="underline underline-offset-4">
								Login
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
