import { Wrench } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="mb-8 flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-md bg-primary text-white">
          <Wrench className="size-[18px]" />
        </span>
        <span className="text-lg font-semibold tracking-tight text-text-primary">FieldPro</span>
      </div>
      <div className="w-full max-w-[400px]">{children}</div>
    </div>
  );
}
