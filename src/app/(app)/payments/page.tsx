import { CreditCard } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export default function PaymentsPage() {
  return (
    <PlaceholderPage
      icon={CreditCard}
      title="Payments"
      description="Customer payments against invoices — amount, method, date, status. Coming in Phase 3."
    />
  );
}
