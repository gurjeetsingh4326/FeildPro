import { Calendar, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TechnicianProfile } from "@/lib/dummy-data/technicians";

function InfoRow({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-chip-bg text-chip-text">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-[13px] text-text-muted">{label}</p>
        <p className="text-sm font-medium text-text-primary">{value}</p>
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export function TechnicianOverviewTab({ technician }: { technician: TechnicianProfile }) {
  return (
    <div className="space-y-4">
      <Card className="grid gap-4 sm:grid-cols-2">
        <InfoRow icon={Briefcase} label="Role" value={technician.role} />
        <InfoRow icon={Calendar} label="Hired" value={formatDate(technician.hireDate)} />
      </Card>
      <Card>
        <h3 className="mb-3 text-sm font-semibold text-text-primary">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {technician.skills.map((skill) => (
            <Badge key={skill} variant="primary">
              {skill}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
