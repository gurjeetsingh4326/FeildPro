import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { TECHNICIAN_STATUS_META, type TechnicianProfile } from "@/lib/dummy-data/technicians";

export function TechnicianDetailHeader({ technician }: { technician: TechnicianProfile }) {
  const meta = TECHNICIAN_STATUS_META[technician.status];

  return (
    <div className="flex flex-col gap-4 border-b border-border pb-4">
      <Link
        href="/technicians"
        className="inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="size-3.5" />
        Technicians
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={technician.name} size="lg" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-text-primary">{technician.name}</h1>
              <Badge variant={meta.badge} dot>
                {meta.label}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-text-secondary">{technician.role}</p>
          </div>
        </div>

        <Button asChild className="w-fit">
          <Link href="/schedule">View Schedule</Link>
        </Button>
      </div>
    </div>
  );
}
