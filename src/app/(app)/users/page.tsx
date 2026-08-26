import { ShieldCheck } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export default function UsersPage() {
  return (
    <PlaceholderPage
      icon={ShieldCheck}
      title="Users & Roles"
      description="Manage admins, dispatchers, technicians, and accountants, and their permissions. Coming in Phase 4."
    />
  );
}
