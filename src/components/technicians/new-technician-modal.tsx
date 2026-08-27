"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
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
import { toast } from "@/lib/toast-bus";
import type { TechnicianProfile } from "@/lib/dummy-data/technicians";

const COLORS = ["#8B5CF6", "#2563EB", "#0D9488", "#EA580C", "#C026D3", "#65A30D", "#DB2777", "#0891B2"];

const formSchema = z.object({
  name: z.string().min(1, "Enter a name"),
  role: z.string().min(1, "Enter a role"),
  phone: z.string().min(1, "Enter a phone number"),
  email: z.string().email("Enter a valid email"),
  skills: z.string().min(1, "Enter at least one skill"),
});

type FormValues = z.infer<typeof formSchema>;

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export interface NewTechnicianModalProps {
  onCreate: (technician: TechnicianProfile) => void;
}

export function NewTechnicianModal({ onCreate }: NewTechnicianModalProps) {
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", role: "", phone: "", email: "", skills: "" },
  });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 400));
    const id = `tech-${slugify(values.name)}-${Date.now().toString(36)}`;
    onCreate({
      id,
      name: values.name,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      status: "active",
      role: values.role,
      phone: values.phone,
      email: values.email,
      hireDate: new Date().toISOString().slice(0, 10),
      skills: values.skills.split(",").map((s) => s.trim()).filter(Boolean),
      availability: {
        mon: { start: "8:00 AM", end: "5:00 PM" },
        tue: { start: "8:00 AM", end: "5:00 PM" },
        wed: { start: "8:00 AM", end: "5:00 PM" },
        thu: { start: "8:00 AM", end: "5:00 PM" },
        fri: { start: "8:00 AM", end: "5:00 PM" },
        sat: null,
        sun: null,
      },
    });
    toast({ variant: "success", title: "Technician added", description: values.name });
    reset();
    setOpen(false);
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button className="gap-1.5">
          <Plus className="size-4" />
          New Technician
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>New Technician</ModalTitle>
          <ModalDescription>Add a technician to the team.</ModalDescription>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ModalBody className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" error={!!errors.name} {...register("name")} />
              {errors.name ? <FieldError>{errors.name.message}</FieldError> : null}
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" placeholder="e.g. HVAC Technician" error={!!errors.role} {...register("role")} />
              {errors.role ? <FieldError>{errors.role.message}</FieldError> : null}
            </div>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <div>
              <Label htmlFor="skills">Skills</Label>
              <Input id="skills" placeholder="e.g. HVAC Systems, Refrigeration" error={!!errors.skills} {...register("skills")} />
              {errors.skills ? <FieldError>{errors.skills.message}</FieldError> : <p className="mt-1 text-[12px] text-text-muted">Comma-separated.</p>}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Add Technician
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
