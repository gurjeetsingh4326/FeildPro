"use client";

import * as React from "react";

/** Tailwind's default breakpoints, as min-widths. */
const BREAKPOINTS = { md: 768, xl: 1280 } as const;

export type Breakpoint = "mobile" | "tablet" | "xl";

/**
 * JS-level breakpoint detection for cases where CSS alone isn't enough —
 * specifically, components that register into a global keyed registry (like
 * dnd-kit's droppables) can't just be CSS-hidden at multiple responsive
 * variants: `display:none` doesn't unmount them, so duplicate copies stay
 * registered under the same id and corrupt collision detection. Use this to
 * render exactly one variant instead of several parallel `hidden md:block`
 * blocks. For everything else, prefer plain Tailwind responsive classes.
 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>("xl");

  React.useEffect(() => {
    const mqXl = window.matchMedia(`(min-width: ${BREAKPOINTS.xl}px)`);
    const mqMd = window.matchMedia(`(min-width: ${BREAKPOINTS.md}px)`);

    function update() {
      if (mqXl.matches) setBreakpoint("xl");
      else if (mqMd.matches) setBreakpoint("tablet");
      else setBreakpoint("mobile");
    }

    update();
    mqXl.addEventListener("change", update);
    mqMd.addEventListener("change", update);
    return () => {
      mqXl.removeEventListener("change", update);
      mqMd.removeEventListener("change", update);
    };
  }, []);

  return breakpoint;
}
