import { WORK_ORDERS, type WorkOrder } from "@/lib/dummy-data/work-orders";

export type CustomerType = "commercial" | "residential";
export type CustomerStatus = "active" | "inactive";

export interface CustomerContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  primary: boolean;
}

export interface CustomerAddress {
  id: string;
  label: string;
  address: string;
  primary: boolean;
}

export interface Customer {
  id: string;
  name: string;
  type: CustomerType;
  status: CustomerStatus;
  addresses: CustomerAddress[];
  contacts: CustomerContact[];
  customerSince: string; // ISO date
  notes: string;
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function emailFor(customerName: string) {
  const slug = customerName.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 12);
  return `ops@${slug}.com`;
}

function phoneForCustomer(id: string) {
  const digits = id.replace(/\D/g, "").padStart(4, "0").slice(-4);
  return `(555) 020-${digits}`;
}

/** One fully hand-curated customer (also the Work Order Details hero
    customer, WO-2024-00318) for the portfolio screenshot; every other
    customer derives a plausible-but-simpler profile below. */
const HERO_CUSTOMER: Customer = {
  id: "cust-acme-facilities",
  name: "Acme Facilities Inc.",
  type: "commercial",
  status: "active",
  addresses: [
    { id: "addr-acme-1", label: "Main Office", address: "1204 Industrial Pkwy", primary: true },
    { id: "addr-acme-2", label: "East Wing Warehouse", address: "1220 Industrial Pkwy", primary: false },
  ],
  contacts: [
    { id: "con-acme-1", name: "Devon Marsh", role: "Facilities Director", phone: "(555) 010-2291", email: "facilities@acme.com", primary: true },
    { id: "con-acme-2", name: "Elena Ruiz", role: "Office Manager", phone: "(555) 010-2292", email: "eruiz@acme.com", primary: false },
  ],
  customerSince: "2022-03-14",
  notes: "Quarterly HVAC preventive maintenance contract (recurring). Preferred technician: Maria Chen.",
};

interface DerivedSeed {
  name: string;
  address: string;
  contactName: string;
  role: string;
  since: string;
  status?: CustomerStatus;
}

const DERIVED_SEEDS: DerivedSeed[] = [
  { name: "Union Coffee Co.", address: "22 Union Sq", contactName: "Sam Delgado", role: "Owner", since: "2023-06-02" },
  { name: "Northgate Mall", address: "500 Northgate Dr", contactName: "Patricia Nguyen", role: "Property Manager", since: "2021-11-19" },
  { name: "Downtown Office Tower", address: "1 Downtown Plz", contactName: "Michael Chen", role: "Building Engineer", since: "2022-08-07" },
  { name: "Riverside Clinic", address: "88 Riverside Ave", contactName: "Angela Foster", role: "Practice Manager", since: "2024-01-23", status: "inactive" },
  { name: "Bright Start Daycare", address: "77 Maple St", contactName: "Rachel Kim", role: "Director", since: "2023-02-11" },
  { name: "Lakeside Apartments", address: "45 Lakeside Dr", contactName: "Tom Reyes", role: "Property Manager", since: "2021-05-30" },
  { name: "Green Valley School", address: "12 Green Valley Rd", contactName: "Linda Osei", role: "Facilities Coordinator", since: "2022-09-15" },
  { name: "Harbor View Hotel", address: "300 Harbor View Rd", contactName: "James Whitfield", role: "Chief Engineer", since: "2020-12-04" },
  { name: "Pinecrest Offices", address: "9 Pinecrest Ave", contactName: "Nora Bianchi", role: "Office Administrator", since: "2023-10-27" },
  { name: "Cedar Ridge Apartments", address: "14 Cedar Ridge Ln", contactName: "Carlos Mendez", role: "Property Manager", since: "2024-04-09", status: "inactive" },
  { name: "Metro Bank Branch", address: "200 Main St", contactName: "Susan Blake", role: "Branch Manager", since: "2022-01-16" },
  { name: "Sunrise Senior Living", address: "55 Sunrise Blvd", contactName: "Priya Nair", role: "Administrator", since: "2023-07-21" },
];

function deriveCustomer(seed: DerivedSeed): Customer {
  const id = `cust-${slugify(seed.name)}`;
  return {
    id,
    name: seed.name,
    type: "commercial",
    status: seed.status ?? "active",
    addresses: [{ id: `${id}-addr-1`, label: "Main", address: seed.address, primary: true }],
    contacts: [
      {
        id: `${id}-con-1`,
        name: seed.contactName,
        role: seed.role,
        phone: phoneForCustomer(id),
        email: emailFor(seed.name),
        primary: true,
      },
    ],
    customerSince: seed.since,
    notes: "",
  };
}

export const CUSTOMERS: Customer[] = [HERO_CUSTOMER, ...DERIVED_SEEDS.map(deriveCustomer)];

export function getCustomer(id: string): Customer | null {
  return CUSTOMERS.find((c) => c.id === id) ?? null;
}

export function getCustomerByName(name: string): Customer | null {
  return CUSTOMERS.find((c) => c.name === name) ?? null;
}

export function getPrimaryContact(customer: Customer): CustomerContact | null {
  return customer.contacts.find((c) => c.primary) ?? customer.contacts[0] ?? null;
}

export function getPrimaryAddress(customer: Customer): CustomerAddress | null {
  return customer.addresses.find((a) => a.primary) ?? customer.addresses[0] ?? null;
}

export function getCustomerWorkOrders(customerName: string): WorkOrder[] {
  return WORK_ORDERS.filter((w) => w.customerName === customerName);
}

export interface CustomerStats {
  openWorkOrders: number;
  totalJobs: number;
  totalSpend: number;
  lastServiceDate: string | null;
}

export function getCustomerStats(customerName: string): CustomerStats {
  const jobs = getCustomerWorkOrders(customerName);
  const openWorkOrders = jobs.filter((w) => !["paid", "cancelled"].includes(w.status)).length;
  const totalSpend = jobs.reduce((sum, w) => sum + w.total, 0);
  const lastServiceDate = jobs.length > 0 ? jobs.map((w) => w.scheduledDate).sort().at(-1)! : null;
  return { openWorkOrders, totalJobs: jobs.length, totalSpend, lastServiceDate };
}
