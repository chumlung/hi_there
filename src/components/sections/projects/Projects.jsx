import { projects } from "@src/data/resume";
import SectionWrapper from "@components/common/SectionWrapper";
import Card from "@sections/projects/ProjectCard";
import CardStack from "@components/common/CardStack";
import useElementSize from "@src/hooks/useElementSize";

export default function Projects({ ratio = 0, offset = 0, stackProgress = 0 }) {
  const [stackRef, stackSize] = useElementSize();
  const availableWidth = stackSize.width || 480;
  const cardWidth = Math.max(280, Math.min(Math.floor(availableWidth), 480));
  const cardHeight = Math.max(320, Math.round(cardWidth * 0.94));
  const stackOffset = Math.max(24, Math.round(cardWidth * (40 / 480)));
  const widthStep = Math.max(18, Math.round(cardWidth * (30 / 480)));
  const heightStep = Math.max(12, Math.round(cardWidth * (20 / 480)));

  const left = (
    <div className="space-y-6 sm:space-y-8">
      <div className="inline-flex flex-col mb-4 sm:mb-6">
        <h2 className="type-sectionTitle">
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
    <div ref={stackRef} className="w-full min-w-0">
      <CardStack
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        stackOffset={stackOffset}
        widthStep={widthStep}
        heightStep={heightStep}
        stackProgress={stackProgress}
      >
        {projects.map((project) => (
          <Card
            key={project.name}
            name={project.name}
            roles={project.roles}
            description={project.description}
            industryDomain={project.industryDomain}
            siteUrl={project.siteUrl}
            keyContributions={project.keyContributions}
          />
        ))}
      </CardStack>
    </div>
  );

  return (
    <SectionWrapper
      id="projects"
      left={left}
      right={right}
      ratio={ratio}
      offset={offset}
      sectionClassName="bg-white !overflow-visible"
    />
  );
}
