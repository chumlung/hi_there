import { resolveIconPath } from "@src/utils/iconPath";

export default function PillButton({
  iconPath,
  label,
  href,
  download,
  target,
  rel,
}) {
  const externalProps =
    target != null ? { target, rel: rel ?? "noopener noreferrer" } : {};

  return (
    <a
      href={href}
      className={"inline-flex items-center gap-2 sm:gap-2.5 rounded-full px-4 py-2.5 sm:px-5 sm:py-3 bg-blue-700 text-white hover:scale-110 transition-all duration-300 ease-out"}
      download={download}
      {...externalProps}
    >
      <img
        src={resolveIconPath(iconPath)}
        alt=""
        className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 shrink-0 pointer-events-none select-none"
        draggable={false}
        aria-hidden
      />
      <span className="text-sm sm:text-base font-medium">{label}</span>
    </a>
  );
}
