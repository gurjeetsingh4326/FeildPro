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
import type { Customer } from "@/lib/dummy-data/customers";

const formSchema = z.object({
  name: z.string().min(1, "Enter a customer name"),
  type: z.enum(["commercial", "residential"]),
  contactName: z.string().min(1, "Enter a contact name"),
  contactRole: z.string().min(1, "Enter a role"),
  phone: z.string().min(1, "Enter a phone number"),
  email: z.string().email("Enter a valid email"),
  address: z.string().min(1, "Enter an address"),
});

type FormValues = z.infer<typeof formSchema>;

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export interface NewCustomerModalProps {
  onCreate: (customer: Customer) => void;
}

export function NewCustomerModal({ onCreate }: NewCustomerModalProps) {
  const [open, setOpen] = React.useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", type: "commercial", contactName: "", contactRole: "", phone: "", email: "", address: "" },
  });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 400));
    const id = `cust-${slugify(values.name)}-${Date.now().toString(36)}`;
    onCreate({
      id,
      name: values.name,
      type: values.type,
      status: "active",
      addresses: [{ id: `${id}-addr-1`, label: "Main", address: values.address, primary: true }],
      contacts: [
        { id: `${id}-con-1`, name: values.contactName, role: values.contactRole, phone: values.phone, email: values.email, primary: true },
      ],
      customerSince: new Date().toISOString().slice(0, 10),
      notes: "",
    });
    toast({ variant: "success", title: "Customer created", description: values.name });
    reset();
    setOpen(false);
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button className="gap-1.5">
          <Plus className="size-4" />
          New Customer
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>New Customer</ModalTitle>
          <ModalDescription>Add a customer and their primary contact.</ModalDescription>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ModalBody className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Customer name</Label>
                <Input id="name" error={!!errors.name} {...register("name")} />
                {errors.name ? <FieldError>{errors.name.message}</FieldError> : null}
              </div>
              <div className="col-span-2">
                <Label htmlFor="type">Type</Label>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="residential">Residential</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="contactName">Primary contact</Label>
                <Input id="contactName" error={!!errors.contactName} {...register("contactName")} />
                {errors.contactName ? <FieldError>{errors.contactName.message}</FieldError> : null}
              </div>
              <div>
                <Label htmlFor="contactRole">Role</Label>
                <Input id="contactRole" placeholder="e.g. Office Manager" error={!!errors.contactRole} {...register("contactRole")} />
                {errors.contactRole ? <FieldError>{errors.contactRole.message}</FieldError> : null}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" error={!!errors.phone} {...register("phone")} />
                {errors.phone ? <FieldError>{errors.phone.message}</FieldError> : null}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" error={!!errors.email} {...register("email")} />
                {errors.email ? <FieldError>{errors.email.message}</FieldError> : null}
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" error={!!errors.address} {...register("address")} />
                {errors.address ? <FieldError>{errors.address.message}</FieldError> : null}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Create Customer
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
