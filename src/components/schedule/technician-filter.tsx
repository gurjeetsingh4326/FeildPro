import { TECHNICIANS } from "@/lib/dummy-data/schedule";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface TechnicianFilterProps {
  selected: Set<string>;
  onToggle: (id: string) => void;
  className?: string;
}

export function TechnicianFilter({ selected, onToggle, className }: TechnicianFilterProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
        Technicians
      </p>
      {TECHNICIANS.map((tech) => {
        const checked = selected.has(tech.id);
        return (
          <label
            key={tech.id}
            className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-background"
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(tech.id)}
              className="sr-only"
            />
            <span
              className={cn(
                "flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors"
              )}
              style={{
                backgroundColor: checked ? tech.color : "transparent",
                borderColor: tech.color,
              }}
              aria-hidden
            >
              {checked ? <span className="size-1.5 rounded-[1px] bg-white" /> : null}
            </span>
            <Avatar name={tech.name} size="sm" />
            <span className={cn("truncate text-sm", checked ? "text-text-primary" : "text-text-muted")}>
              {tech.name}
            </span>
          </label>
        );
      })}
    </div>
  );
}
