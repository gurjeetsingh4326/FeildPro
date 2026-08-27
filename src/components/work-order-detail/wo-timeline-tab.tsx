import { Card } from "@/components/ui/card";
import { Timeline, TimelineItem, type TimelineDotTone } from "@/components/ui/timeline";
import type { TimelineEntry } from "@/lib/dummy-data/work-order-detail";
import type { ActivityEventType } from "@/lib/types";

const TONE_BY_TYPE: Record<ActivityEventType, TimelineDotTone> = {
  created: "muted",
  assigned: "primary",
  completed: "success",
  invoiced: "warning",
  paid: "success",
  note: "muted",
};

export function WoTimelineTab({ timeline }: { timeline: TimelineEntry[] }) {
  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-text-primary">Timeline</h3>
      <Timeline>
        {timeline.map((event, i) => (
          <TimelineItem key={event.id} tone={TONE_BY_TYPE[event.type]} last={i === timeline.length - 1}>
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
