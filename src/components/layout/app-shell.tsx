"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { TechnicianMobileShell } from "@/components/technician-mobile/technician-shell";
import { useRole } from "@/lib/role-context";
import { useBreakpoint } from "@/hooks/use-breakpoint";

/** Below `md`, the Technician role gets a dedicated mobile shell (bottom tab
    bar, no sidebar) instead of the desktop admin shell — the two distinct
    responsive experiences docs/RESPONSIVE_DESIGN.md calls for. Every other
    role/breakpoint combination keeps the standard sidebar + header shell. */
export function AppShell({ children }: { children: React.ReactNode }) {
  const { role } = useRole();
  const breakpoint = useBreakpoint();

  if (role === "technician" && breakpoint === "mobile") {
    return <TechnicianMobileShell>{children}</TechnicianMobileShell>;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />
        <main className="scrollbar-thin flex flex-1 flex-col overflow-y-auto">
          {/* Caps content width so it doesn't stretch full-bleed on ultra-wide
              monitors — every page gets this for free instead of each having
              to opt in (docs/RESPONSIVE_DESIGN.md's 2xl row calls this out). */}
          <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col">{children}</div>
        </main>
      </div>
    </div>
  );
}
