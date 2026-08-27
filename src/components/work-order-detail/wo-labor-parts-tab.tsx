"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { TECHNICIANS } from "@/lib/dummy-data/schedule";
import type { LaborLine, PartLine } from "@/lib/dummy-data/work-order-detail";

export function formatMoney(value: number) {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const laborSchema = z.object({
  technicianName: z.string().min(1, "Select a technician"),
  description: z.string().min(1, "Enter a description"),
  hours: z.coerce.number().positive("Enter hours worked"),
  rate: z.coerce.number().positive("Enter an hourly rate"),
});
type LaborValues = z.infer<typeof laborSchema>;

const partSchema = z.object({
  partName: z.string().min(1, "Enter a part name"),
  sku: z.string().min(1, "Enter a SKU"),
  quantity: z.coerce.number().int().positive("Enter a quantity"),
  unitPrice: z.coerce.number().positive("Enter a unit price"),
});
type PartValues = z.infer<typeof partSchema>;

export function AddLaborModal({ open, onOpenChange, onAdd }: { open: boolean; onOpenChange: (v: boolean) => void; onAdd: (line: LaborLine) => void }) {
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(laborSchema),
    defaultValues: { technicianName: TECHNICIANS[0].name, description: "", hours: 1, rate: 95 },
  });

  const onSubmit = (values: LaborValues) => {
    onAdd({ id: `lab-${Date.now()}`, ...values });
    reset();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Add Labor</ModalTitle>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ModalBody className="space-y-4">
            <div>
              <Label htmlFor="lab-technician">Technician</Label>
              <Controller
                control={control}
                name="technicianName"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="lab-technician">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
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
            <div>
              <Label htmlFor="lab-description">Description</Label>
              <Input id="lab-description" error={!!errors.description} {...register("description")} />
              {errors.description ? <FieldError>{errors.description.message}</FieldError> : null}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lab-hours">Hours</Label>
                <Input id="lab-hours" type="number" step="0.5" error={!!errors.hours} {...register("hours")} />
                {errors.hours ? <FieldError>{errors.hours.message}</FieldError> : null}
              </div>
              <div>
                <Label htmlFor="lab-rate">Rate ($/hr)</Label>
                <Input id="lab-rate" type="number" step="1" error={!!errors.rate} {...register("rate")} />
                {errors.rate ? <FieldError>{errors.rate.message}</FieldError> : null}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Labor</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export function AddPartModal({ open, onOpenChange, onAdd }: { open: boolean; onOpenChange: (v: boolean) => void; onAdd: (line: PartLine) => void }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(partSchema),
    defaultValues: { partName: "", sku: "", quantity: 1, unitPrice: 0 },
  });

  const onSubmit = (values: PartValues) => {
    onAdd({ id: `part-${Date.now()}`, ...values });
    reset();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Add Part</ModalTitle>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ModalBody className="space-y-4">
            <div>
              <Label htmlFor="part-name">Part name</Label>
              <Input id="part-name" error={!!errors.partName} {...register("partName")} />
              {errors.partName ? <FieldError>{errors.partName.message}</FieldError> : null}
            </div>
            <div>
              <Label htmlFor="part-sku">SKU</Label>
              <Input id="part-sku" error={!!errors.sku} {...register("sku")} />
              {errors.sku ? <FieldError>{errors.sku.message}</FieldError> : null}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="part-qty">Quantity</Label>
                <Input id="part-qty" type="number" step="1" error={!!errors.quantity} {...register("quantity")} />
                {errors.quantity ? <FieldError>{errors.quantity.message}</FieldError> : null}
              </div>
              <div>
                <Label htmlFor="part-price">Unit price ($)</Label>
                <Input id="part-price" type="number" step="0.01" error={!!errors.unitPrice} {...register("unitPrice")} />
                {errors.unitPrice ? <FieldError>{errors.unitPrice.message}</FieldError> : null}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Part</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export interface WoLaborPartsTabProps {
  labor: LaborLine[];
  parts: PartLine[];
  onAddLabor: (line: LaborLine) => void;
  onRemoveLabor: (id: string) => void;
  onAddPart: (line: PartLine) => void;
  onRemovePart: (id: string) => void;
}

export function WoLaborPartsTab({ labor, parts, onAddLabor, onRemoveLabor, onAddPart, onRemovePart }: WoLaborPartsTabProps) {
  const [laborModalOpen, setLaborModalOpen] = React.useState(false);
  const [partModalOpen, setPartModalOpen] = React.useState(false);

  const laborTotal = labor.reduce((sum, l) => sum + l.hours * l.rate, 0);
  const partsTotal = parts.reduce((sum, p) => sum + p.quantity * p.unitPrice, 0);

  return (
    <div className="space-y-4">
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-primary">Labor</h3>
          <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => setLaborModalOpen(true)}>
            <Plus className="size-3.5" /> Add Labor
          </Button>
        </div>
        {labor.length === 0 ? (
          <p className="py-4 text-center text-[13px] text-text-muted">No labor logged yet.</p>
        ) : (
          <div className="scrollbar-thin overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  <th className="py-2 pr-3">Technician</th>
                  <th className="py-2 pr-3">Description</th>
                  <th className="py-2 pr-3 text-right">Hours</th>
                  <th className="py-2 pr-3 text-right">Rate</th>
                  <th className="py-2 pr-3 text-right">Subtotal</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {labor.map((line) => (
                  <tr key={line.id} className="border-b border-border last:border-0">
                    <td className="py-2 pr-3 text-text-primary">{line.technicianName}</td>
                    <td className="py-2 pr-3 text-text-secondary">{line.description}</td>
                    <td className="py-2 pr-3 text-right tabular-nums text-text-secondary">{line.hours}</td>
                    <td className="py-2 pr-3 text-right tabular-nums text-text-secondary">${line.rate}/hr</td>
                    <td className="py-2 pr-3 text-right tabular-nums font-medium text-text-primary">
                      ${formatMoney(line.hours * line.rate)}
                    </td>
                    <td className="py-2 text-right">
                      <button
                        type="button"
                        onClick={() => onRemoveLabor(line.id)}
                        aria-label="Remove labor line"
                        className="text-text-muted hover:text-error"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {labor.length > 0 ? (
          <div className="mt-3 flex justify-end border-t border-border pt-3 text-sm">
            <span className="text-text-secondary">Labor subtotal:&nbsp;</span>
            <span className="tabular-nums font-semibold text-text-primary">${formatMoney(laborTotal)}</span>
          </div>
        ) : null}
      </Card>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-primary">Parts</h3>
          <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => setPartModalOpen(true)}>
            <Plus className="size-3.5" /> Add Part
          </Button>
        </div>
        {parts.length === 0 ? (
          <p className="py-4 text-center text-[13px] text-text-muted">No parts used yet.</p>
        ) : (
          <div className="scrollbar-thin overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  <th className="py-2 pr-3">Part</th>
                  <th className="py-2 pr-3">SKU</th>
                  <th className="py-2 pr-3 text-right">Qty</th>
                  <th className="py-2 pr-3 text-right">Unit price</th>
                  <th className="py-2 pr-3 text-right">Subtotal</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {parts.map((line) => (
                  <tr key={line.id} className="border-b border-border last:border-0">
                    <td className="py-2 pr-3 text-text-primary">{line.partName}</td>
                    <td className="py-2 pr-3 font-mono text-[13px] text-text-muted">{line.sku}</td>
                    <td className="py-2 pr-3 text-right tabular-nums text-text-secondary">{line.quantity}</td>
                    <td className="py-2 pr-3 text-right tabular-nums text-text-secondary">${line.unitPrice}</td>
                    <td className="py-2 pr-3 text-right tabular-nums font-medium text-text-primary">
                      ${formatMoney(line.quantity * line.unitPrice)}
                    </td>
                    <td className="py-2 text-right">
                      <button
                        type="button"
                        onClick={() => onRemovePart(line.id)}
                        aria-label="Remove part line"
                        className="text-text-muted hover:text-error"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {parts.length > 0 ? (
          <div className="mt-3 flex justify-end border-t border-border pt-3 text-sm">
            <span className="text-text-secondary">Parts subtotal:&nbsp;</span>
            <span className="tabular-nums font-semibold text-text-primary">${formatMoney(partsTotal)}</span>
          </div>
        ) : null}
      </Card>

      {labor.length > 0 || parts.length > 0 ? (
        <Card className="flex items-center justify-between bg-surface-sunken">
          <span className="text-sm font-semibold text-text-primary">Total</span>
          <span className="tabular-nums text-lg font-bold text-text-primary">
            ${formatMoney(laborTotal + partsTotal)}
          </span>
        </Card>
      ) : null}

      <AddLaborModal open={laborModalOpen} onOpenChange={setLaborModalOpen} onAdd={onAddLabor} />
      <AddPartModal open={partModalOpen} onOpenChange={setPartModalOpen} onAdd={onAddPart} />
    </div>
  );
}
