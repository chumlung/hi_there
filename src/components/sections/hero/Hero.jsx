import SectionWrapper from "@components/common/SectionWrapper";

export default function Hero({
  ratio = 1,
  offset = 0,
  mode = "desktop",
  mobileGridClassName,
}) {
  const baseUrl = import.meta.env.BASE_URL;

  const left = (
    <div className="flex flex-col items-start text-left max-w-2xl">
      <p className="type-heroIntro mb-4 sm:mb-6">
        Hi, I&apos;m <span className="text-blue-700">Chumlung</span>. Nice to meet you.
      </p>
      <h1 className="type-heroTitle mb-3 sm:mb-4">
        <span className="block text-slate-700">I love building products</span>
        <span className="block text-blue-700">
          users love
          <span className="block text-slate-700">&</span>
          developers enjoy maintaining.
        </span>
      </h1>
    </div>
  );

  const right = (
    <div className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 flex-shrink-0 rounded-3xl overflow-hidden bg-gradient-to-t from-gray-100 to-white shadow-sm flex items-center justify-center">
      <img
        src={`${baseUrl}chumlung_limbu.png`}
        alt="Chumlung Limbu profile picture"
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
      mode={mode}
      mobileGridClassName={mobileGridClassName}
      sectionClassName="pt-8 md:pt-0 lg:pt-24"
    />
  );
}
