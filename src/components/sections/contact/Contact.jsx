import { social } from "@src/data/resume";
import { pillIcons, resumePdf, resumePdfHref } from "@src/data/pillIcons";
import SectionWrapper from "@components/common/SectionWrapper";
import PillButton from "@components/common/PillButton";

export default function Contact({ ratio = 0, offset = 0, mode = "desktop" }) {
  const left = (
    <div>
      <div className="inline-flex flex-col mb-4 sm:mb-6">
        <h2 className="type-sectionTitle text-blue-50">
          <span className="text-blue-700">Let's build something together</span>
        </h2>
        <span className="mt-1 h-1 w-16 rounded-full bg-blue-400" />
      </div>
      <div className="text-slate-700 text-sm sm:text-base space-y-4">
      <p>
        If you have a project in mind, or just want to chat about a potential collaboration, please feel free to reach out.
      </p>
      <p className="text-blue-700 font-semibold">
        I&apos;m more than happy to contribute with new features, improve existing ones or drive a project from ideation to deployment.
      </p>
      </div>
    </div>
  );

  const right = (
    <div className="flex flex-wrap gap-6 items-center">
      <PillButton
        iconPath={pillIcons.linkedin}
        label="LinkedIn"
        href={social.linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
      />
      <PillButton iconPath={pillIcons.email} label="Email" href={`mailto:${social.email}`} />
      <PillButton
        iconPath={pillIcons.resume}
        label="Resume"
        href={resumePdfHref()}
        download={resumePdf.downloadFilename}
      />
    </div>
  );

  return (
    <SectionWrapper
      id="contact"
      left={left}
      right={right}
      ratio={ratio}
      offset={offset}
      mode={mode}
    />
  );
}
