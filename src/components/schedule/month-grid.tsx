import { cn } from "@/lib/utils";
import { MONTH_COUNTS } from "@/lib/dummy-data/schedule";

const YEAR = 2026;
const MONTH_INDEX0 = 7; // August
const TODAY_DATE_OF_MONTH = 26;
const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function buildMonthGrid() {
  const firstOfMonth = new Date(YEAR, MONTH_INDEX0, 1);
  const startWeekday = (firstOfMonth.getDay() + 6) % 7; // Mon=0 .. Sun=6
  const start = new Date(YEAR, MONTH_INDEX0, 1 - startWeekday);
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export interface MonthGridProps {
  onSelectDay?: (date: Date) => void;
}

export function MonthGrid({ onSelectDay }: MonthGridProps) {
  const days = buildMonthGrid();

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="grid grid-cols-7 border-b border-border bg-surface-sunken">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="px-2 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-text-muted">
            {label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((date, i) => {
          const inMonth = date.getMonth() === MONTH_INDEX0;
          const isToday = inMonth && date.getDate() === TODAY_DATE_OF_MONTH;
          const count = inMonth ? MONTH_COUNTS[date.getDate()] ?? 0 : 0;

          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectDay?.(date)}
              disabled={!inMonth}
              className={cn(
                "flex min-h-[88px] flex-col items-start gap-1.5 border-b border-r border-border p-2 text-left transition-colors [&:nth-child(7n)]:border-r-0",
                inMonth ? "bg-surface hover:bg-background" : "bg-surface-sunken/40 text-text-disabled",
                !inMonth && "cursor-default"
              )}
            >
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full text-[13px] font-medium",
                  isToday ? "bg-primary text-white" : inMonth ? "text-text-primary" : "text-text-disabled"
                )}
              >
                {date.getDate()}
              </span>
              {count > 0 ? (
                <span className="rounded-full bg-primary-light px-1.5 py-0.5 text-[11px] font-medium text-primary-text">
                  {count} jobs
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
