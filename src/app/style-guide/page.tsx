import { ClipboardList, DollarSign, Users, Wrench } from "lucide-react";
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
      <div className={cnBox(className)} />
      <span className="text-[13px] text-text-secondary">{name}</span>
    </div>
  );
}

function cnBox(bg: string) {
  return `h-14 w-full rounded-md border border-border ${bg}`;
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
            <Input id="disabled-field" value="WO-2024-00318" disabled />
          </div>
        </div>
      </Section>

      <Section title="KPI cards">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
    </div>
  );
}
