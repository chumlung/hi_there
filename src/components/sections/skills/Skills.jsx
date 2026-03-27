import { developmetLifeCycle, skills } from "@src/data/resume";
import SectionWrapper from "@components/common/SectionWrapper";
import LabelPill from "@components/common/LabelPill";
import DevelopmentTimeline from "@components/sections/skills/DevelopmentTimeline";

export default function Skills({ ratio = 0, offset = 0, mode = "desktop" }) {
  const baseUrl = import.meta.env.BASE_URL;
  const left = (
    <div>
      <div className="inline-flex flex-col mb-4 sm:mb-6">
        <h2 className="type-sectionTitle">
          <span className="text-blue-700">Skills</span>
        </h2>
        <span className="mt-1 h-1 w-16 rounded-full bg-blue-400" />
      </div>
      <div className="text-sm sm:text-base leading-relaxed space-y-4 text-slate-800">
        <p>
          For full stack development, my core expertise is in JavaScript and TypeScript.
        </p>
        <p className="text-blue-700 font-semibold">
          Beyond code, I thrive in
        </p>
        <div className="mt-4">
          <DevelopmentTimeline items={developmetLifeCycle} baseUrl={baseUrl} />
        </div>
      </div>
    </div>
  );

  const right = (
    <div className="space-y-4">
      {skills.map(({ heading, label, items }) => (
        <div key={heading} className="space-y-2">
          <h3 className="text-xs font-semibold tracking-wide text-blue-700 uppercase">
            {label}
          </h3>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <LabelPill key={item.label} label={item.label} logoUrl={item.logoUrl} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <SectionWrapper
      id="skills"
      left={left}
      right={right}
      ratio={ratio}
      offset={offset}
      sectionClassName="bg-slate-50"
      mode={mode}
      lgTwoColumnClass="lg:grid-cols-[0.45fr_0.55fr]"
    />
  );
}
