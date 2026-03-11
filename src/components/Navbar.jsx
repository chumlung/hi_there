export default function Navbar() {
  const links = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#blogs', label: 'Blogs' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
        <a
          href="#"
          className="font-display text-lg sm:text-xl text-slate-900 hover:text-blue-600 transition-colors shrink-0"
        >
          CL
        </a>
        <ul className="flex gap-3 sm:gap-5 md:gap-8 flex-1 justify-end min-w-0">
          {links.map(({ href, label }) => (
            <li key={href} className="shrink-0">
              <a
                href={href}
                className="text-[11px] sm:text-xs md:text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
