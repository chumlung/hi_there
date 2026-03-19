import React from "react";

const NAV_LINKS = [
  { href: "#about", id: "about", label: "About" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#blogs", id: "blogs", label: "Blogs" },
  { href: "#contact", id: "contact", label: "Contact" },
];

const LINE_COLOR = "#1e3a8a"; // blue-900
const NAV_OFFSET_PX = 72;

function MenuIcon({ open }) {
  return (
    <span className="relative block h-5 w-6" aria-hidden>
      <span
        className={`absolute left-0 top-0 h-[2px] w-full bg-current transition-transform duration-200 ease-out ${
          open ? "translate-y-[9px] rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[9px] h-[2px] w-full bg-current transition-opacity duration-200 ease-out ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 top-[18px] h-[2px] w-full bg-current transition-transform duration-200 ease-out ${
          open ? "-translate-y-[9px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

function KebabIcon({ open }) {
  return (
    <span className="flex flex-col items-center justify-center gap-0.5 h-5 w-5" aria-hidden>
      <span
        className={`h-1 w-1 rounded-full bg-current transition-transform duration-200 ease-out ${
          open ? "-translate-y-[3px]" : ""
        }`}
      />
      <span
        className={`h-1 w-1 rounded-full bg-current transition-opacity duration-200 ease-out ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`h-1 w-1 rounded-full bg-current transition-transform duration-200 ease-out ${
          open ? "translate-y-[3px]" : ""
        }`}
      />
    </span>
  );
}

export default function Navbar({
  activeSection,
  sectionProgress = {},
  onNavigate,
  variant = "desktop",
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isHeroActive = activeSection == null;

  const scrollToSection = React.useCallback((id) => {
    if (typeof window === "undefined") return;
    const container =
      document.querySelector('[data-scroll-root="true"]') ?? window;
    const el = document.getElementById(id);
    if (!el) return;
    if (container instanceof Window) {
      const rect = el.getBoundingClientRect();
      const targetY = rect.top + window.scrollY - NAV_OFFSET_PX;
      window.scrollTo({ top: targetY, behavior: "smooth" });
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    const offset = rect.top - containerRect.top + container.scrollTop;
    container.scrollTo({
      top: offset - NAV_OFFSET_PX,
      behavior: "smooth",
    });
  }, []);

  if (variant === "mobile") {
    return (
      <nav className="fixed top-0 inset-x-0 z-50 lg:hidden" aria-label="Main navigation">
        <div className="bg-white/90 backdrop-blur border-b border-slate-200">
          <div className="px-4 py-3 flex items-center justify-between">
            <a
              href="#hero"
              className="font-display text-xl text-blue-700"
              aria-label="Home"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("hero");
                onNavigate?.("hero");
                setMobileOpen(false);
              }}
            >
              CL
            </a>

            <button
              type="button"
              className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              <KebabIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="px-4 pb-3">
            <div className="mt-1 rounded-2xl bg-slate-100/90 backdrop-blur shadow-lg border border-slate-300/70">
              <ul className="py-2 px-2 text-sm font-semibold text-slate-800">
                {NAV_LINKS.map(({ href, id, label }) => {
                  const isActive = activeSection === id;
                  return (
                    <li key={href}>
                      <button
                        type="button"
                        className={`w-full text-left px-4 py-2 flex items-center gap-3 rounded-xl transition-colors ${
                          isActive
                            ? "bg-white text-blue-700 shadow-sm"
                            : "hover:bg-white/70 active:bg-white"
                        }`}
                        onClick={() => {
                          const targetId = href.replace("#", "");
                          onNavigate?.(id);
                          scrollToSection(targetId);
                          setMobileOpen(false);
                        }}
                      >
                        <span>{label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </nav>
    );
  }

  if (variant === "tablet") {
    return (
      <nav className="fixed top-0 inset-x-0 z-50 hidden md:flex lg:hidden" aria-label="Main navigation">
        <div className="w-full px-6 py-3 flex items-center justify-between bg-white/90 backdrop-blur border-b border-slate-200">
          <a
            href="#hero"
            className="font-display text-xl text-blue-700"
            aria-label="Hero"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("hero");
              onNavigate?.("hero");
            }}
          >
            CL
          </a>
          <ul className="flex items-center gap-5 text-sm font-semibold text-slate-800">
            {NAV_LINKS.map(({ href, id, label }) => {
              const isActive = activeSection === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={`py-1 px-2 rounded-full transition-colors ${
                      isActive ? "text-blue-700 bg-slate-100" : "hover:text-blue-700"
                    }`}
                    onClick={(event) => {
                      event.preventDefault();
                      const sectionId = href.replace("#", "");
                      onNavigate?.(id);
                      scrollToSection(sectionId);
                    }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }

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
