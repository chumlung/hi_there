const NAV_LINKS = [
  { href: "#about", id: "about", label: "About" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#blogs", id: "blogs", label: "Blogs" },
  { href: "#contact", id: "contact", label: "Contact" },
];

const LINE_COLOR = "#1e3a8a"; // blue-900

export default function Navbar({
  activeSection,
  sectionProgress = {},
  onNavigate,
}) {
  const isHeroActive = activeSection == null;

  return (
    <nav
      className="hidden lg:flex flex-col items-start justify-center h-full"
      aria-label="Main navigation"
    >
      <a
        href="#"
        className={`font-display text-2xl xl:text-4xl transition-colors mb-4 xl:mb-6 ${
          isHeroActive ? "text-blue-700" : "text-slate-900 hover:text-blue-700"
        }`}
        aria-label="Home"
        aria-current={isHeroActive ? "page" : undefined}
        onClick={(event) => {
          event.preventDefault();
          onNavigate?.("hero");
        }}
      >
        CL
      </a>

      <ul className="flex flex-col gap-1.5">
        {NAV_LINKS.map(({ href, id, label }) => {
          const progress = sectionProgress[id] ?? 0;
          const isActive = activeSection === id;

          return (
            <li key={href} className="relative">
              <a
                href={href}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate?.(id);
                }}
                className={`relative inline-block text-sm xl:text-lg font-semibold whitespace-nowrap transition-colors py-0.5 ${
                  isActive ? "text-blue-700" : "text-slate-800 hover:text-blue-600"
                }`}
              >
                {label}
                <span
                  className="absolute left-0 bottom-0 h-[2px] bg-blue-900 transition-all duration-300 ease-out origin-left"
                  style={{ width: `${progress * 100}%` }}
                  aria-hidden
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
