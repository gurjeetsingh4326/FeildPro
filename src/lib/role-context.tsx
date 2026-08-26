"use client";

import * as React from "react";
import { type Role, ROLES } from "@/lib/roles";

const STORAGE_KEY = "fieldpro-role";
const DEFAULT_ROLE: Role = "admin";

interface RoleContextValue {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = React.createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = React.useState<Role>(DEFAULT_ROLE);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Role | null;
    if (stored && ROLES.includes(stored)) setRoleState(stored);
  }, []);

  const setRole = React.useCallback((next: Role) => {
    setRoleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = React.useMemo(() => ({ role, setRole }), [role, setRole]);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

/** Preview-only role switch (Phase 0–5 has no real auth) — see the dev-only
    RoleSwitcher in the header. Once Phase 6 wires real auth, this becomes the
    signed-in user's actual role and the switcher goes away. */
export function useRole() {
  const ctx = React.useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within a RoleProvider");
  return ctx;
}
