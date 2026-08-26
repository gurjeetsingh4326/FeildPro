import { Boxes } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export default function InventoryPage() {
  return (
    <PlaceholderPage
      icon={Boxes}
      title="Inventory"
      description="Stock levels, reorder thresholds, and inventory transactions by warehouse. Coming in Phase 3."
    />
  );
}
