"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { TECHNICIANS } from "@/lib/dummy-data/schedule";

export interface AssignTechnicianDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTechnicianName: string | null;
  onAssign: (technicianName: string) => void;
}

export function AssignTechnicianDrawer({
  open,
  onOpenChange,
  currentTechnicianName,
  onAssign,
}: AssignTechnicianDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Assign Technician</DrawerTitle>
          <DrawerDescription>Pick a technician for this work order.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="space-y-2">
          {TECHNICIANS.map((tech) => {
            const isCurrent = tech.name === currentTechnicianName;
            return (
              <button
                key={tech.id}
                type="button"
                onClick={() => onAssign(tech.name)}
                className="flex w-full items-center gap-3 rounded-md border border-border p-3 text-left transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Avatar name={tech.name} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text-primary">{tech.name}</p>
                  <p className="text-[13px] text-text-muted">{isCurrent ? "Currently assigned" : "Available"}</p>
                </div>
                <span className="size-2.5 rounded-full" style={{ backgroundColor: tech.color }} aria-hidden />
              </button>
            );
          })}
        </DrawerBody>
        <DrawerFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
