import SectionWrapper from "./SectionWrapper";

export default function About({ ratio = 0, offset = 0 }) {
  const baseUrl = import.meta.env.BASE_URL;
  const left = (
    <div>
      <div className="inline-flex flex-col mb-6 sm:mb-8">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-slate-900">
          <span className="text-blue-700">About Me</span>
        </h2>
        <span className="mt-1 h-1 w-16 rounded-full bg-blue-400" />
      </div>
      <div className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
        <p>I am a full stack engineer from the mountains of Nepal, starting my journey in 2018.</p>
        <p className="text-slate-800">
          I treat every feature as a long-term investment. 
          <p className="text-blue-700 font-semibold text-lg sm:text-xl md:text-2xl">To me, &apos;done&apos; means
          it&apos;s secure, resilient against edge cases, and—most
          importantly—clean for the next developer to pick up without a
          headache.</p> 
        </p>
        <p>
          When you don&apos;t see me pushing features, I&apos;m probably pushing
          joystick buttons or enjoying some coffee with my friends.
        </p>
      </div>
    </div>
  );

  const right = (
    <div className="flex items-center justify-center">
      <img
        src={`${baseUrl}about-hero.png`}
        alt="Developer working on a laptop with mountain view"
        className="max-h-[260px] w-auto rounded-2xl object-contain"
      />
    </div>
  );

  return (
    <SectionWrapper
      id="about"
      left={left}
      right={right}
      ratio={ratio}
      offset={offset}
      sectionClassName="bg-white"
    />
  );
}
