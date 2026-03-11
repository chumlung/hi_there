import { projects } from '../data/resume'

export default function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 scroll-mt-20 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-slate-900 mb-3 sm:mb-4">
          Recent Work
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mb-8 sm:mb-12">
          Here are a few past projects I've worked on.
        </p>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.name}
              className="group rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-3">
                <h3 className="font-semibold text-base sm:text-lg text-slate-900">{project.name}</h3>
                <span className="text-xs text-slate-500 sm:whitespace-nowrap">
                  {project.dates}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mb-2">{project.role}</p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              {project.productUrl && (
                <a
                  href={project.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-500 underline underline-offset-2"
                >
                  Visit Website
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
