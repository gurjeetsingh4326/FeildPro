import { Phone, Mail, MapPin } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Customer, CustomerStats } from "@/lib/dummy-data/customers";
import { getPrimaryAddress, getPrimaryContact } from "@/lib/dummy-data/customers";
import { formatMoney } from "@/lib/utils";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export function CustomerRightRail({ customer, stats }: { customer: Customer; stats: CustomerStats }) {
  const contact = getPrimaryContact(customer);
  const address = getPrimaryAddress(customer);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Quick Facts</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <p className="text-lg font-bold text-text-primary">{stats.openWorkOrders}</p>
            <p className="text-[12px] text-text-muted">Open work orders</p>
          </div>
          <div>
            <p className="text-lg font-bold text-text-primary">${formatMoney(stats.totalSpend)}</p>
            <p className="text-[12px] text-text-muted">Total spend</p>
          </div>
          <div>
            <p className="text-lg font-bold text-text-primary">{stats.totalJobs}</p>
            <p className="text-[12px] text-text-muted">Total jobs</p>
          </div>
          <div>
            <p className="text-lg font-bold text-text-primary">
              {stats.lastServiceDate ? formatDate(stats.lastServiceDate) : "—"}
            </p>
            <p className="text-[12px] text-text-muted">Last service</p>
          </div>
        </div>
      </Card>

      {contact ? (
        <Card>
          <CardHeader>
            <CardTitle>Primary Contact</CardTitle>
          </CardHeader>
          <p className="text-sm font-semibold text-text-primary">{contact.name}</p>
          <p className="text-[13px] text-text-muted">{contact.role}</p>
          <div className="mt-3 space-y-2 text-[13px] text-text-secondary">
            <p className="flex items-center gap-2">
              <Phone className="size-3.5 shrink-0 text-text-muted" />
              {contact.phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="size-3.5 shrink-0 text-text-muted" />
              {contact.email}
            </p>
          </div>
        </Card>
      ) : null}

      {address ? (
        <Card>
          <CardHeader>
            <CardTitle>Primary Address</CardTitle>
          </CardHeader>
          <p className="flex items-start gap-2 text-[13px] text-text-secondary">
            <MapPin className="mt-0.5 size-3.5 shrink-0 text-text-muted" />
            {address.address}
          </p>
        </Card>
      ) : null}
    </div>
  );
}
