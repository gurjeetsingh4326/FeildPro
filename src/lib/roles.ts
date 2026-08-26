export type Role = "admin" | "dispatcher" | "technician" | "accountant";

export const ROLES: Role[] = ["admin", "dispatcher", "technician", "accountant"];

export const ROLE_META: Record<Role, { label: string; description: string }> = {
  admin: { label: "Admin", description: "Full access" },
  dispatcher: { label: "Dispatcher", description: "Customers, work orders, schedule, technicians, services" },
  technician: { label: "Technician", description: "Assigned jobs, schedule, job execution" },
  accountant: { label: "Accountant", description: "Invoices, payments, financial reports" },
};

/** Dummy signed-in user per role, until real auth exists (Phase 6). */
export const DUMMY_USERS: Record<Role, { name: string; email: string }> = {
  admin: { name: "Priya Patel", email: "priya@fieldpro.dev" },
  dispatcher: { name: "Jordan Park", email: "jordan@fieldpro.dev" },
  technician: { name: "Maria Chen", email: "maria@fieldpro.dev" },
  accountant: { name: "Alex Kim", email: "alex@fieldpro.dev" },
};
