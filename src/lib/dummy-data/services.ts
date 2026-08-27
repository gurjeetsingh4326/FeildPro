export type ServiceCategory = "HVAC" | "Electrical" | "Plumbing" | "Refrigeration" | "Fire & Safety" | "General";
export type ServiceStatus = "active" | "inactive";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "HVAC",
  "Electrical",
  "Plumbing",
  "Refrigeration",
  "Fire & Safety",
  "General",
];

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  estimatedHours: number;
  basePrice: number;
  status: ServiceStatus;
}

export const SERVICES: Service[] = [
  {
    id: "svc-hvac-pm",
    name: "HVAC Preventive Maintenance",
    category: "HVAC",
    description: "Filter replacement, coil cleaning, refrigerant check, and belt inspection.",
    estimatedHours: 1.5,
    basePrice: 180,
    status: "active",
  },
  {
    id: "svc-hvac-duct",
    name: "HVAC Duct Cleaning",
    category: "HVAC",
    description: "Full duct system cleaning and airflow inspection.",
    estimatedHours: 2,
    basePrice: 220,
    status: "active",
  },
  {
    id: "svc-boiler-maintenance",
    name: "Boiler Maintenance",
    category: "HVAC",
    description: "Boiler inspection, pressure test, and efficiency tune-up.",
    estimatedHours: 2,
    basePrice: 260,
    status: "active",
  },
  {
    id: "svc-ac-repair",
    name: "AC Unit Repair",
    category: "HVAC",
    description: "Diagnose and repair a non-cooling or underperforming AC unit.",
    estimatedHours: 1.5,
    basePrice: 200,
    status: "active",
  },
  {
    id: "svc-electrical-panel",
    name: "Electrical Panel Inspection",
    category: "Electrical",
    description: "Full panel inspection for code compliance and load safety.",
    estimatedHours: 1,
    basePrice: 150,
    status: "active",
  },
  {
    id: "svc-electrical-rewiring",
    name: "Electrical Rewiring",
    category: "Electrical",
    description: "Rewire a room, unit, or panel circuit to current code.",
    estimatedHours: 3,
    basePrice: 420,
    status: "active",
  },
  {
    id: "svc-plumbing-emergency",
    name: "Emergency Plumbing Repair",
    category: "Plumbing",
    description: "Urgent leak, burst pipe, or fixture repair.",
    estimatedHours: 1.5,
    basePrice: 190,
    status: "active",
  },
  {
    id: "svc-water-heater",
    name: "Water Heater Replacement",
    category: "Plumbing",
    description: "Remove and replace an existing water heater unit.",
    estimatedHours: 2.5,
    basePrice: 650,
    status: "active",
  },
  {
    id: "svc-refrigeration-service",
    name: "Refrigeration Unit Service",
    category: "Refrigeration",
    description: "Routine service for a commercial refrigeration unit.",
    estimatedHours: 1.5,
    basePrice: 175,
    status: "active",
  },
  {
    id: "svc-walk-in-freezer",
    name: "Walk-in Freezer Repair",
    category: "Refrigeration",
    description: "Diagnose and repair a walk-in freezer or cooler.",
    estimatedHours: 2,
    basePrice: 310,
    status: "active",
  },
  {
    id: "svc-fire-suppression",
    name: "Fire Suppression Inspection",
    category: "Fire & Safety",
    description: "Annual fire suppression system inspection and certification.",
    estimatedHours: 1,
    basePrice: 140,
    status: "active",
  },
  {
    id: "svc-alarm-system",
    name: "Alarm System Service",
    category: "Fire & Safety",
    description: "Alarm system diagnostics, testing, and battery replacement.",
    estimatedHours: 1,
    basePrice: 130,
    status: "active",
  },
  {
    id: "svc-generator",
    name: "Backup Generator Service",
    category: "General",
    description: "Backup generator inspection, load test, and fluid service.",
    estimatedHours: 2,
    basePrice: 280,
    status: "active",
  },
  {
    id: "svc-general-call",
    name: "General Maintenance Call",
    category: "General",
    description: "Catch-all service call for issues outside the standard catalog.",
    estimatedHours: 1,
    basePrice: 95,
    status: "inactive",
  },
];

export function getService(id: string): Service | null {
  return SERVICES.find((s) => s.id === id) ?? null;
}
