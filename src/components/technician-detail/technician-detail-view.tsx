import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TechnicianDetailHeader } from "@/components/technician-detail/technician-detail-header";
import { TechnicianOverviewTab } from "@/components/technician-detail/technician-overview-tab";
import { TechnicianAvailabilityTab } from "@/components/technician-detail/technician-availability-tab";
import { TechnicianPerformanceTab } from "@/components/technician-detail/technician-performance-tab";
import { TechnicianRightRail } from "@/components/technician-detail/technician-right-rail";
import { getTechnicianStats, getTechnicianJobs, type TechnicianProfile } from "@/lib/dummy-data/technicians";

export function TechnicianDetailView({ technician }: { technician: TechnicianProfile }) {
  const stats = getTechnicianStats(technician.id, technician.name);
  const recentJobs = getTechnicianJobs(technician.name);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <TechnicianDetailHeader technician={technician} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <TechnicianOverviewTab technician={technician} />
            </TabsContent>
            <TabsContent value="availability">
              <TechnicianAvailabilityTab technician={technician} />
            </TabsContent>
            <TabsContent value="performance">
              <TechnicianPerformanceTab stats={stats} recentJobs={recentJobs} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="xl:col-span-1">
          <TechnicianRightRail technician={technician} stats={stats} />
        </div>
      </div>
    </div>
  );
}
