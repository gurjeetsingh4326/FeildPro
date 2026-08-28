"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "@/lib/toast-bus";
import { INVOICES, getInvoice, invoiceTotal } from "@/lib/dummy-data/invoices";
import { PAYMENT_METHOD_META, type Payment, type PaymentMethod } from "@/lib/dummy-data/payments";

const PAYABLE_INVOICES = INVOICES.filter((inv) => inv.status === "sent" || inv.status === "overdue");

const formSchema = z.object({
  invoiceId: z.string().min(1, "Select an invoice"),
  amount: z.coerce.number().positive("Enter an amount"),
  method: z.enum(["credit_card", "ach", "check", "cash"]),
  date: z.string().min(1, "Pick a date"),
});

type FormValues = z.infer<typeof formSchema>;

export interface RecordPaymentModalProps {
  onCreate: (payment: Payment) => void;
  nextId: string;
}

export function RecordPaymentModal({ onCreate, nextId }: RecordPaymentModalProps) {
  const [open, setOpen] = React.useState(false);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { invoiceId: "", amount: 0, method: "credit_card" as PaymentMethod, date: "2026-08-26" },
  });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 400));
    const invoice = getInvoice(values.invoiceId);
    if (!invoice) return;
    onCreate({
      id: nextId,
      invoiceId: values.invoiceId,
      customerName: invoice.customerName,
      amount: values.amount,
      method: values.method,
      date: values.date,
      status: "completed",
    });
    toast({ variant: "success", title: "Payment recorded", description: `${nextId} for ${invoice.customerName}` });
    reset();
    setOpen(false);
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button className="gap-1.5">
          <Plus className="size-4" />
          Record Payment
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Record Payment</ModalTitle>
          <ModalDescription>Log a payment received against an invoice.</ModalDescription>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ModalBody className="space-y-4">
            <div>
              <Label htmlFor="pmt-invoice">Invoice</Label>
              <Controller
                control={control}
                name="invoiceId"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(v) => {
                      field.onChange(v);
                      const invoice = getInvoice(v);
                      if (invoice) setValue("amount", invoiceTotal(invoice));
                    }}
                  >
                    <SelectTrigger id="pmt-invoice" className={errors.invoiceId ? "border-error" : undefined}>
                      <SelectValue placeholder="Select an invoice" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYABLE_INVOICES.map((inv) => (
                        <SelectItem key={inv.id} value={inv.id}>
                          {inv.id} · {inv.customerName} · ${invoiceTotal(inv).toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.invoiceId ? <FieldError>{errors.invoiceId.message}</FieldError> : null}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pmt-amount">Amount ($)</Label>
                <Input id="pmt-amount" type="number" step="0.01" error={!!errors.amount} {...register("amount")} />
                {errors.amount ? <FieldError>{errors.amount.message}</FieldError> : null}
              </div>
              <div>
                <Label htmlFor="pmt-method">Method</Label>
                <Controller
                  control={control}
                  name="method"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={(v) => field.onChange(v as PaymentMethod)}>
                      <SelectTrigger id="pmt-method">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(PAYMENT_METHOD_META) as PaymentMethod[]).map((m) => (
                          <SelectItem key={m} value={m}>
                            {PAYMENT_METHOD_META[m].label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="pmt-date">Date</Label>
              <Input id="pmt-date" type="date" error={!!errors.date} {...register("date")} />
              {errors.date ? <FieldError>{errors.date.message}</FieldError> : null}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Record Payment
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
