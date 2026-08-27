import { TodayView } from "@/components/technician-mobile/today-view";
import { getTechnicianTodayJobs } from "@/lib/dummy-data/technician";
import { DUMMY_USERS } from "@/lib/roles";

export default function TodayPage() {
  const technicianName = DUMMY_USERS.technician.name;
  const jobs = getTechnicianTodayJobs(technicianName);

  return <TodayView jobs={jobs} firstName={technicianName.split(" ")[0]} />;
}
