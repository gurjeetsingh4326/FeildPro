"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/lib/toast-bus";
import { NOTIFICATION_PREFERENCES, type NotificationPreferences } from "@/lib/dummy-data/settings";

const ROWS: { key: keyof NotificationPreferences; label: string; description: string }[] = [
  { key: "workOrderAssigned", label: "Work order assigned", description: "Notify a technician when a work order is assigned to them." },
  { key: "invoiceOverdue", label: "Invoice overdue", description: "Notify accountants when an invoice becomes overdue." },
  { key: "paymentReceived", label: "Payment received", description: "Notify accountants when a customer payment is recorded." },
  { key: "lowStockAlert", label: "Low stock alert", description: "Notify admins when a part drops to or below its reorder threshold." },
];

export function NotificationsTab() {
  const [prefs, setPrefs] = React.useState<NotificationPreferences>(NOTIFICATION_PREFERENCES);

  function handleToggle(key: keyof NotificationPreferences, label: string) {
    setPrefs((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      toast({ variant: "info", title: `${label} ${next[key] ? "enabled" : "disabled"}` });
      return next;
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <div className="divide-y divide-border">
        {ROWS.map((row) => (
          <div key={row.key} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-text-primary">{row.label}</p>
              <p className="text-[13px] text-text-muted">{row.description}</p>
            </div>
            <Switch
              checked={prefs[row.key]}
              onCheckedChange={() => handleToggle(row.key, row.label)}
              aria-label={row.label}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
