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
          <main className="scrollbar-thin flex flex-1 flex-col overflow-y-auto">
            {/* Caps content width so it doesn't stretch full-bleed on ultra-wide
                monitors — every page gets this for free instead of each having
                to opt in (docs/RESPONSIVE_DESIGN.md's 2xl row calls this out). */}
            <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col">{children}</div>
          </main>
        </div>
      </div>
    </RoleProvider>
  );
}
