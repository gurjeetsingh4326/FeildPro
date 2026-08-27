"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2, Star, Mail, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import type { CustomerContact } from "@/lib/dummy-data/customers";

const contactSchema = z.object({
  name: z.string().min(1, "Enter a name"),
  role: z.string().min(1, "Enter a role"),
  phone: z.string().min(1, "Enter a phone number"),
  email: z.string().email("Enter a valid email"),
});
type ContactValues = z.infer<typeof contactSchema>;

function AddContactModal({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (contact: CustomerContact) => void;
}) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", role: "", phone: "", email: "" },
  });

  const onSubmit = (values: ContactValues) => {
    onAdd({ id: `con-${Date.now()}`, ...values, primary: false });
    reset();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Add Contact</ModalTitle>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ModalBody className="space-y-4">
            <div>
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" error={!!errors.name} {...register("name")} />
              {errors.name ? <FieldError>{errors.name.message}</FieldError> : null}
            </div>
            <div>
              <Label htmlFor="contact-role">Role</Label>
              <Input id="contact-role" placeholder="e.g. Office Manager" error={!!errors.role} {...register("role")} />
              {errors.role ? <FieldError>{errors.role.message}</FieldError> : null}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact-phone">Phone</Label>
                <Input id="contact-phone" type="tel" error={!!errors.phone} {...register("phone")} />
                {errors.phone ? <FieldError>{errors.phone.message}</FieldError> : null}
              </div>
              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input id="contact-email" type="email" error={!!errors.email} {...register("email")} />
                {errors.email ? <FieldError>{errors.email.message}</FieldError> : null}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Contact</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export function CustomerContactsTab({
  contacts,
  onAddContact,
  onRemoveContact,
}: {
  contacts: CustomerContact[];
  onAddContact: (contact: CustomerContact) => void;
  onRemoveContact: (id: string) => void;
}) {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Contacts</h3>
        <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => setModalOpen(true)}>
          <Plus className="size-3.5" /> Add Contact
        </Button>
      </div>
      <div className="space-y-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-start justify-between gap-3 rounded-md border border-border p-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium text-text-primary">{contact.name}</p>
                {contact.primary ? <Star className="size-3.5 fill-warning text-warning" /> : null}
              </div>
              <p className="text-[13px] text-text-muted">{contact.role}</p>
              <div className="mt-1.5 space-y-1 text-[13px] text-text-secondary">
                <p className="flex items-center gap-1.5">
                  <Phone className="size-3.5 shrink-0 text-text-muted" />
                  {contact.phone}
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="size-3.5 shrink-0 text-text-muted" />
                  {contact.email}
                </p>
              </div>
            </div>
            {!contact.primary ? (
              <button
                type="button"
                aria-label="Remove contact"
                onClick={() => onRemoveContact(contact.id)}
                className="shrink-0 text-text-muted hover:text-error"
              >
                <Trash2 className="size-4" />
              </button>
            ) : null}
          </div>
        ))}
      </div>
      <AddContactModal open={modalOpen} onOpenChange={setModalOpen} onAdd={onAddContact} />
    </Card>
  );
}
