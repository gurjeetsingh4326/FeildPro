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
import { TECHNICIANS } from "@/lib/dummy-data/schedule";
import { CUSTOMERS } from "@/lib/dummy-data/customers";
import { SERVICES } from "@/lib/dummy-data/services";
import type { WorkOrder } from "@/lib/dummy-data/work-orders";
import type { WorkOrderPriority } from "@/lib/types";

const ACTIVE_SERVICES = SERVICES.filter((s) => s.status === "active");

const formSchema = z.object({
  customerName: z.string().min(1, "Select a customer"),
  service: z.string().min(1, "Select a service"),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  technicianName: z.string(),
  scheduledDate: z.string().min(1, "Pick a date"),
  scheduledTime: z.string().min(1, "Pick a time"),
});

type FormValues = z.infer<typeof formSchema>;

export interface NewWorkOrderModalProps {
  onCreate: (wo: WorkOrder) => void;
  nextId: string;
}

export function NewWorkOrderModal({ onCreate, nextId }: NewWorkOrderModalProps) {
  const [open, setOpen] = React.useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      service: "",
      priority: "medium",
      technicianName: "unassigned",
      scheduledDate: "2026-08-27",
      scheduledTime: "9:00 AM",
    },
  });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 400));
    onCreate({
      id: nextId,
      customerName: values.customerName,
      service: values.service,
      priority: values.priority as WorkOrderPriority,
      status: "draft",
      technicianName: values.technicianName === "unassigned" ? null : values.technicianName,
      scheduledDate: values.scheduledDate,
      scheduledTime: values.scheduledTime,
      total: 0,
    });
    toast({ variant: "success", title: "Work order created", description: `${nextId} for ${values.customerName}` });
    reset();
    setOpen(false);
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button className="gap-1.5">
          <Plus className="size-4" />
          New Work Order
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>New Work Order</ModalTitle>
          <ModalDescription>Create a work order for an existing customer.</ModalDescription>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ModalBody className="space-y-4">
            <div>
              <Label htmlFor="customerName">Customer</Label>
              <Controller
                control={control}
                name="customerName"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="customerName" className={errors.customerName ? "border-error" : undefined}>
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
              <Label htmlFor="service">Service</Label>
              <Controller
                control={control}
                name="service"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="service" className={errors.service ? "border-error" : undefined}>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {ACTIVE_SERVICES.map((s) => (
                        <SelectItem key={s.id} value={s.name}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.service ? <FieldError>{errors.service.message}</FieldError> : null}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Controller
                  control={control}
                  name="priority"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="priority">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="technicianName">Technician</Label>
                <Controller
                  control={control}
                  name="technicianName"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="technicianName">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        {TECHNICIANS.map((t) => (
                          <SelectItem key={t.id} value={t.name}>
                            {t.name}
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
                <Label htmlFor="scheduledDate">Date</Label>
                <Input id="scheduledDate" type="date" error={!!errors.scheduledDate} {...register("scheduledDate")} />
                {errors.scheduledDate ? <FieldError>{errors.scheduledDate.message}</FieldError> : null}
              </div>
              <div>
                <Label htmlFor="scheduledTime">Time</Label>
                <Input id="scheduledTime" placeholder="9:00 AM" error={!!errors.scheduledTime} {...register("scheduledTime")} />
                {errors.scheduledTime ? <FieldError>{errors.scheduledTime.message}</FieldError> : null}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Create Work Order
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
