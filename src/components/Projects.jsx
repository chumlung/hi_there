import { useState } from "react";
import { projects } from "../data/resume";
import SectionWrapper from "./SectionWrapper";

function highlightText(text, phrases = []) {
  let parts = [text];

  phrases.forEach((phrase, phraseIndex) => {
    if (!phrase) return;
    const nextParts = [];

    parts.forEach((part) => {
      if (typeof part !== "string") {
        nextParts.push(part);
        return;
      }

      const split = part.split(phrase);
      split.forEach((chunk, i) => {
        if (chunk) {
          nextParts.push(chunk);
        }
        if (i < split.length - 1) {
          nextParts.push(
            <span
              key={`${phrase}-${phraseIndex}-${i}`}
              className="text-blue-700 font-semibold"
            >
              {phrase}
            </span>,
          );
        }
      });
    });

    parts = nextParts;
  });

  return parts;
}

export default function Projects({ ratio = 0, offset = 0 }) {
  const [activeProject, setActiveProject] = useState(null);

  const left = (
    <div className="space-y-6 sm:space-y-8">
      <div className="inline-flex flex-col mb-4 sm:mb-6">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-slate-900">
          <span className="text-blue-700">Work Highlights</span>
        </h2>
        <span className="mt-1 h-1 w-16 rounded-full bg-blue-400" />
      </div>
      <div className="text-sm sm:text-base leading-relaxed text-slate-700 space-y-4">
      <p>
        Here are some of the highlights from the projects I have worked on.
      </p>
      <p className="text-blue-700 font-semibold">
        I believe a project goes beyond the codebase, it's about the user experience, the business requirements and the team.
        </p>
      </div>
    </div>
  );

  const right = (
    <div
      className="relative h-full flex flex-col space-y-4 sm:space-y-6"
      onMouseLeave={() => setActiveProject(null)}
    >
      <div className="relative grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 p-2">
        {projects.map((project) => {
          const isActive = activeProject?.name === project.name;

          return (
            <article
              key={project.name}
              onMouseEnter={() => setActiveProject(project)}
              className={
                "relative rounded-2xl border shadow-sm px-3 py-3 sm:px-4 sm:py-4 max-w-[250px] max-h-[200px] overflow-hidden transition-all duration-200 ease-out cursor-pointer " +
                (isActive
                  ? "border-blue-400 bg-blue-100 shadow-lg scale-[1.04]"
                  : "border-slate-200 bg-white/80")
              }
            >
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <div className="flex flex-col">
                <h3 className="font-semibold text-sm sm:text-base text-slate-900">
                  {project.name}
                </h3>
                {project.industryDomain && (
                  <p className="text-[11px] text-slate-500">
                    {project.industryDomain}
                  </p>
                )}
              </div>
              {project.siteUrl && (
                <a
                  href={project.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                  aria-label={`Open ${project.name} website in new tab`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586L9.293 9.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              )}
            </div>
            <p className="text-slate-700 text-xs leading-snug mb-3">
              {project.description}
            </p>
            {Array.isArray(project.roles) && project.roles.length > 0 && (
              <p className="text-[11px] sm:text-xs text-blue-900 font-semibold mb-3">
                {project.roles.join(" | ")}
              </p>
            )}
            {Array.isArray(project.keyContributions) &&
              project.keyContributions.length > 0 && (
                <p className="text-[11px] text-slate-500">
                  + {project.keyContributions.length} key contributions
                </p>
              )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/95 to-transparent" />
          </article>
          );
        })}
      </div>

      {activeProject && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-20">
          <article
            className="pointer-events-auto max-w-[380px] max-h-[70vh] w-full rounded-2xl border-2 border-blue-300 bg-gradient-to-b from-blue-50 via-blue-50 to-blue-100 shadow-2xl px-6 py-5 overflow-y-auto"
            onMouseLeave={() => setActiveProject(null)}
          >
            <div className="flex items-baseline justify-between gap-3 mb-4">
              <div className="flex flex-col">
                <h3 className="font-semibold text-base sm:text-lg text-slate-900">
                  {activeProject.name}
                </h3>
                {activeProject.industryDomain && (
                  <p className="text-xs text-slate-500">
                    {activeProject.industryDomain}
                  </p>
                )}
              </div>
              {activeProject.siteUrl && (
                <a
                  href={activeProject.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                  aria-label={`Open ${activeProject.name} website in new tab`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586L9.293 9.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              )}
            </div>
            <p className="text-slate-700 text-sm leading-relaxed mb-3">
              {activeProject.description}
            </p>
            {Array.isArray(activeProject.roles) &&
              activeProject.roles.length > 0 && (
                <p className="text-xs sm:text-sm text-blue-900 font-semibold mb-4">
                  {activeProject.roles.join(" | ")}
                </p>
              )}
            {Array.isArray(activeProject.keyContributions) &&
              activeProject.keyContributions.length > 0 && (
                <ul className="list-disc list-inside text-sm text-slate-700 space-y-1.5">
                  {activeProject.keyContributions.map(
                    (contribution, index) => (
                      <li key={index}>
                        {highlightText(
                          contribution.title,
                          contribution.highlightPhrases,
                        )}
                      </li>
                    ),
                  )}
                </ul>
              )}
          </article>
        </div>
      )}
    </div>
  );

  return (
    <SectionWrapper
      id="projects"
      left={left}
      right={right}
      ratio={ratio}
      offset={offset}
      sectionClassName="bg-white"
    />
  );
}
