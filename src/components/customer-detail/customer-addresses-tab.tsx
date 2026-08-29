"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2, Star, MapPin } from "lucide-react";
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
import type { CustomerAddress } from "@/lib/dummy-data/customers";

const addressSchema = z.object({
  label: z.string().min(1, "Enter a label"),
  address: z.string().min(1, "Enter an address"),
});
type AddressValues = z.infer<typeof addressSchema>;

function AddAddressModal({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (address: CustomerAddress) => void;
}) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: { label: "", address: "" },
  });

  const onSubmit = (values: AddressValues) => {
    onAdd({ id: `addr-${Date.now()}`, ...values, primary: false });
    reset();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Add Address</ModalTitle>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ModalBody className="space-y-4">
            <div>
              <Label htmlFor="address-label">Label</Label>
              <Input id="address-label" placeholder="e.g. Warehouse" error={!!errors.label} {...register("label")} />
              {errors.label ? <FieldError>{errors.label.message}</FieldError> : null}
            </div>
            <div>
              <Label htmlFor="address-value">Address</Label>
              <Input id="address-value" error={!!errors.address} {...register("address")} />
              {errors.address ? <FieldError>{errors.address.message}</FieldError> : null}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Address</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export function CustomerAddressesTab({
  addresses,
  onAddAddress,
  onRemoveAddress,
}: {
  addresses: CustomerAddress[];
  onAddAddress: (address: CustomerAddress) => void;
  onRemoveAddress: (id: string) => void;
}) {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Addresses</h3>
        <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => setModalOpen(true)}>
          <Plus className="size-3.5" /> Add Address
        </Button>
      </div>
      <div className="space-y-3">
        {addresses.map((address) => (
          <div key={address.id} className="flex items-start justify-between gap-3 rounded-md border border-border p-3">
            <div className="flex min-w-0 items-start gap-2.5">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-chip-bg text-chip-text">
                <MapPin className="size-4" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium text-text-primary">{address.label}</p>
                  {address.primary ? <Star className="size-3.5 fill-warning text-warning" /> : null}
                </div>
                <p className="text-[13px] text-text-secondary">{address.address}</p>
              </div>
            </div>
            {!address.primary ? (
              <button
                type="button"
                aria-label="Remove address"
                onClick={() => onRemoveAddress(address.id)}
                className="shrink-0 rounded-sm text-text-muted hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Trash2 className="size-4" />
              </button>
            ) : null}
          </div>
        ))}
      </div>
      <AddAddressModal open={modalOpen} onOpenChange={setModalOpen} onAdd={onAddAddress} />
    </Card>
  );
}
