"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input, Label, FieldError } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast-bus";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginValues) => {
    // No backend yet (Phase 6) — any well-formed credentials sign in against
    // dummy data. Real auth wires up here later.
    void values;
    await new Promise((r) => setTimeout(r, 400));
    toast({ variant: "success", title: "Signed in", description: "Welcome back." });
    router.push("/");
  };

  return (
    <Card>
      <CardHeader className="flex-col items-start gap-1">
        <CardTitle className="text-xl">Sign in</CardTitle>
        <CardDescription>Access your FieldPro workspace.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              error={!!errors.email}
              {...register("email")}
            />
            {errors.email ? <FieldError>{errors.email.message}</FieldError> : null}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="mb-0">
                Password
              </Label>
              <Link href="/forgot-password" className="text-[13px] font-medium text-primary-text hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="mt-1.5"
              error={!!errors.password}
              {...register("password")}
            />
            {errors.password ? <FieldError>{errors.password.message}</FieldError> : null}
          </div>
          <Button type="submit" className="w-full" loading={isSubmitting}>
            Sign in
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
