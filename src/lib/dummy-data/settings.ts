export interface CompanyProfile {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  taxId: string;
}

export const COMPANY_PROFILE: CompanyProfile = {
  name: "Meridian Field Services",
  address: "1500 Meridian Ave, Suite 300, Portland, OR 97201",
  phone: "(555) 040-1000",
  email: "ops@meridianfs.com",
  website: "www.meridianfs.com",
  taxId: "84-1234567",
};

export interface Preferences {
  timezone: string;
  dateFormat: string;
  /** Matches the $95/hr RATE constant already used across Work Order labor
      lines — Settings describes the existing default, doesn't drive it yet
      (no backend to read it from until Phase 6). */
  defaultLaborRate: number;
  /** Matches the 8% tax rate already used on the Sunrise Senior Living
      invoice example. */
  defaultTaxRatePct: number;
  /** Matches the 30-day terms already used by New Invoice / most due dates. */
  paymentTermsDays: number;
}

export const PREFERENCES: Preferences = {
  timezone: "America/Los_Angeles",
  dateFormat: "MM/DD/YYYY",
  defaultLaborRate: 95,
  defaultTaxRatePct: 8,
  paymentTermsDays: 30,
};

export interface NotificationPreferences {
  workOrderAssigned: boolean;
  invoiceOverdue: boolean;
  paymentReceived: boolean;
  lowStockAlert: boolean;
}

export const NOTIFICATION_PREFERENCES: NotificationPreferences = {
  workOrderAssigned: true,
  invoiceOverdue: true,
  paymentReceived: true,
  lowStockAlert: false,
};
