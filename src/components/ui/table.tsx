import * as React from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="scrollbar-thin w-full overflow-x-auto rounded-lg border border-border">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn("border-b border-border-strong bg-surface-sunken [&_tr]:border-b-0", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

function TableFooter({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      className={cn("border-t border-border bg-surface-sunken font-medium", className)}
      {...props}
    />
  );
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

function TableRow({ className, selected, ...props }: TableRowProps) {
  return (
    <tr
      data-state={selected ? "selected" : undefined}
      className={cn(
        "border-b border-border transition-colors hover:bg-background data-[state=selected]:bg-primary-light",
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "h-11 whitespace-nowrap px-3 text-left align-middle text-xs font-semibold uppercase tracking-wide text-text-secondary",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn("px-3 py-3 align-middle text-text-primary", className)}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return <caption className={cn("mt-3 text-[13px] text-text-muted", className)} {...props} />;
}

export type SortDirection = "asc" | "desc" | null;

/** Sortable column header — click cycles asc -> desc -> none (COMPONENT_GUIDELINES.md → Tables). */
function SortableTableHead({
  className,
  children,
  direction = null,
  onSort,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & {
  direction?: SortDirection;
  onSort?: () => void;
}) {
  const Icon = direction === "asc" ? ArrowUp : direction === "desc" ? ArrowDown : ArrowUpDown;
  return (
    <TableHead className={className} {...props}>
      <button
        type="button"
        onClick={onSort}
        className={cn(
          "inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide transition-colors",
          direction ? "text-primary-text" : "text-text-secondary hover:text-text-primary"
        )}
      >
        {children}
        <Icon className="size-3.5" />
      </button>
    </TableHead>
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  SortableTableHead,
};
