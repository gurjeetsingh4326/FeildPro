import { Subject } from "rxjs";

export type ToastVariant = "success" | "warning" | "error" | "info";

export interface ToastEvent {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export type ToastInput = Omit<ToastEvent, "id">;

/** Global toast bus — components call `toast(...)`; <Toaster/> (mounted once
    in the root layout) subscribes and renders. Avoids prop-drilling a toast
    context through every form/action that needs to report a result. */
export const toastBus = new Subject<ToastEvent>();

let counter = 0;

export function toast(input: ToastInput) {
  counter += 1;
  toastBus.next({ id: `toast-${Date.now()}-${counter}`, ...input });
}
