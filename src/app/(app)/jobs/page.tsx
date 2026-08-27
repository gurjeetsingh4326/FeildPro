import { JobsView } from "@/components/technician-mobile/jobs-view";
import { getTechnicianJobs } from "@/lib/dummy-data/technician";
import { DUMMY_USERS } from "@/lib/roles";

export default function JobsPage() {
  const jobs = getTechnicianJobs(DUMMY_USERS.technician.name);

  return <JobsView jobs={jobs} />;
}
