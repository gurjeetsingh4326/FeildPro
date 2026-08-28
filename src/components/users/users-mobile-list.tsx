import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

export interface UsersMobileListProps {
  users: AppUser[];
  onChangeRole: (userId: string, role: Role) => void;
  onRequestToggleStatus: (user: AppUser) => void;
}

export function UsersMobileList({ users, onChangeRole, onRequestToggleStatus }: UsersMobileListProps) {
  if (users.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border-strong bg-surface p-6 text-center text-sm text-text-muted">
        No users match your filters.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {users.map((user) => {
        const statusMeta = USER_STATUS_META[user.status];
        return (
          <li key={user.id} className="rounded-lg border border-border bg-surface p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2.5">
                <Avatar name={user.name} size="sm" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text-primary">{user.name}</p>
                  <p className="truncate text-[12px] text-text-muted">{user.email}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label={`Actions for ${user.name}`} className="shrink-0">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                  {ROLES.map((role) => (
                    <DropdownMenuItem key={role} disabled={role === user.role} onSelect={() => onChangeRole(user.id, role)}>
                      {ROLE_META[role].label}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem destructive={user.status !== "suspended"} onSelect={() => onRequestToggleStatus(user)}>
                    {user.status === "suspended" ? "Reactivate" : "Suspend"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-2 text-[12px]">
              <Badge variant="neutral">{ROLE_META[user.role].label}</Badge>
              <Badge variant={statusMeta.badge} dot>
                {statusMeta.label}
              </Badge>
              <span className="text-text-muted">{user.lastActive}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
