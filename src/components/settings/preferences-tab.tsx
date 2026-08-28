"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError, FieldHelperText } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "@/lib/toast-bus";
import { PREFERENCES } from "@/lib/dummy-data/settings";

const TIMEZONES = [
  { value: "America/Los_Angeles", label: "Pacific Time (US & Canada)" },
  { value: "America/Denver", label: "Mountain Time (US & Canada)" },
  { value: "America/Chicago", label: "Central Time (US & Canada)" },
  { value: "America/New_York", label: "Eastern Time (US & Canada)" },
];

const DATE_FORMATS = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"];

const formSchema = z.object({
  timezone: z.string().min(1),
  dateFormat: z.string().min(1),
  defaultLaborRate: z.coerce.number().positive("Enter a labor rate"),
  defaultTaxRatePct: z.coerce.number().min(0, "Enter a tax rate").max(100, "Must be 100 or less"),
  paymentTermsDays: z.coerce.number().int().positive("Enter payment terms"),
});

export function PreferencesTab() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: PREFERENCES,
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 400));
    toast({ variant: "success", title: "Preferences updated" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="pref-timezone">Timezone</Label>
            <Controller
              control={control}
              name="timezone"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="pref-timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label htmlFor="pref-date-format">Date format</Label>
            <Controller
              control={control}
              name="dateFormat"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="pref-date-format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DATE_FORMATS.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="pref-labor-rate">Default labor rate ($/hr)</Label>
            <Input id="pref-labor-rate" type="number" step="1" error={!!errors.defaultLaborRate} {...register("defaultLaborRate")} />
            {errors.defaultLaborRate ? <FieldError>{errors.defaultLaborRate.message}</FieldError> : null}
          </div>
          <div>
            <Label htmlFor="pref-tax-rate">Default tax rate (%)</Label>
            <Input id="pref-tax-rate" type="number" step="0.1" error={!!errors.defaultTaxRatePct} {...register("defaultTaxRatePct")} />
            {errors.defaultTaxRatePct ? <FieldError>{errors.defaultTaxRatePct.message}</FieldError> : null}
          </div>
          <div>
            <Label htmlFor="pref-payment-terms">Payment terms (days)</Label>
            <Input id="pref-payment-terms" type="number" step="1" error={!!errors.paymentTermsDays} {...register("paymentTermsDays")} />
            {errors.paymentTermsDays ? (
              <FieldError>{errors.paymentTermsDays.message}</FieldError>
            ) : (
              <FieldHelperText>Applied to new invoices' due dates.</FieldHelperText>
            )}
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
