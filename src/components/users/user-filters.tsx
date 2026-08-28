"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ROLES, ROLE_META, type Role } from "@/lib/roles";
import { USER_STATUS_META, type UserStatus } from "@/lib/dummy-data/users";

const STATUSES: UserStatus[] = ["active", "invited", "suspended"];

export interface UserFiltersProps {
  selectedRoles: Set<Role>;
  onToggleRole: (role: Role) => void;
  selectedStatuses: Set<UserStatus>;
  onToggleStatus: (status: UserStatus) => void;
  activeCount: number;
}

export function UserFilters({ selectedRoles, onToggleRole, selectedStatuses, onToggleStatus, activeCount }: UserFiltersProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="md" className="gap-1.5">
          <SlidersHorizontal className="size-4" />
          Filters
          {activeCount > 0 ? (
            <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
              {activeCount}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Role</DropdownMenuLabel>
        {ROLES.map((role) => (
          <DropdownMenuCheckboxItem
            key={role}
            checked={selectedRoles.has(role)}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={() => onToggleRole(role)}
          >
            {ROLE_META[role].label}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        {STATUSES.map((status) => (
          <DropdownMenuCheckboxItem
            key={status}
            checked={selectedStatuses.has(status)}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={() => onToggleStatus(status)}
          >
            {USER_STATUS_META[status].label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
