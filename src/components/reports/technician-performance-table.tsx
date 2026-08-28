import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { technicianPerformance } from "@/lib/dummy-data/reports";
import { formatMoney } from "@/lib/utils";

export function TechnicianPerformanceTable() {
  const rows = technicianPerformance();

  return (
    <Card className="p-0">
      <CardHeader className="px-5 pt-5">
        <CardTitle>Technician Performance</CardTitle>
        <Link href="/technicians" className="text-[13px] font-medium text-primary-text hover:underline">
          View all
        </Link>
      </CardHeader>
      <div className="scrollbar-thin overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Technician</TableHead>
              <TableHead className="text-right">Jobs Completed</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead>Utilization</TableHead>
              <TableHead className="text-right">On-Time</TableHead>
              <TableHead className="text-right">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Link href={`/technicians/${row.id}`} className="font-medium text-primary-text hover:underline">
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell className="text-right tabular-nums text-text-secondary">{row.jobsCompleted}</TableCell>
                <TableCell className="text-right tabular-nums font-medium">${formatMoney(row.revenue)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={row.utilizationPct} tone="auto" className="w-20" />
                    <span className="w-9 shrink-0 tabular-nums text-[13px] text-text-muted">{row.utilizationPct}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right tabular-nums text-text-secondary">{row.onTimeRatePct}%</TableCell>
                <TableCell className="text-right tabular-nums font-medium">{row.rating.toFixed(1)} ★</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
