import { Card } from "@/components/ui/card";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { getInvoiceTimeline, type Invoice } from "@/lib/dummy-data/invoices";

export function InvoiceTimeline({ invoice }: { invoice: Invoice }) {
  const timeline = getInvoiceTimeline(invoice);

  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-text-primary">Timeline</h3>
      <Timeline>
        {timeline.map((event, i) => (
          <TimelineItem key={event.id} tone={i === timeline.length - 1 && invoice.status === "paid" ? "success" : "muted"} last={i === timeline.length - 1}>
            <p className="text-sm text-text-primary">
              <span className="font-medium">{event.actorName}</span> {event.description}
            </p>
            <p className="mt-0.5 text-[13px] text-text-muted">{event.timestamp}</p>
          </TimelineItem>
        ))}
      </Timeline>
    </Card>
  );
}
