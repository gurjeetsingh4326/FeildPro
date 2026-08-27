import { notFound } from "next/navigation";
import { getWorkOrderDetail } from "@/lib/dummy-data/work-order-detail";
import { WorkOrderDetailView } from "@/components/work-order-detail/work-order-detail-view";

export default async function WorkOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = getWorkOrderDetail(decodeURIComponent(id));
  if (!detail) notFound();

  return <WorkOrderDetailView initial={detail} />;
}
