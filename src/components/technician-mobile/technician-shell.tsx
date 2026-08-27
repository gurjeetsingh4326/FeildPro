"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { BottomTabBar } from "@/components/technician-mobile/bottom-tab-bar";
import { useRole } from "@/lib/role-context";
import { DUMMY_USERS } from "@/lib/roles";

const TITLES: Record<string, string> = {
  "/today": "Today",
  "/jobs": "Jobs",
  "/schedule": "Schedule",
  "/profile": "Profile",
};

function titleFor(pathname: string) {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.startsWith("/work-orders/")) return "Job Details";
  return "FieldPro";
}

export function TechnicianMobileShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role } = useRole();
  const user = DUMMY_USERS[role];

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface px-4">
        <h1 className="text-base font-semibold text-text-primary">{titleFor(pathname)}</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/profile" aria-label="Profile">
            <Avatar name={user.name} size="sm" />
          </Link>
        </div>
      </header>
      <main className="scrollbar-thin flex-1 overflow-y-auto">{children}</main>
      <BottomTabBar />
    </div>
  );
}
