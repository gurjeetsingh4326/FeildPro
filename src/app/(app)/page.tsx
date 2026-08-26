import { ClipboardList, Calendar, DollarSign, Wrench, Plus } from "lucide-react";
import { KpiCard } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { RevenueTrendCard } from "@/components/dashboard/revenue-trend-card";
import { TodayScheduleCard } from "@/components/dashboard/today-schedule-card";
import { UnassignedWorkOrdersCard } from "@/components/dashboard/unassigned-work-orders-card";
import { TechnicianUtilizationCard } from "@/components/dashboard/technician-utilization-card";
import { RecentActivityCard } from "@/components/dashboard/recent-activity-card";
import { OutstandingInvoicesCard } from "@/components/dashboard/outstanding-invoices-card";

const TODAY = new Date("2026-08-26T09:00:00");
const FORMATTED_DATE = TODAY.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-[28px]">
            Good morning, Priya
          </h2>
          <p className="mt-0.5 text-sm text-text-secondary">{FORMATTED_DATE}</p>
        </div>
        <Button className="gap-1.5 sm:w-auto">
          <Plus className="size-4" />
          New Work Order
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RevenueTrendCard />
        <TodayScheduleCard />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <UnassignedWorkOrdersCard />
        <TechnicianUtilizationCard />
        <RecentActivityCard />
      </div>

      <OutstandingInvoicesCard />
    </div>
  );
}
