import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { NAV_SECTIONS, ADMIN_NAV_SECTION, isNavItemVisible } from "@/lib/nav-config";
import { ROLES, ROLE_META } from "@/lib/roles";

const ALL_SECTIONS = [...NAV_SECTIONS, ADMIN_NAV_SECTION];

/** Computed directly from the same nav-config.ts access lists that drive the
    sidebar itself, so this matrix can never drift from what each role can
    actually see. */
export function RolePermissionsTable() {
  return (
    <Card className="p-0">
      <div className="scrollbar-thin overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Section</TableHead>
              {ROLES.map((role) => (
                <TableHead key={role} className="text-center">
                  {ROLE_META[role].label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {ALL_SECTIONS.flatMap((section) => section.items).map((item) => (
              <TableRow key={item.href}>
                <TableCell className="flex items-center gap-2 font-medium text-text-primary">
                  <item.icon className="size-4 text-text-muted" />
                  {item.label}
                </TableCell>
                {ROLES.map((role) => (
                  <TableCell key={role} className="text-center">
                    {isNavItemVisible(item, role) ? (
                      <Check className="mx-auto size-4 text-success" aria-label="Visible" />
                    ) : (
                      <span className="text-text-disabled" aria-label="Hidden">
                        —
                      </span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
