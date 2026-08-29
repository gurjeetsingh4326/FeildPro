"use client";

import * as React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useIsDarkMode } from "@/hooks/use-is-dark-mode";
import { STATUS_META } from "@/lib/work-order-status";
import { getCustomerLocation, COMPANY_LOCATION } from "@/lib/dummy-data/locations";
import { MAP_TILE_URL, MAP_ATTRIBUTION } from "@/components/maps/map-tiles";
import { formatMoney } from "@/lib/utils";
import type { WorkOrder } from "@/lib/dummy-data/work-orders";
import type { WorkOrderStatus } from "@/lib/types";

/** Same tone tokens the status Badge uses (src/components/ui/badge.tsx),
    so a pin's color always matches the badge shown for that status
    elsewhere in the app. */
const STATUS_MARKER_COLOR: Record<WorkOrderStatus, string> = {
  draft: "var(--text-muted)",
  scheduled: "var(--info)",
  in_progress: "var(--primary)",
  on_hold: "var(--warning)",
  completed: "var(--success)",
  invoiced: "var(--info)",
  paid: "var(--success)",
  cancelled: "var(--error)",
};

function workOrderDivIcon(status: WorkOrderStatus) {
  return L.divIcon({
    className: "fieldpro-map-marker",
    html: `<span style="background:${STATUS_MARKER_COLOR[status]}"></span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 22],
    popupAnchor: [0, -24],
  });
}

export interface WorkOrdersMapProps {
  workOrders: WorkOrder[];
  height?: number;
}

/** Groups work orders sharing an exact customer location so multiple open
    jobs at the same address stack into one marker instead of hiding under
    each other. */
function groupByLocation(workOrders: WorkOrder[]) {
  const groups = new Map<string, { lat: number; lng: number; items: WorkOrder[] }>();
  for (const wo of workOrders) {
    const loc = getCustomerLocation(wo.customerName);
    const key = `${loc.lat},${loc.lng}`;
    const existing = groups.get(key);
    if (existing) existing.items.push(wo);
    else groups.set(key, { lat: loc.lat, lng: loc.lng, items: [wo] });
  }
  return Array.from(groups.values());
}

export function WorkOrdersMap({ workOrders, height = 480 }: WorkOrdersMapProps) {
  const isDark = useIsDarkMode();
  const groups = React.useMemo(() => groupByLocation(workOrders), [workOrders]);
  const center = groups.length > 0 ? groups[0] : COMPANY_LOCATION;

  return (
    <div
      className={`overflow-hidden rounded-lg border border-border ${isDark ? "fieldpro-map-dark" : ""}`}
      style={{ height }}
    >
      <MapContainer center={[center.lat, center.lng]} zoom={12} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer url={MAP_TILE_URL} attribution={MAP_ATTRIBUTION} />
        {groups.map((group) => {
          const primary = group.items[0];
          const statusMeta = STATUS_META[primary.status];
          return (
            <Marker key={`${group.lat},${group.lng}`} position={[group.lat, group.lng]} icon={workOrderDivIcon(primary.status)}>
              <Popup minWidth={200}>
                <div className="space-y-2 p-0.5">
                  <p className="text-sm font-semibold text-text-primary">{primary.customerName}</p>
                  <ul className="space-y-1.5">
                    {group.items.map((wo) => (
                      <li key={wo.id} className="flex items-center justify-between gap-2">
                        <Link href={`/work-orders/${wo.id}`} className="text-[12px] font-medium text-primary-text hover:underline">
                          {wo.id}
                        </Link>
                        <Badge variant={STATUS_META[wo.status].badge} dot>
                          {STATUS_META[wo.status].label}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                  {group.items.length === 1 ? (
                    <p className="text-[12px] text-text-muted">
                      {primary.service} · ${formatMoney(primary.total)}
                    </p>
                  ) : null}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
