import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Customer } from "@/lib/dummy-data/customers";

export function CustomerDetailHeader({ customer }: { customer: Customer }) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-4">
      <Link
        href="/customers"
        className="inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="size-3.5" />
        Customers
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">{customer.name}</h1>
            <Badge variant={customer.status === "active" ? "success" : "neutral"} dot>
              {customer.status === "active" ? "Active" : "Inactive"}
            </Badge>
          </div>
          <p className="mt-1 text-sm capitalize text-text-secondary">{customer.type} customer</p>
        </div>

        <Button asChild className="w-fit">
          <Link href="/work-orders">New Work Order</Link>
        </Button>
      </div>
    </div>
  );
}
