"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, HelpCircle, LogOut, Settings, User } from "lucide-react";
import { getPageTitle } from "@/lib/nav-config";
import { useRole } from "@/lib/role-context";
import { DUMMY_USERS, ROLE_META } from "@/lib/roles";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { RoleSwitcher } from "@/components/layout/role-switcher";
import { MobileSidebar } from "@/components/layout/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SimpleTooltip } from "@/components/ui/tooltip";

export function Header() {
  const pathname = usePathname();
  const { role } = useRole();
  const user = DUMMY_USERS[role];
  const title = getPageTitle(pathname);

  return (
    <header
      className="sticky top-0 z-[var(--z-sticky)] flex shrink-0 items-center justify-between gap-4 border-b border-border bg-surface px-6"
      style={{ height: "var(--header-height)" }}
    >
      <div className="flex min-w-0 items-center gap-2">
        <MobileSidebar />
        <h1 className="truncate text-lg font-semibold text-text-primary">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
          <Input
            type="search"
            placeholder="Search customers, work orders…"
            className="w-[280px] border-transparent bg-surface-sunken pl-9 focus:border-primary focus:bg-surface"
          />
        </div>

        <span className="hidden sm:block">
          <RoleSwitcher />
        </span>

        <SimpleTooltip label="Notifications">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex size-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-background hover:text-text-primary"
          >
            <Bell className="size-[18px]" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-error" aria-hidden />
          </button>
        </SimpleTooltip>

        <SimpleTooltip label="Help">
          <button
            type="button"
            aria-label="Help"
            className="hidden size-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-background hover:text-text-primary sm:flex"
          >
            <HelpCircle className="size-[18px]" />
          </button>
        </SimpleTooltip>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="ml-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Avatar name={user.name} size="md" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="normal-case">
              <p className="text-sm font-medium text-text-primary">{user.name}</p>
              <p className="text-[13px] font-normal text-text-muted">{user.email}</p>
              <p className="mt-1 text-[13px] font-normal text-primary-text">{ROLE_META[role].label}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <User className="size-4" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="size-4" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login">
                <LogOut className="size-4" /> Sign out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
