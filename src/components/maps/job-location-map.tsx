"use client";

import * as React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useIsDarkMode } from "@/hooks/use-is-dark-mode";
import { MAP_TILE_URL, MAP_ATTRIBUTION } from "@/components/maps/map-tiles";
import type { GeoPoint } from "@/lib/dummy-data/locations";

function FitBounds({ points }: { points: GeoPoint[] }) {
  const map = useMap();
  React.useEffect(() => {
    const bounds = L.latLngBounds(points.map((p): [number, number] => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [36, 36], maxZoom: 14 });
  }, [map, points]);
  return null;
}

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function technicianIcon(color: string, name: string) {
  return L.divIcon({
    className: "fieldpro-map-marker",
    html: `<span style="background:${color}">${initialsFrom(name)}</span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -34],
  });
}

const customerIcon = L.divIcon({
  className: "fieldpro-map-pin",
  html: `<span></span>`,
  iconSize: [26, 26],
  iconAnchor: [13, 26],
  popupAnchor: [0, -28],
});

export interface JobLocationMapProps {
  customerLocation: GeoPoint;
  customerName: string;
  /** Omitted when the work order has no assigned technician yet — the map
      then just centers on the customer with a single pin. */
  technicianLocation?: GeoPoint;
  technicianName?: string;
  technicianColor?: string;
  /** "you" for the technician's own mobile view, "assigned" for the desktop
      dispatcher/admin view looking at someone else's location. */
  technicianLabel?: "you" | "assigned";
  height?: number;
}

export function JobLocationMap({
  customerLocation,
  customerName,
  technicianLocation,
  technicianName,
  technicianColor,
  technicianLabel = "you",
  height = 200,
}: JobLocationMapProps) {
  const isDark = useIsDarkMode();
  const hasTechnician = Boolean(technicianLocation && technicianName && technicianColor);
  const center = technicianLocation ?? customerLocation;

  return (
    <div
      className={`overflow-hidden rounded-lg border border-border ${isDark ? "fieldpro-map-dark" : ""}`}
      style={{ height }}
    >
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        zoomControl={false}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url={MAP_TILE_URL} attribution={MAP_ATTRIBUTION} />
        {hasTechnician && technicianLocation && technicianName && technicianColor ? (
          <Marker position={[technicianLocation.lat, technicianLocation.lng]} icon={technicianIcon(technicianColor, technicianName)}>
            <Popup>{technicianName} {technicianLabel === "you" ? "(you)" : ""}</Popup>
          </Marker>
        ) : null}
        <Marker position={[customerLocation.lat, customerLocation.lng]} icon={customerIcon}>
          <Popup>{customerName}</Popup>
        </Marker>
        {hasTechnician && technicianLocation ? <FitBounds points={[technicianLocation, customerLocation]} /> : null}
      </MapContainer>
    </div>
  );
}
