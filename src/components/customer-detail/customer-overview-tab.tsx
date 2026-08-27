import { Calendar, Briefcase, StickyNote } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Customer } from "@/lib/dummy-data/customers";

function InfoRow({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-chip-bg text-chip-text">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-[13px] text-text-muted">{label}</p>
        <p className="text-sm font-medium text-text-primary capitalize">{value}</p>
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export function CustomerOverviewTab({ customer }: { customer: Customer }) {
  return (
    <div className="space-y-4">
      <Card className="grid gap-4 sm:grid-cols-2">
        <InfoRow icon={Briefcase} label="Type" value={customer.type} />
        <InfoRow icon={Calendar} label="Customer since" value={formatDate(customer.customerSince)} />
      </Card>
      {customer.notes ? (
        <Card>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-text-primary">
            <StickyNote className="size-4 text-text-muted" />
            Notes
          </h3>
          <p className="text-sm leading-relaxed text-text-secondary">{customer.notes}</p>
        </Card>
      ) : null}
    </div>
  );
}
