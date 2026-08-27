import { ProfileView } from "@/components/technician-mobile/profile-view";
import { getTechnicianStats } from "@/lib/dummy-data/technician";
import { DUMMY_USERS } from "@/lib/roles";

export default function ProfilePage() {
  const user = DUMMY_USERS.technician;
  const stats = getTechnicianStats(user.name);

  return <ProfileView name={user.name} email={user.email} phone="(555) 010-8842" stats={stats} />;
}
