"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CustomerDetailHeader } from "@/components/customer-detail/customer-detail-header";
import { CustomerOverviewTab } from "@/components/customer-detail/customer-overview-tab";
import { CustomerContactsTab } from "@/components/customer-detail/customer-contacts-tab";
import { CustomerAddressesTab } from "@/components/customer-detail/customer-addresses-tab";
import { CustomerHistoryTab } from "@/components/customer-detail/customer-history-tab";
import { CustomerRightRail } from "@/components/customer-detail/customer-right-rail";
import { getCustomerStats } from "@/lib/dummy-data/customers";
import type { Customer, CustomerContact, CustomerAddress } from "@/lib/dummy-data/customers";
import type { WorkOrder } from "@/lib/dummy-data/work-orders";

export function CustomerDetailView({ initial, workOrders }: { initial: Customer; workOrders: WorkOrder[] }) {
  const [contacts, setContacts] = React.useState<CustomerContact[]>(initial.contacts);
  const [addresses, setAddresses] = React.useState<CustomerAddress[]>(initial.addresses);

  const stats = getCustomerStats(initial.name);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <CustomerDetailHeader customer={initial} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <CustomerOverviewTab customer={initial} />
            </TabsContent>
            <TabsContent value="contacts">
              <CustomerContactsTab
                contacts={contacts}
                onAddContact={(contact) => setContacts((prev) => [...prev, contact])}
                onRemoveContact={(id) => setContacts((prev) => prev.filter((c) => c.id !== id))}
              />
            </TabsContent>
            <TabsContent value="addresses">
              <CustomerAddressesTab
                addresses={addresses}
                onAddAddress={(address) => setAddresses((prev) => [...prev, address])}
                onRemoveAddress={(id) => setAddresses((prev) => prev.filter((a) => a.id !== id))}
              />
            </TabsContent>
            <TabsContent value="history">
              <CustomerHistoryTab workOrders={workOrders} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="xl:col-span-1">
          <CustomerRightRail customer={initial} stats={stats} />
        </div>
      </div>
    </div>
  );
}
