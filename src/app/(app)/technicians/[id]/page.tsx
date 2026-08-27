import { notFound } from "next/navigation";
import { getTechnician } from "@/lib/dummy-data/technicians";
import { TechnicianDetailView } from "@/components/technician-detail/technician-detail-view";

export default async function TechnicianDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const technician = getTechnician(decodeURIComponent(id));
  if (!technician) notFound();

  return <TechnicianDetailView technician={technician} />;
}
