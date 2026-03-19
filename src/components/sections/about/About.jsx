import SectionWrapper from "@components/common/SectionWrapper";

export default function About({ ratio = 0, offset = 0, mode = "desktop" }) {
  const baseUrl = import.meta.env.BASE_URL;
  const left = (
    <div>
      <div className="inline-flex flex-col mb-6 sm:mb-8">
        <h2 className="type-sectionTitle">
          <span className="text-blue-700">About Me</span>
        </h2>
        <span className="mt-1 h-1 w-16 rounded-full bg-blue-400" />
      </div>
      <div className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
        <p>I am a full stack engineer from the mountains of Nepal, starting my journey in 2018. And oddly-I am more of a beach person.</p>
          <p className="text-blue-700 font-semibold">
          I treat every feature as a long-term investment. <br />
          To me, &apos;done&apos; means
          it&apos;s secure, resilient against edge cases, and—most
          importantly—clean for the next developer to pick up without a
          headache.</p> 
      </div>
    </div>
  );

  const right = (
    <div className="flex items-center justify-center">
      <img
        src={`${baseUrl}laptop_mountain.png`}
        alt="Laptop with mountain view"
        className="max-h-[220px] sm:max-h-[260px] lg:max-h-[300px] w-auto rounded-2xl object-contain"
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
      mode={mode}
    />
  );
}
