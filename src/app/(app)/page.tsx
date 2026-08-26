import { ClipboardList, Calendar, DollarSign, Wrench } from "lucide-react";
import { KpiCard } from "@/components/ui/kpi-card";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutDashboard } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Open Work Orders"
          value="42"
          icon={ClipboardList}
          delta={{ value: "8.2%", direction: "up" }}
        />
        <KpiCard
          label="Scheduled Today"
          value="16"
          icon={Calendar}
          delta={{ value: "2.1%", direction: "down", positiveIsGood: false }}
        />
        <KpiCard
          label="Revenue (MTD)"
          value="$128,432"
          icon={DollarSign}
          delta={{ value: "12.4%", direction: "up" }}
        />
        <KpiCard
          label="Avg. Resolution"
          value="3.4h"
          icon={Wrench}
          delta={{ value: "5.0%", direction: "down" }}
        />
      </div>

      <div className="px-6 pb-6">
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>More on the way</CardTitle>
          </CardHeader>
          <CardDescription>
            Revenue trend, today&apos;s schedule, unassigned work orders, technician
            utilization, and outstanding invoices land here in Phase 2 — see
            docs/DASHBOARD_DESIGN.md for the full composition.
          </CardDescription>
        </Card>
      </div>

      <PlaceholderPage
        icon={LayoutDashboard}
        title="Full dashboard coming in Phase 2"
        description="This shell proves the app frame, tokens, and primitives compose correctly. The hero-quality dashboard (charts, schedule, activity feed) is next."
      />
    </div>
  );
}
