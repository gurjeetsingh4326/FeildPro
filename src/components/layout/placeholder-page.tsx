import type { LucideIcon } from "lucide-react";
import { Construction } from "lucide-react";

export function PlaceholderPage({
  title,
  description,
  icon: Icon = Construction,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-20 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-chip-bg text-chip-text">
        <Icon className="size-6" />
      </span>
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      <p className="max-w-sm text-sm text-text-secondary">{description}</p>
    </div>
  );
}
