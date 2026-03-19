import { developmetLifeCycle, skills } from "@src/data/resume";
import SectionWrapper from "@components/common/SectionWrapper";
import StepCard from "@components/sections/skills/StepCard";
import HorizontalCardStackWheel from "@components/common/HorizontalCardStackWheel";

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
          While my expertise is in Javascript,
          <span className="font-semibold">
            &nbsp;I am comfortable learning and working with other stacks.
          </span>
        </p>
        <p className="text-blue-700 font-semibold">
          As a team lead, I have enjoyed
        </p>
        <div className="mt-2">
          <HorizontalCardStackWheel
            items={developmetLifeCycle}
            heightPx={120}
            renderItem={({ title, description, icon }, idx) => (
              <StepCard
                number={idx + 1}
                title={title}
                description={description}
                iconSrc={`${baseUrl}assets/icons/${icon}`}
                iconAlt={icon}
              />
            )}
          />
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
            {items.map((item) => {
              const { label: skillLabel, logoUrl } = item;
              let logoSrc = null;
              if (logoUrl) {
                if (logoUrl.startsWith("http") || logoUrl.startsWith("/")) {
                  logoSrc = logoUrl;
                } else {
                  logoSrc = `${baseUrl}${logoUrl.replace(/^\//, "")}`;
                }
              }

              return (
                <span
                  key={skillLabel}
                  className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 bg-blue-100 text-slate-800 text-xs sm:text-sm font-medium"
                >
                  {logoSrc ? (
                    <img
                      src={logoSrc}
                      alt={`${skillLabel} logo`}
                      className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white object-contain p-1"
                    />
                  ) : (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white">
                      {skillLabel[0]}
                    </span>
                  )}
                  <span>{skillLabel}</span>
                </span>
              );
            })}
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
    />
  );
}
