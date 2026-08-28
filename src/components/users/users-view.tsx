"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { UserFilters } from "@/components/users/user-filters";
import { InviteUserModal } from "@/components/users/invite-user-modal";
import { UsersTable, type SortColumn } from "@/components/users/users-table";
import { UsersMobileList } from "@/components/users/users-mobile-list";
import { RolePermissionsTable } from "@/components/users/role-permissions-table";
import { USERS, USER_STATUS_META, type AppUser, type UserStatus } from "@/lib/dummy-data/users";
import { ROLE_META, type Role } from "@/lib/roles";
import { toast } from "@/lib/toast-bus";
import type { SortDirection } from "@/components/ui/table";

const PAGE_SIZE = 10;

export function UsersView() {
  const [users, setUsers] = React.useState<AppUser[]>(USERS);
  const [search, setSearch] = React.useState("");
  const [selectedRoles, setSelectedRoles] = React.useState<Set<Role>>(new Set());
  const [selectedStatuses, setSelectedStatuses] = React.useState<Set<UserStatus>>(new Set());
  const [sortColumn, setSortColumn] = React.useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);
  const [page, setPage] = React.useState(1);
  const [suspendTarget, setSuspendTarget] = React.useState<AppUser | null>(null);

  const toggleRole = (role: Role) => {
    setPage(1);
    setSelectedRoles((prev) => {
      const next = new Set(prev);
      if (next.has(role)) next.delete(role);
      else next.add(role);
      return next;
    });
  };

  const toggleStatus = (status: UserStatus) => {
    setPage(1);
    setSelectedStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  };

  const handleSort = (column: SortColumn) => {
    if (sortColumn !== column) {
      setSortColumn(column);
      setSortDirection("asc");
    } else if (sortDirection === "asc") {
      setSortDirection("desc");
    } else if (sortDirection === "desc") {
      setSortColumn(null);
      setSortDirection(null);
    } else {
      setSortDirection("asc");
    }
  };

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    const result = users.filter((u) => {
      const matchesSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchesRole = selectedRoles.size === 0 || selectedRoles.has(u.role);
      const matchesStatus = selectedStatuses.size === 0 || selectedStatuses.has(u.status);
      return matchesSearch && matchesRole && matchesStatus;
    });
    if (sortColumn === "lastActive") {
      return [...result].sort((a, b) => a.lastActive.localeCompare(b.lastActive) * (sortDirection === "desc" ? -1 : 1));
    }
    return result;
  }, [users, search, selectedRoles, selectedStatuses, sortColumn, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeCount = selectedRoles.size + selectedStatuses.size;

  function handleCreate(user: AppUser) {
    setUsers((prev) => [user, ...prev]);
  }

  function handleChangeRole(userId: string, role: Role) {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
    const user = users.find((u) => u.id === userId);
    toast({ variant: "success", title: "Role updated", description: `${user?.name} is now ${ROLE_META[role].label}` });
  }

  function confirmToggleStatus() {
    if (!suspendTarget) return;
    const nextStatus: UserStatus = suspendTarget.status === "suspended" ? "active" : "suspended";
    setUsers((prev) => prev.map((u) => (u.id === suspendTarget.id ? { ...u, status: nextStatus } : u)));
    toast({
      variant: "success",
      title: nextStatus === "suspended" ? "User suspended" : "User reactivated",
      description: suspendTarget.name,
    });
    setSuspendTarget(null);
  }

  function handleRequestToggleStatus(user: AppUser) {
    if (user.status === "suspended") {
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: "active" } : u)));
      toast({ variant: "success", title: "User reactivated", description: user.name });
      return;
    }
    setSuspendTarget(user);
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="permissions">Role Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative sm:w-72">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
                  <Input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search users…"
                    className="pl-9"
                  />
                </div>
                <UserFilters
                  selectedRoles={selectedRoles}
                  onToggleRole={toggleRole}
                  selectedStatuses={selectedStatuses}
                  onToggleStatus={toggleStatus}
                  activeCount={activeCount}
                />
              </div>
              <InviteUserModal onCreate={handleCreate} />
            </div>

            {activeCount > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                {Array.from(selectedRoles).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRole(role)}
                    className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label={`Remove filter: ${role}`}
                  >
                    <Badge variant="neutral" className="cursor-pointer hover:bg-border">
                      {ROLE_META[role].label} ×
                    </Badge>
                  </button>
                ))}
                {Array.from(selectedStatuses).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => toggleStatus(status)}
                    className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label={`Remove filter: ${status}`}
                  >
                    <Badge variant="neutral" className="cursor-pointer hover:bg-border">
                      {USER_STATUS_META[status].label} ×
                    </Badge>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRoles(new Set());
                    setSelectedStatuses(new Set());
                  }}
                  className="text-[13px] font-medium text-text-muted hover:text-text-primary"
                >
                  Clear all
                </button>
              </div>
            ) : null}

            <div className="hidden md:block">
              <UsersTable
                users={pageItems}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
                onChangeRole={handleChangeRole}
                onRequestToggleStatus={handleRequestToggleStatus}
              />
            </div>
            <div className="md:hidden">
              <UsersMobileList users={pageItems} onChangeRole={handleChangeRole} onRequestToggleStatus={handleRequestToggleStatus} />
            </div>

            <div className="flex items-center justify-between text-[13px] text-text-secondary">
              <span>
                {filtered.length === 0
                  ? "0 results"
                  : `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
              </span>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                  Previous
                </Button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <Button variant="secondary" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="permissions">
          <RolePermissionsTable />
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={suspendTarget !== null}
        onOpenChange={(open) => {
          if (!open) setSuspendTarget(null);
        }}
        title="Suspend this user?"
        description={`${suspendTarget?.name} will immediately lose access to FieldPro. You can reactivate them at any time.`}
        confirmLabel="Suspend user"
        destructive
        onConfirm={confirmToggleStatus}
      />
    </div>
  );
}
