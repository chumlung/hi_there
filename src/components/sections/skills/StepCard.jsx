export default function StepCard({ number, title, description, iconSrc, iconAlt }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="truncate font-bold text-blue-700">{number}. {title}</div>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
          <img src={iconSrc} alt={iconAlt} className="h-5 w-5 object-contain" />
        </div>
      </div>
      <div className="text-sm text-slate-600">{description}</div>
    </div>
  );
}

