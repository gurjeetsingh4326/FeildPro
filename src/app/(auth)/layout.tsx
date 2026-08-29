import { Wrench } from "lucide-react";
import { AuthVisualPanel } from "@/components/auth/auth-visual-panel";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AuthVisualPanel />
      <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-background px-4 py-12">
        {/* Only shown below `lg`, where the visual panel is hidden — the panel
            carries its own logo for wide viewports. */}
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-white">
            <Wrench className="size-[18px]" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-text-primary">FieldPro</span>
        </div>
        <div className="w-full max-w-[400px]">{children}</div>
      </div>
    </div>
  );
}
