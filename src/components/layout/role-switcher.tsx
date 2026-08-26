"use client";

import { FlaskConical } from "lucide-react";
import { useRole } from "@/lib/role-context";
import { ROLES, ROLE_META } from "@/lib/roles";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SimpleTooltip } from "@/components/ui/tooltip";

/** Dev-only tool for previewing role-based nav/access against dummy data.
    Disappears once Phase 6 wires real auth — see src/lib/role-context.tsx. */
export function RoleSwitcher() {
  const { role, setRole } = useRole();

  return (
    <DropdownMenu>
      <SimpleTooltip label="Preview as role (dev tool)">
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm" className="gap-1.5">
            <FlaskConical className="size-3.5 text-warning" />
            {ROLE_META[role].label}
          </Button>
        </DropdownMenuTrigger>
      </SimpleTooltip>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Preview as role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={role} onValueChange={(v) => setRole(v as typeof role)}>
          {ROLES.map((r) => (
            <DropdownMenuRadioItem
              key={r}
              value={r}
              className="h-auto flex-col items-start gap-0.5 py-2.5"
            >
              <span className="text-sm font-medium text-text-primary">{ROLE_META[r].label}</span>
              <span className="text-[13px] leading-snug text-text-muted">{ROLE_META[r].description}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
