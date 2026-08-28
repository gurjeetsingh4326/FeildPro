"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, PanelLeftClose, PanelLeftOpen, Wrench, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRole } from "@/lib/role-context";
import { NAV_SECTIONS, ADMIN_NAV_SECTION, isNavItemVisible, type NavItem } from "@/lib/nav-config";
import { SimpleTooltip } from "@/components/ui/tooltip";

const COLLAPSE_STORAGE_KEY = "fieldpro-sidebar-collapsed";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  item,
  collapsed,
  active,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  active: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  const link = (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group relative flex h-9 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
        collapsed && "justify-center px-0",
        active
          ? "bg-sidebar-active-bg text-sidebar-active-text"
          : "text-sidebar-text-muted hover:bg-white/5 hover:text-sidebar-text"
      )}
    >
      {active ? (
        <span className="absolute inset-y-1 left-0 w-[3px] rounded-full bg-primary-text" aria-hidden />
      ) : null}
      <Icon className="size-[18px] shrink-0" />
      {!collapsed ? <span className="truncate">{item.label}</span> : null}
    </Link>
  );

  if (collapsed) {
    return <SimpleTooltip label={item.label}>{link}</SimpleTooltip>;
  }
  return link;
}

/** Logo row + nav sections, shared by the desktop sidebar and the mobile
    off-canvas drawer so both stay in sync automatically. */
function SidebarBrand({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center border-b border-sidebar-border px-4",
        collapsed && "justify-center px-0"
      )}
      style={{ height: "var(--header-height)" }}
    >
      {collapsed ? (
        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-white">
          <Wrench className="size-4" />
        </span>
      ) : (
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-white">
            <Wrench className="size-4" />
          </span>
          <span className="text-base font-semibold tracking-tight text-sidebar-text">FieldPro</span>
        </div>
      )}
    </div>
  );
}

function SidebarNav({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  const { role } = useRole();

  return (
    <>
      <nav className="scrollbar-thin-dark flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {NAV_SECTIONS.map((section, i) => {
          const items = section.items.filter((item) => isNavItemVisible(item, role));
          if (items.length === 0) return null;
          return (
            <div key={i} className="space-y-1">
              {section.title && !collapsed ? (
                <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-sidebar-text-muted/70">
                  {section.title}
                </p>
              ) : null}
              {items.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  collapsed={collapsed}
                  active={isActive(pathname, item.href)}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          );
        })}
      </nav>

      {ADMIN_NAV_SECTION.items.some((item) => isNavItemVisible(item, role)) ? (
        <div className="shrink-0 border-t border-sidebar-border px-3 py-4 space-y-1">
          {!collapsed ? (
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-sidebar-text-muted/70">
              {ADMIN_NAV_SECTION.title}
            </p>
          ) : null}
          {ADMIN_NAV_SECTION.items
            .filter((item) => isNavItemVisible(item, role))
            .map((item) => (
              <NavLink
                key={item.href}
                item={item}
                collapsed={collapsed}
                active={isActive(pathname, item.href)}
                onNavigate={onNavigate}
              />
            ))}
        </div>
      ) : null}
    </>
  );
}

/** Desktop sidebar — expanded/collapsed icon-rail, hidden below `lg` in favor
    of MobileSidebar's off-canvas drawer (docs/RESPONSIVE_DESIGN.md). */
export function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(COLLAPSE_STORAGE_KEY);
    if (stored === "1") {
      setCollapsed(true);
    } else if (stored !== "0") {
      // No explicit user preference yet — default to the collapsed icon-rail
      // specifically at `lg` (1024–1279px, not xl+), per
      // docs/RESPONSIVE_DESIGN.md: "lg | Sidebar defaults to collapsed
      // icon-rail, expandable on hover/click".
      const isLgOnly = window.matchMedia("(min-width: 1024px) and (max-width: 1279px)").matches;
      setCollapsed(isLgOnly);
    }
    setMounted(true);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem(COLLAPSE_STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  };

  const width = collapsed ? "var(--sidebar-width-collapsed)" : "var(--sidebar-width-expanded)";

  return (
    <aside
      style={{ width, transition: mounted ? "width 150ms ease" : undefined }}
      className="hidden h-screen shrink-0 flex-col bg-sidebar-bg lg:flex"
    >
      <SidebarBrand collapsed={collapsed} />
      <SidebarNav collapsed={collapsed} />
      <div className="shrink-0 border-t border-sidebar-border p-3">
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex h-9 w-full items-center gap-2 rounded-md px-3 text-sidebar-text-muted transition-colors hover:bg-white/5 hover:text-sidebar-text",
            collapsed && "justify-center px-0"
          )}
        >
          {collapsed ? <PanelLeftOpen className="size-[18px]" /> : <PanelLeftClose className="size-[18px]" />}
          {!collapsed ? <span className="text-sm font-medium">Collapse</span> : null}
        </button>
      </div>
    </aside>
  );
}

/** Off-canvas nav drawer for < lg viewports. Self-contained: renders its own
    hamburger trigger (placed in the Header) and slide-in panel. */
export function MobileSidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label="Open navigation"
          className="flex size-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-background hover:text-text-primary lg:hidden"
        >
          <Menu className="size-5" />
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          style={{ zIndex: "var(--z-drawer)" }}
          className="fixed inset-0 bg-slate-950/50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 dark:bg-black/65 lg:hidden"
        />
        <DialogPrimitive.Content
          style={{ zIndex: "var(--z-drawer)", width: "var(--sidebar-width-expanded)" }}
          className={cn(
            "fixed inset-y-0 left-0 flex h-full flex-col bg-sidebar-bg outline-none lg:hidden",
            "data-[state=open]:animate-in data-[state=open]:slide-in-from-left",
            "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left"
          )}
        >
          <DialogPrimitive.Title className="sr-only">Navigation</DialogPrimitive.Title>
          <SidebarBrand collapsed={false} />
          <DialogPrimitive.Close className="absolute right-3 top-[18px] rounded-sm text-sidebar-text-muted transition-colors hover:text-sidebar-text">
            <X className="size-5" />
            <span className="sr-only">Close navigation</span>
          </DialogPrimitive.Close>
          <SidebarNav collapsed={false} onNavigate={() => setOpen(false)} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
