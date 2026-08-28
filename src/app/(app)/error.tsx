"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Route-segment error boundary for the (app) group — the documented
    "Error loading" empty state (docs/UI_PATTERNS.md): AlertTriangle icon,
    warning tint, "Couldn't load [entity]" message, Retry action. Next.js
    requires this to be a Client Component. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-20 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-warning-bg text-warning">
        <AlertTriangle className="size-6" />
      </span>
      <h2 className="text-lg font-semibold text-text-primary">Couldn&apos;t load this page</h2>
      <p className="max-w-sm text-sm text-text-secondary">
        Something went wrong while loading this content. Try again, or head back to the Dashboard.
      </p>
      <Button onClick={reset} className="mt-2 gap-1.5">
        <RotateCcw className="size-4" />
        Retry
      </Button>
    </div>
  );
}
