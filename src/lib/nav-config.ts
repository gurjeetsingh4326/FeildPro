import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Users,
  HardHat,
  Wrench,
  Package,
  Boxes,
  FileText,
  CreditCard,
  BarChart3,
  ShieldCheck,
  Settings,
} from "lucide-react";
import type { Role } from "@/lib/roles";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Roles that can see this item. Omit for "every role" (e.g. Dashboard). */
  roles?: Role[];
}

export interface NavSection {
  title: string | null;
  items: NavItem[];
}

/* Mirrors docs/SPACING_AND_LAYOUT.md → Sidebar structure, and the access lists
   in the project brief Section 12 (User Roles). Dashboard is visible to every
   role as the common landing page. */
export const NAV_SECTIONS: NavSection[] = [
  {
    title: null,
    items: [{ label: "Dashboard", href: "/", icon: LayoutDashboard }],
  },
  {
    title: "Operations",
    items: [
      { label: "Work Orders", href: "/work-orders", icon: ClipboardList, roles: ["admin", "dispatcher", "technician"] },
      { label: "Schedule", href: "/schedule", icon: Calendar, roles: ["admin", "dispatcher", "technician"] },
      { label: "Customers", href: "/customers", icon: Users, roles: ["admin", "dispatcher"] },
      { label: "Technicians", href: "/technicians", icon: HardHat, roles: ["admin", "dispatcher"] },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Services", href: "/services", icon: Wrench, roles: ["admin", "dispatcher"] },
      { label: "Parts", href: "/parts", icon: Package, roles: ["admin"] },
      { label: "Inventory", href: "/inventory", icon: Boxes, roles: ["admin"] },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Invoices", href: "/invoices", icon: FileText, roles: ["admin", "accountant"] },
      { label: "Payments", href: "/payments", icon: CreditCard, roles: ["admin", "accountant"] },
    ],
  },
  {
    title: "Analytics",
    items: [{ label: "Reports", href: "/reports", icon: BarChart3, roles: ["admin", "accountant"] }],
  },
];

/* Bottom-anchored, visually separated per docs/SPACING_AND_LAYOUT.md. */
export const ADMIN_NAV_SECTION: NavSection = {
  title: "Administration",
  items: [
    { label: "Users & Roles", href: "/users", icon: ShieldCheck, roles: ["admin"] },
    { label: "Settings", href: "/settings", icon: Settings, roles: ["admin"] },
  ],
};

export function isNavItemVisible(item: NavItem, role: Role): boolean {
  return !item.roles || item.roles.includes(role);
}

const ALL_ITEMS: NavItem[] = [...NAV_SECTIONS, ADMIN_NAV_SECTION].flatMap((s) => s.items);

/** Best-effort page title for the header, derived from the nav config. Falls
    back to titleizing the first path segment for routes without a nav entry
    (e.g. a Work Order detail page at /work-orders/WO-123). */
export function getPageTitle(pathname: string): string {
  const exact = ALL_ITEMS.find((item) => item.href === pathname);
  if (exact) return exact.label;

  const segment = pathname.split("/").filter(Boolean)[0];
  if (!segment) return "Dashboard";

  const parent = ALL_ITEMS.find((item) => item.href === `/${segment}`);
  if (parent) return parent.label;

  return segment
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}
