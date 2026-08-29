/** Fictional lat/lng for the map feature, anchored around Portland, OR to
    match Settings' Company Profile address (1500 Meridian Ave, Portland, OR
    97201) — the only real city reference established anywhere in the app.
    No geocoding service exists yet (Phase 6), so these are hand-placed, not
    derived from the street-only addresses in customers.ts/parts.ts. */

export interface GeoPoint {
  lat: number;
  lng: number;
}

export const COMPANY_LOCATION: GeoPoint = { lat: 45.5152, lng: -122.6784 };

/* Deliberately offset a few blocks from the nearest customer they're "near"
   (not identical to it) — a technician's live position is realistically
   never pixel-identical to the customer's address pin, and two markers
   sitting exactly on top of each other would hide one on the map. */
export const TECHNICIAN_LOCATIONS: Record<string, GeoPoint> = {
  "tech-1": { lat: 45.5268, lng: -122.6812 }, // Maria Chen — a few blocks from Acme Facilities
  "tech-2": { lat: 45.5278, lng: -122.6845 }, // Sam Torres — a few blocks from Northgate Mall
  "tech-3": { lat: 45.5085, lng: -122.6365 }, // Dana Lee — a few blocks from Riverside Clinic
  "tech-4": { lat: 45.5443, lng: -122.6584 }, // Jordan Park — N Portland
  "tech-5": { lat: 45.5122, lng: -122.6982 }, // Alex Kim — SW Portland
  "tech-6": { lat: 45.5489, lng: -122.6209 }, // Chris Nguyen — NE Portland (on leave)
};

export const CUSTOMER_LOCATIONS: Record<string, GeoPoint> = {
  "Acme Facilities Inc.": { lat: 45.5231, lng: -122.6765 },
  "Union Coffee Co.": { lat: 45.5185, lng: -122.6753 },
  "Northgate Mall": { lat: 45.5312, lng: -122.689 },
  "Downtown Office Tower": { lat: 45.5152, lng: -122.6784 },
  "Riverside Clinic": { lat: 45.5044, lng: -122.6321 },
  "Bright Start Daycare": { lat: 45.539, lng: -122.665 },
  "Lakeside Apartments": { lat: 45.495, lng: -122.71 },
  "Green Valley School": { lat: 45.478, lng: -122.66 },
  "Harbor View Hotel": { lat: 45.558, lng: -122.67 },
  "Pinecrest Offices": { lat: 45.509, lng: -122.725 },
  "Cedar Ridge Apartments": { lat: 45.562, lng: -122.61 },
  "Metro Bank Branch": { lat: 45.521, lng: -122.66 },
  "Sunrise Senior Living": { lat: 45.485, lng: -122.645 },
};

export function getTechnicianLocation(technicianId: string): GeoPoint {
  return TECHNICIAN_LOCATIONS[technicianId] ?? COMPANY_LOCATION;
}

export function getCustomerLocation(customerName: string): GeoPoint {
  return CUSTOMER_LOCATIONS[customerName] ?? COMPANY_LOCATION;
}

/** Straight-line distance in miles — good enough for a "N.N mi away" label,
    not turn-by-turn routing (no routing service exists yet). */
export function distanceMiles(a: GeoPoint, b: GeoPoint): number {
  const R = 3958.8;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
}
