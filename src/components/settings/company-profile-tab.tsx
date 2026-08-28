"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/input";
import { toast } from "@/lib/toast-bus";
import { COMPANY_PROFILE, type CompanyProfile } from "@/lib/dummy-data/settings";

const formSchema = z.object({
  name: z.string().min(1, "Enter a company name"),
  address: z.string().min(1, "Enter an address"),
  phone: z.string().min(1, "Enter a phone number"),
  email: z.string().email("Enter a valid email"),
  website: z.string().min(1, "Enter a website"),
  taxId: z.string().min(1, "Enter a tax ID"),
});

export function CompanyProfileTab() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: COMPANY_PROFILE,
  });

  const onSubmit = async (values: CompanyProfile) => {
    await new Promise((r) => setTimeout(r, 400));
    toast({ variant: "success", title: "Company profile updated" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <Label htmlFor="company-name">Company name</Label>
          <Input id="company-name" error={!!errors.name} {...register("name")} />
          {errors.name ? <FieldError>{errors.name.message}</FieldError> : null}
        </div>
        <div>
          <Label htmlFor="company-address">Address</Label>
          <Input id="company-address" error={!!errors.address} {...register("address")} />
          {errors.address ? <FieldError>{errors.address.message}</FieldError> : null}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="company-phone">Phone</Label>
            <Input id="company-phone" type="tel" error={!!errors.phone} {...register("phone")} />
            {errors.phone ? <FieldError>{errors.phone.message}</FieldError> : null}
          </div>
          <div>
            <Label htmlFor="company-email">Support email</Label>
            <Input id="company-email" type="email" error={!!errors.email} {...register("email")} />
            {errors.email ? <FieldError>{errors.email.message}</FieldError> : null}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="company-website">Website</Label>
            <Input id="company-website" error={!!errors.website} {...register("website")} />
            {errors.website ? <FieldError>{errors.website.message}</FieldError> : null}
          </div>
          <div>
            <Label htmlFor="company-tax-id">Tax ID</Label>
            <Input id="company-tax-id" error={!!errors.taxId} {...register("taxId")} />
            {errors.taxId ? <FieldError>{errors.taxId.message}</FieldError> : null}
          </div>
        </div>
        <div className="flex justify-end border-t border-border pt-4">
          <Button type="submit" loading={isSubmitting}>
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
}
