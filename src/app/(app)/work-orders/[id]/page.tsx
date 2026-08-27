import { notFound } from "next/navigation";
import { getWorkOrderDetail } from "@/lib/dummy-data/work-order-detail";
import { WorkOrderDetailRouter } from "@/components/work-order-detail/work-order-detail-router";

export default async function WorkOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = getWorkOrderDetail(decodeURIComponent(id));
  if (!detail) notFound();

  return <WorkOrderDetailRouter initial={detail} />;
}
