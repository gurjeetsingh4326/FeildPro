import Link from "next/link";
import { LogOut, Mail, Phone, Briefcase } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROLE_META } from "@/lib/roles";
import type { TechnicianStats } from "@/lib/dummy-data/technician";

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex-1 rounded-lg border border-border bg-surface p-3 text-center">
      <p className="text-lg font-bold tabular-nums text-text-primary">{value}</p>
      <p className="text-[11px] leading-tight text-text-muted">{label}</p>
    </div>
  );
}

export function ProfileView({
  name,
  email,
  phone,
  stats,
}: {
  name: string;
  email: string;
  phone: string;
  stats: TechnicianStats;
}) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col items-center gap-2 py-4 text-center">
        <Avatar name={name} size="lg" className="size-16 text-lg" />
        <div>
          <p className="text-lg font-bold text-text-primary">{name}</p>
          <p className="text-[13px] text-text-muted">{ROLE_META.technician.label}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <StatTile label="Jobs today" value={stats.jobsToday} />
        <StatTile label="Done this wk" value={stats.completedThisWeek} />
        <StatTile label="Avg. job" value={`${stats.avgJobDurationHours}h`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <div className="space-y-2.5 text-[13px] text-text-secondary">
          <p className="flex items-center gap-2">
            <Mail className="size-3.5 shrink-0 text-text-muted" />
            {email}
          </p>
          <p className="flex items-center gap-2">
            <Phone className="size-3.5 shrink-0 text-text-muted" />
            {phone}
          </p>
          <p className="flex items-center gap-2">
            <Briefcase className="size-3.5 shrink-0 text-text-muted" />
            {ROLE_META.technician.description}
          </p>
        </div>
      </Card>

      <Button asChild variant="secondary" className="mt-2 gap-1.5">
        <Link href="/login">
          <LogOut className="size-4" />
          Sign out
        </Link>
      </Button>
    </div>
  );
}
