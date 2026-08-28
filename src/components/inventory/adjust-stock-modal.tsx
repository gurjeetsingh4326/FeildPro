"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Modal,
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
import { getPart, WAREHOUSES, type InventoryLevel, type InventoryTransaction, type TransactionType } from "@/lib/dummy-data/parts";

const formSchema = z.object({
  type: z.enum(["received", "used", "adjusted", "transferred"]),
  quantity: z.coerce.number().int().refine((v) => v !== 0, "Enter a non-zero quantity"),
  note: z.string().min(1, "Enter a note"),
});

type FormValues = z.infer<typeof formSchema>;

export interface AdjustStockModalProps {
  level: InventoryLevel | null;
  onOpenChange: (open: boolean) => void;
  onAdjust: (transaction: InventoryTransaction) => void;
}

export function AdjustStockModal({ level, onOpenChange, onAdjust }: AdjustStockModalProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { type: "received" as TransactionType, quantity: 1, note: "" },
  });

  if (!level) return null;

  const part = getPart(level.partId);
  const warehouse = WAREHOUSES.find((w) => w.id === level.warehouseId);

  const onSubmit = handleSubmit(async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 400));
    onAdjust({
      id: `txn-${Date.now()}`,
      partId: level.partId,
      warehouseId: level.warehouseId,
      type: values.type,
      quantity: values.quantity,
      timestamp: "Just now",
      note: values.note,
    });
    toast({
      variant: "success",
      title: "Stock adjusted",
      description: `${part?.name} at ${warehouse?.name}`,
    });
    reset();
    onOpenChange(false);
  });

  return (
    <Modal open onOpenChange={onOpenChange}>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Adjust Stock</ModalTitle>
          <ModalDescription>
            {part?.name} · {warehouse?.name} · {level.quantityOnHand} on hand
          </ModalDescription>
        </ModalHeader>
        <form onSubmit={onSubmit} noValidate>
          <ModalBody className="space-y-4">
            <div>
              <Label htmlFor="adj-type">Type</Label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={(v) => field.onChange(v as TransactionType)}>
                    <SelectTrigger id="adj-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="received">Received</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                      <SelectItem value="adjusted">Adjusted</SelectItem>
                      <SelectItem value="transferred">Transferred</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <Label htmlFor="adj-quantity">Quantity change</Label>
              <Input id="adj-quantity" type="number" step="1" error={!!errors.quantity} {...register("quantity")} />
              {errors.quantity ? (
                <FieldError>{errors.quantity.message}</FieldError>
              ) : (
                <p className="mt-1 text-[12px] text-text-muted">Positive to add stock, negative to remove.</p>
              )}
            </div>
            <div>
              <Label htmlFor="adj-note">Note</Label>
              <Input id="adj-note" placeholder="e.g. WO-2024-00318 — Acme Facilities Inc." error={!!errors.note} {...register("note")} />
              {errors.note ? <FieldError>{errors.note.message}</FieldError> : null}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
