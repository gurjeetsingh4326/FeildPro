import { DollarSign, ClipboardCheck, Timer, Target, Smile, FileWarning } from "lucide-react";
import { KpiCard } from "@/components/ui/kpi-card";
import { RevenueTrendCard } from "@/components/dashboard/revenue-trend-card";
import { OutstandingInvoicesCard } from "@/components/dashboard/outstanding-invoices-card";
import { WorkOrderStatusChart } from "@/components/reports/work-order-status-chart";
import { ResolutionTimeChart } from "@/components/reports/resolution-time-chart";
import { TechnicianPerformanceTable } from "@/components/reports/technician-performance-table";
import {
  totalRevenue90d,
  workOrdersCompleted,
  outstandingInvoicesTotal,
  FIRST_TIME_FIX_RATE_PCT,
  CSAT_SCORE,
} from "@/lib/dummy-data/reports";
import { formatMoney } from "@/lib/utils";

export function ReportsView() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-[28px]">Reports</h2>
        <p className="mt-0.5 text-sm text-text-secondary">Revenue, work orders, technician performance, and invoicing — last 90 days.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        <KpiCard label="Revenue (90d)" value={`$${formatMoney(totalRevenue90d())}`} icon={DollarSign} />
        <KpiCard label="Work Orders Completed" value={String(workOrdersCompleted())} icon={ClipboardCheck} />
        <KpiCard label="Avg. Resolution" value="3.4h" icon={Timer} delta={{ value: "5.0%", direction: "down" }} />
        <KpiCard label="First-Time Fix Rate" value={`${FIRST_TIME_FIX_RATE_PCT}%`} icon={Target} />
        <KpiCard label="CSAT Score" value={`${CSAT_SCORE.toFixed(1)} / 5`} icon={Smile} />
        <KpiCard label="Outstanding Invoices" value={`$${formatMoney(outstandingInvoicesTotal())}`} icon={FileWarning} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RevenueTrendCard />
        <WorkOrderStatusChart />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TechnicianPerformanceTable />
        </div>
        <ResolutionTimeChart />
      </div>

      <OutstandingInvoicesCard />
    </div>
  );
}
