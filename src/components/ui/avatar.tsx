"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full bg-chip-bg text-chip-text",
  {
    variants: {
      size: {
        sm: "size-6 text-[11px]",
        md: "size-8 text-[13px]",
        lg: "size-10 text-sm",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  /** Initials fallback, e.g. "JD" — derived from name if not given. */
  name?: string;
}

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, size, src, alt, name, ...props }, ref) => (
    <AvatarPrimitive.Root ref={ref} className={cn(avatarVariants({ size, className }))} {...props}>
      {src ? <AvatarPrimitive.Image src={src} alt={alt ?? name ?? ""} className="aspect-square size-full object-cover" /> : null}
      <AvatarPrimitive.Fallback
        className="flex size-full items-center justify-center font-medium"
        delayMs={src ? 400 : 0}
      >
        {name ? initialsFrom(name) : "?"}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
);
Avatar.displayName = "Avatar";

/** Overlapping avatar group — e.g. technicians assigned, comment participants. */
function AvatarStack({
  people,
  size = "sm",
  max = 4,
  className,
}: {
  people: { name: string; src?: string }[];
  size?: VariantProps<typeof avatarVariants>["size"];
  max?: number;
  className?: string;
}) {
  const shown = people.slice(0, max);
  const overflow = people.length - shown.length;
  return (
    <div className={cn("flex items-center -space-x-2", className)}>
      {shown.map((person, i) => (
        <Avatar
          key={i}
          size={size}
          name={person.name}
          src={person.src}
          className="ring-2 ring-surface"
        />
      ))}
      {overflow > 0 ? (
        <span
          className={cn(
            avatarVariants({ size }),
            "flex items-center justify-center bg-surface-sunken text-text-secondary font-medium ring-2 ring-surface"
          )}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}

export { Avatar, AvatarStack, avatarVariants };
