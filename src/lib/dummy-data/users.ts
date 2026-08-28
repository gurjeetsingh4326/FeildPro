import { DUMMY_USERS, type Role } from "@/lib/roles";

export type UserStatus = "active" | "invited" | "suspended";

export const USER_STATUS_META: Record<UserStatus, { label: string; badge: "success" | "warning" | "neutral" }> = {
  active: { label: "Active", badge: "success" },
  invited: { label: "Invited", badge: "warning" },
  suspended: { label: "Suspended", badge: "neutral" },
};

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  lastActive: string;
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** The canonical signed-in user per role (DUMMY_USERS, used by the header/
    role switcher) is always present here too, so switching roles in dev
    always corresponds to a real row in this list. */
interface UserSeed {
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  lastActive: string;
}

const SEEDS: UserSeed[] = [
  { name: DUMMY_USERS.admin.name, email: DUMMY_USERS.admin.email, role: "admin", status: "active", lastActive: "Just now" },
  { name: "Grace Coleman", email: "grace@fieldpro.dev", role: "admin", status: "active", lastActive: "2 days ago" },
  { name: DUMMY_USERS.dispatcher.name, email: DUMMY_USERS.dispatcher.email, role: "dispatcher", status: "active", lastActive: "12 minutes ago" },
  { name: "Marcus Webb", email: "marcus@fieldpro.dev", role: "dispatcher", status: "active", lastActive: "1 hour ago" },
  { name: "Elena Vance", email: "elena.vance@fieldpro.dev", role: "dispatcher", status: "suspended", lastActive: "3 weeks ago" },
  { name: DUMMY_USERS.technician.name, email: DUMMY_USERS.technician.email, role: "technician", status: "active", lastActive: "8 minutes ago" },
  { name: "Sam Torres", email: "sam@fieldpro.dev", role: "technician", status: "active", lastActive: "35 minutes ago" },
  { name: "Dana Lee", email: "dana@fieldpro.dev", role: "technician", status: "active", lastActive: "1 hour ago" },
  { name: "Chris Nguyen", email: "chris@fieldpro.dev", role: "technician", status: "active", lastActive: "Yesterday" },
  { name: DUMMY_USERS.accountant.name, email: DUMMY_USERS.accountant.email, role: "accountant", status: "active", lastActive: "3 hours ago" },
  { name: "Owen Bright", email: "owen@fieldpro.dev", role: "accountant", status: "invited", lastActive: "Never" },
];

export const USERS: AppUser[] = SEEDS.map((seed) => ({
  id: `user-${slugify(seed.name)}`,
  ...seed,
}));

export function getUser(id: string): AppUser | null {
  return USERS.find((u) => u.id === id) ?? null;
}
