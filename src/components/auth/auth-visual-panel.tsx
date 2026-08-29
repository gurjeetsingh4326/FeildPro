import { Wrench, ClipboardList, Calendar, MapPin, HardHat, CheckCircle2, Boxes } from "lucide-react";
import { totalRevenue90d, FIRST_TIME_FIX_RATE_PCT, CSAT_SCORE } from "@/lib/dummy-data/reports";
import { formatMoney } from "@/lib/utils";

/** Scattered, low-opacity decorative icons — purely textural, never
    interactive or informational, so aria-hidden throughout. */
const SCATTERED_ICONS = [
  { Icon: Wrench, top: "12%", left: "78%", size: 28, rotate: -18, opacity: 0.12 },
  { Icon: ClipboardList, top: "68%", left: "84%", size: 34, rotate: 10, opacity: 0.1 },
  { Icon: Calendar, top: "22%", left: "10%", size: 26, rotate: 8, opacity: 0.1 },
  { Icon: MapPin, top: "82%", left: "18%", size: 30, rotate: -6, opacity: 0.14 },
  { Icon: HardHat, top: "45%", left: "88%", size: 24, rotate: 14, opacity: 0.1 },
  { Icon: Boxes, top: "58%", left: "6%", size: 22, rotate: -12, opacity: 0.1 },
];

function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-sm">
      <p className="text-lg font-bold tabular-nums text-white">{value}</p>
      <p className="text-[12px] text-white/60">{label}</p>
    </div>
  );
}

/** Split-auth-screen decorative panel — an abstract, on-brand illustration
    (gradient + blueprint-style grid + scattered field-service iconography)
    rather than a stock photo, since we can't fetch/guess external image
    URLs. Always dark, like the sidebar, regardless of the app's current
    light/dark setting — same rationale as --sidebar-bg. Real numbers
    pulled from the Reports module so the stat chips aren't invented. */
export function AuthVisualPanel() {
  const revenue = formatMoney(totalRevenue90d(), { notation: "compact", maximumFractionDigits: 1 });

  return (
    <div className="relative hidden w-full max-w-xl shrink-0 overflow-hidden bg-sidebar-bg lg:flex lg:flex-col lg:justify-between xl:max-w-2xl">
      {/* Gradient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 8% 0%, color-mix(in srgb, var(--primary) 55%, transparent) 0%, transparent 55%)," +
            "radial-gradient(100% 80% at 100% 100%, color-mix(in srgb, var(--chart-5) 45%, transparent) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      {/* Blueprint-style grid texture */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden>
        <defs>
          <pattern id="auth-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#auth-grid)" />
      </svg>

      {/* Scattered field-service iconography */}
      {SCATTERED_ICONS.map(({ Icon, top, left, size, rotate, opacity }, i) => (
        <Icon
          key={i}
          aria-hidden
          className="pointer-events-none absolute text-white"
          style={{ top, left, width: size, height: size, transform: `rotate(${rotate}deg)`, opacity }}
        />
      ))}

      <div className="relative flex flex-1 flex-col justify-between p-10 xl:p-14">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-white">
            <Wrench className="size-[18px]" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">FieldPro</span>
        </div>

        <div className="max-w-md">
          <h1 className="text-[32px] font-bold leading-[1.15] tracking-tight text-white xl:text-[38px]">
            Field service operations,
            <br />
            organized end to end.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/70">
            Dispatch, schedule, and invoice from one place — built for HVAC,
            electrical, plumbing, and commercial service teams.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-3">
            <StatChip value={`$${revenue}`} label="Revenue tracked (90d)" />
            <StatChip value={`${FIRST_TIME_FIX_RATE_PCT}%`} label="First-time fix rate" />
            <StatChip value={`${CSAT_SCORE.toFixed(1)}/5`} label="CSAT score" />
          </div>
          <p className="mt-4 flex items-center gap-1.5 text-[13px] text-white/50">
            <CheckCircle2 className="size-3.5 shrink-0" aria-hidden />
            Trusted by field service teams to run their day-to-day.
          </p>
        </div>
      </div>
    </div>
  );
}
