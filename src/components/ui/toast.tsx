"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toastBus, type ToastEvent, type ToastVariant } from "@/lib/toast-bus";

const VARIANT_META: Record<
  ToastVariant,
  { icon: typeof CheckCircle2; accent: string; iconColor: string; autoDismissMs: number | null }
> = {
  success: { icon: CheckCircle2, accent: "bg-success", iconColor: "text-success", autoDismissMs: 5000 },
  info: { icon: Info, accent: "bg-info", iconColor: "text-info", autoDismissMs: 5000 },
  warning: { icon: AlertTriangle, accent: "bg-warning", iconColor: "text-warning", autoDismissMs: 8000 },
  error: { icon: XCircle, accent: "bg-error", iconColor: "text-error", autoDismissMs: null },
};

/** Mount once in the root layout. Subscribes to the RxJS toast bus and renders. */
function Toaster() {
  const [toasts, setToasts] = React.useState<ToastEvent[]>([]);

  React.useEffect(() => {
    const sub = toastBus.subscribe((event) => {
      setToasts((prev) => [...prev, event]);
    });
    return () => sub.unsubscribe();
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {toasts.map((t) => {
        const meta = VARIANT_META[t.variant];
        const Icon = meta.icon;
        return (
          <ToastPrimitive.Root
            key={t.id}
            duration={meta.autoDismissMs ?? Infinity}
            onOpenChange={(open) => {
              if (!open) dismiss(t.id);
            }}
            className={cn(
              "relative flex items-start gap-3 overflow-hidden rounded-md border border-border bg-surface-elevated py-3 pl-4 pr-3 shadow-md",
              "data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-2 data-[state=open]:fade-in-0",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
              "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]"
            )}
          >
            <span className={cn("absolute inset-y-0 left-0 w-[3px]", meta.accent)} aria-hidden />
            <Icon className={cn("mt-0.5 size-4 shrink-0", meta.iconColor)} />
            <div className="flex-1 min-w-0">
              <ToastPrimitive.Title className="text-sm font-medium text-text-primary">
                {t.title}
              </ToastPrimitive.Title>
              {t.description ? (
                <ToastPrimitive.Description className="mt-0.5 text-[13px] text-text-secondary">
                  {t.description}
                </ToastPrimitive.Description>
              ) : null}
              {t.action ? (
                <ToastPrimitive.Action asChild altText={t.action.label}>
                  <button
                    onClick={t.action.onClick}
                    className="mt-2 text-[13px] font-medium text-primary-text hover:underline"
                  >
                    {t.action.label}
                  </button>
                </ToastPrimitive.Action>
              ) : null}
            </div>
            <ToastPrimitive.Close className="rounded-sm text-text-muted transition-colors hover:text-text-primary">
              <X className="size-4" />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        );
      })}
      <ToastPrimitive.Viewport
        style={{ zIndex: "var(--z-toast)", top: "calc(var(--header-height) + 16px)" }}
        className="fixed right-4 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col gap-2 outline-none"
      />
    </ToastPrimitive.Provider>
  );
}

export { Toaster };
