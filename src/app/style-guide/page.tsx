"use client";

import * as React from "react";
import {
  ClipboardList,
  DollarSign,
  Users,
  Wrench,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, PriorityBadge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input, Label, FieldError, FieldHelperText } from "@/components/ui/input";
import { KpiCard } from "@/components/ui/kpi-card";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectSeparator,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  SortableTableHead,
  type SortDirection,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsPillList, TabsPillTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarStack } from "@/components/ui/avatar";
import { SimpleTooltip } from "@/components/ui/tooltip";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/lib/toast-bus";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      {children}
    </section>
  );
}

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-14 w-full rounded-md border border-border ${className}`} />
      <span className="text-[13px] text-text-secondary">{name}</span>
    </div>
  );
}

const WORK_ORDERS = [
  { id: "WO-2024-00318", customer: "Acme Facilities Inc.", tech: "Maria Chen", status: "In Progress" as const, priority: "high" as const, total: 1240 },
  { id: "WO-2024-00317", customer: "Northgate Mall", tech: "Sam Torres", status: "Scheduled" as const, priority: "medium" as const, total: 480 },
  { id: "WO-2024-00316", customer: "Riverside Clinic", tech: "Dana Lee", status: "Completed" as const, priority: "urgent" as const, total: 2100 },
  { id: "WO-2024-00315", customer: "Union Coffee Co.", tech: "Maria Chen", status: "Overdue" as const, priority: "low" as const, total: 150 },
];

function statusBadgeVariant(status: (typeof WORK_ORDERS)[number]["status"]) {
  switch (status) {
    case "Completed":
      return "success" as const;
    case "In Progress":
      return "primary" as const;
    case "Scheduled":
      return "info" as const;
    case "Overdue":
      return "error" as const;
  }
}

function InteractiveDemos() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [sort, setSort] = React.useState<SortDirection>(null);

  return (
    <>
      <Section title="Select">
        <Select defaultValue="maria">
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="Assign technician" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Available today</SelectLabel>
              <SelectItem value="maria">Maria Chen</SelectItem>
              <SelectItem value="sam">Sam Torres</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Fully booked</SelectLabel>
              <SelectItem value="dana" disabled>
                Dana Lee — 6 jobs today
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Section>

      <Section title="Tabs">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="labor">Labor & Parts</TabsTrigger>
            <TabsTrigger value="notes">Notes & Attachments</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="text-sm text-text-secondary">
            Underline-style page tabs — used on Work Order Details.
          </TabsContent>
          <TabsContent value="labor" className="text-sm text-text-secondary">
            Labor & parts line items go here.
          </TabsContent>
          <TabsContent value="notes" className="text-sm text-text-secondary">
            Notes & attachments go here.
          </TabsContent>
          <TabsContent value="timeline" className="text-sm text-text-secondary">
            Audit trail goes here.
          </TabsContent>
        </Tabs>

        <Tabs defaultValue="pill-7">
          <TabsPillList className="w-fit">
            <TabsPillTrigger value="pill-7">7d</TabsPillTrigger>
            <TabsPillTrigger value="pill-30">30d</TabsPillTrigger>
            <TabsPillTrigger value="pill-90">90d</TabsPillTrigger>
          </TabsPillList>
        </Tabs>
      </Section>

      <Section title="Avatars">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Avatar name="Maria Chen" size="sm" />
            <Avatar name="Sam Torres" size="md" />
            <Avatar name="Dana Lee" size="lg" />
          </div>
          <AvatarStack
            size="md"
            people={[
              { name: "Maria Chen" },
              { name: "Sam Torres" },
              { name: "Dana Lee" },
              { name: "Alex Kim" },
              { name: "Jordan Park" },
            ]}
          />
        </div>
      </Section>

      <Section title="Tooltip">
        <SimpleTooltip label="Dark chip style — consistent in both themes">
          <Button variant="secondary">Hover me</Button>
        </SimpleTooltip>
      </Section>

      <Section title="Table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>WO #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Technician</TableHead>
              <SortableTableHead
                className="text-right"
                direction={sort}
                onSort={() =>
                  setSort((prev) => (prev === null ? "asc" : prev === "asc" ? "desc" : null))
                }
              >
                Total
              </SortableTableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {WORK_ORDERS.map((wo) => (
              <TableRow key={wo.id}>
                <TableCell className="font-mono text-text-secondary">{wo.id}</TableCell>
                <TableCell className="font-medium">{wo.customer}</TableCell>
                <TableCell>
                  <PriorityBadge priority={wo.priority}>{wo.priority}</PriorityBadge>
                </TableCell>
                <TableCell>
                  <Badge variant={statusBadgeVariant(wo.status)} dot>
                    {wo.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-text-secondary">{wo.tech}</TableCell>
                <TableCell className="text-right tabular-nums">
                  ${wo.total.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      <Section title="Skeleton (loading state)">
        <div className="grid gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-border bg-surface p-5 space-y-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Toast">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={() => toast({ variant: "success", title: "Work order updated", description: "WO-2024-00318 saved." })}
          >
            Success toast
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast({ variant: "warning", title: "Invoice overdue", description: "12 days past due." })}
          >
            Warning toast
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                variant: "error",
                title: "Couldn't reassign technician",
                description: "Network error — try again.",
                action: { label: "Retry", onClick: () => toast({ variant: "info", title: "Retrying…" }) },
              })
            }
          >
            Error toast (persists)
          </Button>
        </div>
      </Section>

      <Section title="Modal, Drawer & Confirm dialog">
        <div className="flex flex-wrap gap-2">
          <Modal open={modalOpen} onOpenChange={setModalOpen}>
            <ModalTrigger asChild>
              <Button variant="secondary">
                <Plus className="size-4" /> Open modal
              </Button>
            </ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>New Work Order</ModalTitle>
                <ModalDescription>Create a work order for an existing customer.</ModalDescription>
              </ModalHeader>
              <ModalBody className="space-y-4">
                <div>
                  <Label htmlFor="modal-customer">Customer</Label>
                  <Input id="modal-customer" placeholder="Search customers…" />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setModalOpen(false)}>Create Work Order</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="secondary">Open drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Assign Technician</DrawerTitle>
                <DrawerDescription>WO-2024-00318 — Acme Facilities Inc.</DrawerDescription>
              </DrawerHeader>
              <DrawerBody className="space-y-3">
                {["Maria Chen", "Sam Torres", "Dana Lee"].map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 rounded-md border border-border p-3"
                  >
                    <Avatar name={name} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">{name}</p>
                      <p className="text-[13px] text-text-muted">3 jobs today</p>
                    </div>
                  </div>
                ))}
              </DrawerBody>
              <DrawerFooter>
                <Button variant="secondary" onClick={() => setDrawerOpen(false)}>
                  Close
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            <Trash2 className="size-4" /> Delete customer
          </Button>
          <ConfirmDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            title="Delete this customer?"
            description="This removes their profile and service history. This cannot be undone."
            confirmLabel="Delete customer"
            destructive
            onConfirm={() => {
              setConfirmOpen(false);
              toast({ variant: "success", title: "Customer deleted" });
            }}
          />
        </div>
      </Section>
    </>
  );
}

export default function StyleGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 space-y-12">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            FieldPro
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Design System — Style Guide
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Live token & component check. Toggle theme to verify dark mode.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <Section title="Color — brand & status">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          <Swatch name="primary" className="bg-primary" />
          <Swatch name="accent" className="bg-accent" />
          <Swatch name="success" className="bg-success" />
          <Swatch name="warning" className="bg-warning" />
          <Swatch name="error" className="bg-error" />
          <Swatch name="info" className="bg-info" />
        </div>
      </Section>

      <Section title="Color — surfaces">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          <Swatch name="background" className="bg-background" />
          <Swatch name="surface" className="bg-surface" />
          <Swatch name="surface-sunken" className="bg-surface-sunken" />
          <Swatch name="border" className="bg-border" />
          <Swatch name="sidebar-bg" className="bg-sidebar-bg" />
        </div>
      </Section>

      <Section title="Typography">
        <div className="space-y-2">
          <p className="text-[36px] font-bold leading-10 tracking-tight text-text-primary">
            Display 36 / 700
          </p>
          <p className="text-2xl font-bold tracking-tight text-text-primary">
            Page title 24 / 700
          </p>
          <p className="text-lg font-semibold text-text-primary">Section title 18 / 600</p>
          <p className="text-base font-semibold text-text-primary">Card title 16 / 600</p>
          <p className="text-sm text-text-primary">Body 14 / 400 — the quick brown fox</p>
          <p className="text-sm font-medium text-text-primary">Body medium 14 / 500</p>
          <p className="text-[13px] text-text-secondary">Small 13 / 400</p>
          <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
            Caption 12 / 500 uppercase
          </p>
          <p className="tabular-nums text-3xl font-bold text-text-primary">
            $128,432.90 — KPI tabular-nums
          </p>
          <p className="font-mono text-sm text-text-secondary">WO-2024-00318 — mono</p>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="primary" loading>
            Saving
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral" dot>
            Draft
          </Badge>
          <Badge variant="info" dot>
            Scheduled
          </Badge>
          <Badge variant="primary" dot>
            In Progress
          </Badge>
          <Badge variant="warning" dot>
            On Hold
          </Badge>
          <Badge variant="success" dot>
            Completed
          </Badge>
          <Badge variant="error" dot>
            Overdue
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <PriorityBadge priority="low">Low</PriorityBadge>
          <PriorityBadge priority="medium">Medium</PriorityBadge>
          <PriorityBadge priority="high">High</PriorityBadge>
          <PriorityBadge priority="urgent">Urgent</PriorityBadge>
        </div>
      </Section>

      <Section title="Inputs">
        <div className="grid max-w-md gap-4">
          <div>
            <Label htmlFor="customer">Customer name</Label>
            <Input id="customer" placeholder="Acme Facilities Inc." />
            <FieldHelperText>As it appears on the invoice.</FieldHelperText>
          </div>
          <div>
            <Label htmlFor="email">Contact email</Label>
            <Input id="email" placeholder="ops@acme.com" error />
            <FieldError>Enter a valid email address.</FieldError>
          </div>
          <div>
            <Label htmlFor="disabled-field">Work order #</Label>
            <Input id="disabled-field" value="WO-2024-00318" disabled readOnly />
          </div>
        </div>
      </Section>

      <Section title="KPI cards">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Open Work Orders"
            value="42"
            icon={ClipboardList}
            delta={{ value: "8.2%", direction: "up" }}
          />
          <KpiCard
            label="Scheduled Today"
            value="16"
            icon={Users}
            delta={{ value: "2.1%", direction: "down", positiveIsGood: false }}
          />
          <KpiCard
            label="Revenue (MTD)"
            value="$128,432"
            icon={DollarSign}
            delta={{ value: "12.4%", direction: "up" }}
          />
          <KpiCard
            label="Avg. Resolution"
            value="3.4h"
            icon={Wrench}
            delta={{ value: "5.0%", direction: "down" }}
          />
        </div>
      </Section>

      <Section title="Cards">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
              <Badge variant="success" dot>
                Active
              </Badge>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Standard card — 12px radius, 20px padding, 1px border, no default shadow.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Elevated example</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>shadow-sm applied for comparison.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </Section>

      <InteractiveDemos />
    </div>
  );
}
