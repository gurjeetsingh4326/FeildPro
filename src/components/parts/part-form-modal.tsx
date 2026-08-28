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
import { PART_CATEGORIES, type Part, type PartCategory, type PartStatus } from "@/lib/dummy-data/parts";

const formSchema = z.object({
  name: z.string().min(1, "Enter a part name"),
  sku: z.string().min(1, "Enter a SKU"),
  category: z.enum(["HVAC", "Electrical", "Plumbing", "Fire & Safety"]),
  unitPrice: z.coerce.number().positive("Enter a unit price"),
  status: z.enum(["active", "inactive"]),
});

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function defaultsFor(part?: Part) {
  return part
    ? { name: part.name, sku: part.sku, category: part.category, unitPrice: part.unitPrice, status: part.status }
    : { name: "", sku: "", category: "HVAC" as PartCategory, unitPrice: 0, status: "active" as PartStatus };
}

export interface PartFormModalProps {
  part?: Part;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave: (part: Part) => void;
  trigger?: boolean;
}

export function PartFormModal({ part, open, onOpenChange, onSave, trigger = false }: PartFormModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultsFor(part),
  });

  React.useEffect(() => {
    if (isOpen) reset(defaultsFor(part));
  }, [isOpen, part, reset]);

  const onSubmit = handleSubmit(async (values) => {
    await new Promise((r) => setTimeout(r, 400));
    onSave({ id: part?.id ?? `part-${slugify(values.name)}-${Date.now().toString(36)}`, ...values });
    toast({ variant: "success", title: part ? "Part updated" : "Part created", description: values.name });
    setOpen(false);
  });

  return (
    <Modal open={isOpen} onOpenChange={setOpen}>
      {trigger ? (
        <ModalTrigger asChild>
          <Button className="gap-1.5">
            <Plus className="size-4" />
            New Part
          </Button>
        </ModalTrigger>
      ) : null}
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>{part ? "Edit Part" : "New Part"}</ModalTitle>
          <ModalDescription>{part ? "Update this catalog entry." : "Add a part to the catalog."}</ModalDescription>
        </ModalHeader>
        <form onSubmit={onSubmit} noValidate>
          <ModalBody className="space-y-4">
            <div>
              <Label htmlFor="part-name">Part name</Label>
              <Input id="part-name" error={!!errors.name} {...register("name")} />
              {errors.name ? <FieldError>{errors.name.message}</FieldError> : null}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="part-sku">SKU</Label>
                <Input id="part-sku" error={!!errors.sku} {...register("sku")} />
                {errors.sku ? <FieldError>{errors.sku.message}</FieldError> : null}
              </div>
              <div>
                <Label htmlFor="part-category">Category</Label>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={(v) => field.onChange(v as PartCategory)}>
                      <SelectTrigger id="part-category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PART_CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="part-price">Unit price ($)</Label>
                <Input id="part-price" type="number" step="0.01" error={!!errors.unitPrice} {...register("unitPrice")} />
                {errors.unitPrice ? <FieldError>{errors.unitPrice.message}</FieldError> : null}
              </div>
              <div>
                <Label htmlFor="part-status">Status</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={(v) => field.onChange(v as PartStatus)}>
                      <SelectTrigger id="part-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {part ? "Save Changes" : "Create Part"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
