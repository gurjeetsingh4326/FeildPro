import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  inputSize?: "sm" | "md";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error = false, inputSize = "md", disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        disabled={disabled}
        className={cn(
          "w-full rounded-md border bg-surface px-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors",
          "focus:border-primary focus:ring-2 focus:ring-primary/20",
          inputSize === "sm" ? "h-8" : "h-9",
          error ? "border-error focus:border-error focus:ring-error/20" : "border-border",
          disabled && "cursor-not-allowed bg-surface-sunken text-text-disabled",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("mb-1.5 block text-sm font-medium text-text-primary", className)}
      {...props}
    />
  );
}

function FieldError({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("mt-1.5 text-[13px] text-error", className)} {...props} />
  );
}

function FieldHelperText({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("mt-1.5 text-[13px] text-text-muted", className)} {...props} />
  );
}

export { Input, Label, FieldError, FieldHelperText };
