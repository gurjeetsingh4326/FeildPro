import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  SortableTableHead,
  type SortDirection,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { TECHNICIAN_STATUS_META, getTechnicianStats, type TechnicianProfile } from "@/lib/dummy-data/technicians";

export type SortColumn = "utilization" | "rating" | null;

export interface TechniciansTableProps {
  technicians: TechnicianProfile[];
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
}

export function TechniciansTable({ technicians, sortColumn, sortDirection, onSort }: TechniciansTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Technician</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Jobs Today</TableHead>
          <SortableTableHead
            direction={sortColumn === "utilization" ? sortDirection : null}
            onSort={() => onSort("utilization")}
          >
            Utilization
          </SortableTableHead>
          <SortableTableHead
            className="text-right"
            direction={sortColumn === "rating" ? sortDirection : null}
            onSort={() => onSort("rating")}
          >
            Rating
          </SortableTableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {technicians.map((tech) => {
          const meta = TECHNICIAN_STATUS_META[tech.status];
          const stats = getTechnicianStats(tech.id, tech.name);
          return (
            <TableRow key={tech.id}>
              <TableCell>
                <Link href={`/technicians/${tech.id}`} className="flex items-center gap-2.5 font-medium text-text-primary hover:text-primary-text">
                  <Avatar name={tech.name} size="sm" />
                  {tech.name}
                </Link>
              </TableCell>
              <TableCell className="text-text-secondary">{tech.role}</TableCell>
              <TableCell>
                <Badge variant={meta.badge} dot>
                  {meta.label}
                </Badge>
              </TableCell>
              <TableCell className="tabular-nums text-text-secondary">{stats.jobsToday}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={stats.utilizationPct} tone="auto" className="w-24" />
                  <span className="w-9 shrink-0 tabular-nums text-[13px] text-text-muted">{stats.utilizationPct}%</span>
                </div>
              </TableCell>
              <TableCell className="text-right tabular-nums font-medium">{stats.rating.toFixed(1)} ★</TableCell>
            </TableRow>
          );
        })}
        {technicians.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="py-10 text-center text-text-muted">
              No technicians match your filters.
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}
