"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, MailCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input, Label, FieldError } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [sentTo, setSentTo] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (values: ForgotPasswordValues) => {
    await new Promise((r) => setTimeout(r, 400));
    setSentTo(values.email);
  };

  if (sentTo) {
    return (
      <Card className="text-center">
        <CardContent className="flex flex-col items-center gap-3 py-4">
          <span className="flex size-12 items-center justify-center rounded-full bg-success-bg text-success">
            <MailCheck className="size-6" />
          </span>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            If an account exists for <span className="font-medium text-text-primary">{sentTo}</span>, a reset
            link is on its way.
          </CardDescription>
          <Link href="/login" className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary-text hover:underline">
            <ArrowLeft className="size-4" /> Back to sign in
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex-col items-start gap-1">
        <CardTitle className="text-xl">Reset your password</CardTitle>
        <CardDescription>We&apos;ll email you a link to reset it.</CardDescription>
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
          <Button type="submit" className="w-full" loading={isSubmitting}>
            Send reset link
          </Button>
          <Link
            href="/login"
            className="flex items-center justify-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="size-4" /> Back to sign in
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
