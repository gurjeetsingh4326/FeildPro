import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Timeline, TimelineItem, type TimelineDotTone } from "@/components/ui/timeline";
import { RECENT_ACTIVITY } from "@/lib/dummy-data/dashboard";
import type { ActivityEventType } from "@/lib/types";

const TONE_BY_TYPE: Record<ActivityEventType, TimelineDotTone> = {
  created: "muted",
  assigned: "primary",
  completed: "success",
  invoiced: "warning",
  paid: "success",
  note: "muted",
};

export function RecentActivityCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <Timeline>
        {RECENT_ACTIVITY.map((event, i) => (
          <TimelineItem
            key={event.id}
            tone={TONE_BY_TYPE[event.type]}
            last={i === RECENT_ACTIVITY.length - 1}
          >
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
