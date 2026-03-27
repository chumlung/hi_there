import { resolveIconPath } from "@src/utils/iconPath";

export default function LabelPill({ label, logoUrl }) {
  const logoSrc = logoUrl ? resolveIconPath(logoUrl) : null;

  return (
    <span className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 border border-blue-700 bg-blue-50 text-slate-800 text-xs sm:text-sm font-medium">
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={`${label} logo`}
          className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white object-contain p-1"
        />
      ) : (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white">
          {label[0]}
        </span>
      )}
      <span>{label}</span>
    </span>
  );
}
