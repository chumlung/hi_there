import { skills } from '../data/resume'

export default function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 bg-coffee-50 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-coffee-900 mb-8 sm:mb-12">
          Technical Skills
        </h2>
        <p className="text-coffee-600 text-sm sm:text-base mb-8 sm:mb-12 max-w-2xl">
          I value clean architecture, modern tooling, and thoughtful implementation.
        </p>
        <div className="space-y-8 sm:space-y-10">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs sm:text-sm font-semibold text-coffee-500 uppercase tracking-wider mb-3 sm:mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-coffee-100 border border-coffee-200 text-coffee-700 text-xs sm:text-sm font-medium shadow-sm hover:border-coffee-300 hover:bg-coffee-200/60 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
