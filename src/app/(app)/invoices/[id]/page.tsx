import { notFound } from "next/navigation";
import { getInvoice } from "@/lib/dummy-data/invoices";
import { InvoiceDetailView } from "@/components/invoice-detail/invoice-detail-view";

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = getInvoice(decodeURIComponent(id));
  if (!invoice) notFound();

  return <InvoiceDetailView initial={invoice} />;
}
