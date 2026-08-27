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
import { SERVICE_CATEGORIES, type Service, type ServiceCategory, type ServiceStatus } from "@/lib/dummy-data/services";

const formSchema = z.object({
  name: z.string().min(1, "Enter a service name"),
  category: z.enum(["HVAC", "Electrical", "Plumbing", "Refrigeration", "Fire & Safety", "General"]),
  description: z.string().min(1, "Enter a description"),
  estimatedHours: z.coerce.number().positive("Enter estimated hours"),
  basePrice: z.coerce.number().nonnegative("Enter a base price"),
  status: z.enum(["active", "inactive"]),
});

type FormValues = z.infer<typeof formSchema>;

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function defaultsFor(service?: Service): FormValues {
  return service
    ? {
        name: service.name,
        category: service.category,
        description: service.description,
        estimatedHours: service.estimatedHours,
        basePrice: service.basePrice,
        status: service.status,
      }
    : { name: "", category: "HVAC", description: "", estimatedHours: 1, basePrice: 0, status: "active" };
}

export interface ServiceFormModalProps {
  service?: Service;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave: (service: Service) => void;
  trigger?: boolean;
}

export function ServiceFormModal({ service, open, onOpenChange, onSave, trigger = false }: ServiceFormModalProps) {
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
    defaultValues: defaultsFor(service),
  });

  React.useEffect(() => {
    if (isOpen) reset(defaultsFor(service));
  }, [isOpen, service, reset]);

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 400));
    onSave({
      id: service?.id ?? `svc-${slugify(values.name)}-${Date.now().toString(36)}`,
      ...values,
    });
    toast({
      variant: "success",
      title: service ? "Service updated" : "Service created",
      description: values.name,
    });
    setOpen(false);
  };

  return (
    <Modal open={isOpen} onOpenChange={setOpen}>
      {trigger ? (
        <ModalTrigger asChild>
          <Button className="gap-1.5">
            <Plus className="size-4" />
            New Service
          </Button>
        </ModalTrigger>
      ) : null}
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{service ? "Edit Service" : "New Service"}</ModalTitle>
          <ModalDescription>
            {service ? "Update this catalog entry." : "Add a service to the catalog."}
          </ModalDescription>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ModalBody className="space-y-4">
            <div>
              <Label htmlFor="svc-name">Service name</Label>
              <Input id="svc-name" error={!!errors.name} {...register("name")} />
              {errors.name ? <FieldError>{errors.name.message}</FieldError> : null}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="svc-category">Category</Label>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={(v) => field.onChange(v as ServiceCategory)}>
                      <SelectTrigger id="svc-category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICE_CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="svc-status">Status</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={(v) => field.onChange(v as ServiceStatus)}>
                      <SelectTrigger id="svc-status">
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
            <div>
              <Label htmlFor="svc-description">Description</Label>
              <Input id="svc-description" error={!!errors.description} {...register("description")} />
              {errors.description ? <FieldError>{errors.description.message}</FieldError> : null}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="svc-hours">Est. hours</Label>
                <Input id="svc-hours" type="number" step="0.5" error={!!errors.estimatedHours} {...register("estimatedHours")} />
                {errors.estimatedHours ? <FieldError>{errors.estimatedHours.message}</FieldError> : null}
              </div>
              <div>
                <Label htmlFor="svc-price">Base price ($)</Label>
                <Input id="svc-price" type="number" step="1" error={!!errors.basePrice} {...register("basePrice")} />
                {errors.basePrice ? <FieldError>{errors.basePrice.message}</FieldError> : null}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {service ? "Save Changes" : "Create Service"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
