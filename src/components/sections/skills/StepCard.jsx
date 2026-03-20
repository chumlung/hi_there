export default function StepCard({
  number,
  title,
  description,
  iconSrc,
  iconAlt,
  borderAccentClass = "border-blue-500",
}) {
  const n = String(number).padStart(2, "0");

  return (
    <div
      className={`w-full max-w-[min(100%,17rem)] min-w-0 overflow-hidden rounded-md bg-white px-2.5 py-1.5 shadow-sm border-x-0 border-t-0 border-b-2 ${borderAccentClass}`}
    >
      <div className="flex min-w-0 items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-baseline gap-1.5">
          <span className="shrink-0 text-[9px] font-bold tabular-nums tracking-tight text-slate-700">
            {n}
          </span>
          <h3 className="min-w-0 flex-1 text-xs font-semibold leading-tight text-blue-800 sm:text-[13px]">
            {title}
          </h3>
        </div>
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-50">
          <img
            src={iconSrc}
            alt={iconAlt}
            className="h-3.5 w-3.5 max-h-full max-w-full object-contain"
          />
        </div>
      </div>
      <p className="mt-1 min-w-0 text-[11px] leading-snug text-slate-600 sm:text-xs">
        {description}
      </p>
    </div>
  );
}
