"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, ClipboardList, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Today", href: "/today", icon: CalendarCheck },
  { label: "Jobs", href: "/jobs", icon: ClipboardList },
  { label: "Schedule", href: "/schedule", icon: Calendar },
  { label: "Profile", href: "/profile", icon: User },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="grid shrink-0 grid-cols-4 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)]"
      style={{ height: "calc(56px + env(safe-area-inset-bottom))" }}
      aria-label="Primary"
    >
      {TABS.map((tab) => {
        const active = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors",
              active ? "text-primary-text" : "text-text-muted"
            )}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="size-5" strokeWidth={active ? 2.25 : 2} />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
