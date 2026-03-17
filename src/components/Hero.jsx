import SectionWrapper from "./SectionWrapper";

export default function Hero({ ratio = 1, offset = 0 }) {
  const baseUrl = import.meta.env.BASE_URL;

  const left = (
    <div className="flex flex-col items-start text-left max-w-2xl">
      <p className="text-sm sm:text-base md:text-lg text-slate-700 mb-4 sm:mb-6">
        Hi, I&apos;m Chumlung. Nice to meet you.
      </p>
      <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-slate-900 leading-tight mb-3 sm:mb-4">
        <span className="block text-slate-700">I love building products</span>
        <span className="block text-blue-700">
          users love and developers enjoy maintaining.
        </span>
      </h1>
    </div>
  );

  const right = (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex-shrink-0 flex items-center justify-center">
      <img
        src={`${baseUrl}hero-doodle.png`}
        alt="Chumlung - thinking"
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </div>
  );

  return (
    <SectionWrapper
      id="hero"
      left={left}
      right={right}
      ratio={ratio}
      offset={offset}
      sectionClassName="pt-20 md:pt-24"
    />
  );
}
