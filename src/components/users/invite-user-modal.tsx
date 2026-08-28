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
import { ROLES, ROLE_META, type Role } from "@/lib/roles";
import type { AppUser } from "@/lib/dummy-data/users";

const formSchema = z.object({
  name: z.string().min(1, "Enter a name"),
  email: z.string().email("Enter a valid email"),
  role: z.enum(["admin", "dispatcher", "technician", "accountant"]),
});

type FormValues = z.infer<typeof formSchema>;

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export interface InviteUserModalProps {
  onCreate: (user: AppUser) => void;
}

export function InviteUserModal({ onCreate }: InviteUserModalProps) {
  const [open, setOpen] = React.useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", role: "technician" as Role },
  });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 400));
    const id = `user-${slugify(values.name)}-${Date.now().toString(36)}`;
    onCreate({ id, name: values.name, email: values.email, role: values.role, status: "invited", lastActive: "Never" });
    toast({ variant: "success", title: "Invitation sent", description: `${values.email} invited as ${ROLE_META[values.role].label}` });
    reset();
    setOpen(false);
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button className="gap-1.5">
          <Plus className="size-4" />
          Invite User
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Invite User</ModalTitle>
          <ModalDescription>Send an invitation to join FieldPro.</ModalDescription>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ModalBody className="space-y-4">
            <div>
              <Label htmlFor="user-name">Name</Label>
              <Input id="user-name" error={!!errors.name} {...register("name")} />
              {errors.name ? <FieldError>{errors.name.message}</FieldError> : null}
            </div>
            <div>
              <Label htmlFor="user-email">Email</Label>
              <Input id="user-email" type="email" error={!!errors.email} {...register("email")} />
              {errors.email ? <FieldError>{errors.email.message}</FieldError> : null}
            </div>
            <div>
              <Label htmlFor="user-role">Role</Label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={(v) => field.onChange(v as Role)}>
                    <SelectTrigger id="user-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {ROLE_META[role].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Send Invitation
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
