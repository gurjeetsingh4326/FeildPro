"use client";

import * as React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useIsDarkMode } from "@/hooks/use-is-dark-mode";
import { TECHNICIAN_STATUS_META, getTechnicianStats, type TechnicianProfile } from "@/lib/dummy-data/technicians";
import { getTechnicianLocation, COMPANY_LOCATION } from "@/lib/dummy-data/locations";
import { MAP_TILE_URL, MAP_ATTRIBUTION } from "@/components/maps/map-tiles";

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function technicianDivIcon(technician: TechnicianProfile) {
  return L.divIcon({
    className: "fieldpro-map-marker",
    html: `<span style="background:${technician.color}">${initialsFrom(technician.name)}</span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -34],
  });
}

export interface TechnicianMapProps {
  technicians: TechnicianProfile[];
  /** Focus a single technician (e.g. the mobile job-execution view) instead
      of the whole roster. */
  height?: number;
}

export function TechnicianMap({ technicians, height = 420 }: TechnicianMapProps) {
  const isDark = useIsDarkMode();
  const center = technicians.length > 0 ? getTechnicianLocation(technicians[0].id) : COMPANY_LOCATION;

  return (
    <div
      className={`overflow-hidden rounded-lg border border-border ${isDark ? "fieldpro-map-dark" : ""}`}
      style={{ height }}
    >
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url={MAP_TILE_URL} attribution={MAP_ATTRIBUTION} />
        {technicians.map((tech) => {
          const loc = getTechnicianLocation(tech.id);
          const stats = getTechnicianStats(tech.id, tech.name);
          const statusMeta = TECHNICIAN_STATUS_META[tech.status];
          return (
            <Marker key={tech.id} position={[loc.lat, loc.lng]} icon={technicianDivIcon(tech)}>
              <Popup minWidth={200}>
                <div className="space-y-2 p-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <Link href={`/technicians/${tech.id}`} className="text-sm font-semibold text-text-primary hover:underline">
                      {tech.name}
                    </Link>
                    <Badge variant={statusMeta.badge} dot>
                      {statusMeta.label}
                    </Badge>
                  </div>
                  <p className="text-[12px] text-text-muted">{tech.role}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <Progress value={stats.utilizationPct} tone="auto" className="flex-1" />
                    <span className="shrink-0 text-[12px] tabular-nums text-text-muted">{stats.utilizationPct}%</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
