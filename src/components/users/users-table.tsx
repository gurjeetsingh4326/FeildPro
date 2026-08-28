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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ROLES, ROLE_META, type Role } from "@/lib/roles";
import { USER_STATUS_META, type AppUser } from "@/lib/dummy-data/users";

export type SortColumn = "lastActive" | null;

export interface UsersTableProps {
  users: AppUser[];
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
  onChangeRole: (userId: string, role: Role) => void;
  onRequestToggleStatus: (user: AppUser) => void;
}

export function UsersTable({ users, sortColumn, sortDirection, onSort, onChangeRole, onRequestToggleStatus }: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <SortableTableHead direction={sortColumn === "lastActive" ? sortDirection : null} onSort={() => onSort("lastActive")}>
            Last Active
          </SortableTableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const statusMeta = USER_STATUS_META[user.status];
          return (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar name={user.name} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-text-primary">{user.name}</p>
                    <p className="truncate text-[13px] text-text-muted">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="neutral">{ROLE_META[user.role].label}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={statusMeta.badge} dot>
                  {statusMeta.label}
                </Badge>
              </TableCell>
              <TableCell className="text-text-secondary">{user.lastActive}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label={`Actions for ${user.name}`}>
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                    {ROLES.map((role) => (
                      <DropdownMenuItem
                        key={role}
                        disabled={role === user.role}
                        onSelect={() => onChangeRole(user.id, role)}
                      >
                        {ROLE_META[role].label}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem destructive={user.status !== "suspended"} onSelect={() => onRequestToggleStatus(user)}>
                      {user.status === "suspended" ? "Reactivate" : "Suspend"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="py-10 text-center text-text-muted">
              No users match your filters.
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}
