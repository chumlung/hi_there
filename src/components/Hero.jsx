export default function Hero() {
  return (
    <section className="md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-10 md:pb-16 bg-coffee-50">
      <p className="text-coffee-500 text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">
        Designer, Full Stack Developer & Technical Leader
      </p>
      <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-coffee-900 text-center leading-tight mb-4 sm:mb-6">
        I design and code beautifully simple things, and I love what I do.
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-coffee-600 text-center max-w-2xl">
        Hi, I'm Chumlung. Nice to meet you.
      </p>
      <a
        href="#about"
        className="mt-8 sm:mt-12 inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-coffee-900 text-coffee-50 text-xs sm:text-sm font-medium hover:bg-coffee-800 transition-colors"
      >
        Say Hello
      </a>
    </section>
  )
}
