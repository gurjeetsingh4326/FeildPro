import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Always pass an explicit locale to toLocaleString() for money — omitting it
    uses the runtime's default locale, which server-side is whatever the host
    environment reports (not necessarily en-US), so the same number can render
    with a different digit-grouping style (e.g. 9,51,700 instead of 951,700)
    depending on where this renders. Every currency figure in the app should
    go through this helper instead of calling toLocaleString() directly. */
export function formatMoney(value: number, options?: Intl.NumberFormatOptions) {
  return value.toLocaleString("en-US", options);
}
