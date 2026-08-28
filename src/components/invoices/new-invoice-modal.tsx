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
import { CUSTOMERS } from "@/lib/dummy-data/customers";
import type { Invoice } from "@/lib/dummy-data/invoices";

const formSchema = z.object({
  customerName: z.string().min(1, "Select a customer"),
  description: z.string().min(1, "Enter a description"),
  amount: z.coerce.number().positive("Enter an amount"),
});

type FormValues = z.infer<typeof formSchema>;

export interface NewInvoiceModalProps {
  onCreate: (invoice: Invoice) => void;
  nextId: string;
}

export function NewInvoiceModal({ onCreate, nextId }: NewInvoiceModalProps) {
  const [open, setOpen] = React.useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { customerName: "", description: "", amount: 0 },
  });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 400));
    const today = new Date().toISOString().slice(0, 10);
    const due = new Date();
    due.setDate(due.getDate() + 30);
    onCreate({
      id: nextId,
      customerName: values.customerName,
      workOrderId: null,
      status: "draft",
      issueDate: today,
      dueDate: due.toISOString().slice(0, 10),
      paidDate: null,
      lineItems: [{ id: "li-1", description: values.description, quantity: 1, unitPrice: values.amount }],
      taxRate: 0,
      discount: 0,
      notes: "",
    });
    toast({ variant: "success", title: "Invoice created", description: `${nextId} for ${values.customerName}` });
    reset();
    setOpen(false);
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button className="gap-1.5">
          <Plus className="size-4" />
          New Invoice
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>New Invoice</ModalTitle>
          <ModalDescription>Create a draft invoice for an existing customer.</ModalDescription>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ModalBody className="space-y-4">
            <div>
              <Label htmlFor="inv-customer">Customer</Label>
              <Controller
                control={control}
                name="customerName"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="inv-customer" className={errors.customerName ? "border-error" : undefined}>
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {CUSTOMERS.map((c) => (
                        <SelectItem key={c.id} value={c.name}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.customerName ? <FieldError>{errors.customerName.message}</FieldError> : null}
            </div>
            <div>
              <Label htmlFor="inv-description">Description</Label>
              <Input id="inv-description" placeholder="e.g. HVAC Preventive Maintenance" error={!!errors.description} {...register("description")} />
              {errors.description ? <FieldError>{errors.description.message}</FieldError> : null}
            </div>
            <div>
              <Label htmlFor="inv-amount">Amount ($)</Label>
              <Input id="inv-amount" type="number" step="0.01" error={!!errors.amount} {...register("amount")} />
              {errors.amount ? <FieldError>{errors.amount.message}</FieldError> : null}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Create Invoice
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
