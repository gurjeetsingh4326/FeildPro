import { RoleProvider } from "@/lib/role-context";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header />
          <main className="scrollbar-thin flex flex-1 flex-col overflow-y-auto">{children}</main>
        </div>
      </div>
    </RoleProvider>
  );
}
