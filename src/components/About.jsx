import { summary } from '../data/resume'

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 scroll-mt-20 bg-coffee-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-coffee-900 mb-6 sm:mb-8">
          About Me
        </h2>
        <div className="text-coffee-600 text-sm sm:text-base leading-relaxed space-y-4">
          {summary.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
