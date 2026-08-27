import { notFound } from "next/navigation";
import { getCustomer, getCustomerWorkOrders } from "@/lib/dummy-data/customers";
import { CustomerDetailView } from "@/components/customer-detail/customer-detail-view";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = getCustomer(decodeURIComponent(id));
  if (!customer) notFound();

  const workOrders = getCustomerWorkOrders(customer.name);

  return <CustomerDetailView initial={customer} workOrders={workOrders} />;
}
