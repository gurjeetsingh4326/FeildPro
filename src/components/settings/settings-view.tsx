import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CompanyProfileTab } from "@/components/settings/company-profile-tab";
import { PreferencesTab } from "@/components/settings/preferences-tab";
import { NotificationsTab } from "@/components/settings/notifications-tab";

export function SettingsView() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <Tabs defaultValue="company">
        <TabsList>
          <TabsTrigger value="company">Company Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="company" className="max-w-2xl">
          <CompanyProfileTab />
        </TabsContent>
        <TabsContent value="preferences" className="max-w-2xl">
          <PreferencesTab />
        </TabsContent>
        <TabsContent value="notifications" className="max-w-2xl">
          <NotificationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
