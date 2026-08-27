import Link from "next/link";
import { Phone, Mail, MapPin, UserPlus } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getCustomerByName } from "@/lib/dummy-data/customers";
import type { CustomerContact } from "@/lib/dummy-data/work-order-detail";
import type { WorkOrder } from "@/lib/dummy-data/work-orders";

export interface WoRightRailProps {
  workOrder: WorkOrder;
  customer: CustomerContact;
  createdDate: string;
  source: string;
  onOpenAssign: () => void;
}

export function WoRightRail({ workOrder, customer, createdDate, source, onOpenAssign }: WoRightRailProps) {
  const customerId = getCustomerByName(customer.name)?.id;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Customer</CardTitle>
          <Link
            href={customerId ? `/customers/${customerId}` : "/customers"}
            className="text-[13px] font-medium text-primary-text hover:underline"
          >
            View profile
          </Link>
        </CardHeader>
        <p className="text-sm font-semibold text-text-primary">{customer.name}</p>
        <div className="mt-3 space-y-2 text-[13px] text-text-secondary">
          <p className="flex items-center gap-2">
            <Phone className="size-3.5 shrink-0 text-text-muted" />
            {customer.phone}
          </p>
          <p className="flex items-center gap-2">
            <Mail className="size-3.5 shrink-0 text-text-muted" />
            {customer.email}
          </p>
          <p className="flex items-start gap-2">
            <MapPin className="size-3.5 shrink-0 text-text-muted mt-0.5" />
            {customer.address}
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border pt-3 text-center">
          <div>
            <p className="text-lg font-bold text-text-primary">{customer.openWorkOrders}</p>
            <p className="text-[12px] text-text-muted">Open work orders</p>
          </div>
          <div>
            <p className="text-lg font-bold text-text-primary">${customer.totalSpend.toLocaleString()}</p>
            <p className="text-[12px] text-text-muted">Total spend</p>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technician</CardTitle>
        </CardHeader>
        {workOrder.technicianName ? (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <Avatar name={workOrder.technicianName} />
              <span className="text-sm font-medium text-text-primary">{workOrder.technicianName}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onOpenAssign}>
              Reassign
            </Button>
          </div>
        ) : (
          <Button variant="secondary" size="sm" className="w-full gap-1.5" onClick={onOpenAssign}>
            <UserPlus className="size-3.5" />
            Assign a technician
          </Button>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Facts</CardTitle>
        </CardHeader>
        <dl className="space-y-2 text-[13px]">
          <div className="flex justify-between gap-2">
            <dt className="text-text-muted">Created</dt>
            <dd className="text-text-primary">{createdDate}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-text-muted">Source</dt>
            <dd className="text-text-primary">{source}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-text-muted">Priority</dt>
            <dd className="capitalize text-text-primary">{workOrder.priority}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
