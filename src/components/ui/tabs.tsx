"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

/* Underline style — page-level tabs (COMPONENT_GUIDELINES.md → Tabs). */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("flex items-center gap-6 border-b border-border", className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative -mb-px py-3 text-sm font-medium text-text-secondary transition-colors",
      "hover:text-text-primary",
      "data-[state=active]:text-text-primary",
      "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:bg-primary after:opacity-0 after:transition-opacity",
      "data-[state=active]:after:opacity-100",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-t-sm",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("pt-4 focus-visible:outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

/* Segmented / pill style — compact in-card toggles (e.g. chart range switch). */
const TabsPillList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("inline-flex items-center gap-1 rounded-md bg-surface-sunken p-1", className)}
    {...props}
  />
));
TabsPillList.displayName = "TabsPillList";

const TabsPillTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "rounded-[calc(var(--radius-md)-2px)] px-3 py-1 text-[13px] font-medium text-text-secondary transition-colors",
      "data-[state=active]:bg-surface data-[state=active]:text-text-primary data-[state=active]:shadow-xs",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
      className
    )}
    {...props}
  />
));
TabsPillTrigger.displayName = "TabsPillTrigger";

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsPillList, TabsPillTrigger };
