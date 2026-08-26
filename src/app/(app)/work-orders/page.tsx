import { ClipboardList } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export default function WorkOrdersPage() {
  return (
    <PlaceholderPage
      icon={ClipboardList}
      title="Work Orders"
      description="Table and Kanban views of every work order — customer, service, priority, status, technician, schedule. One of the 5 portfolio hero screens, coming in Phase 2."
    />
  );
}
