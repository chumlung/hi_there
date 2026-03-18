import { projects } from "@src/data/resume";
import SectionWrapper from "@components/common/SectionWrapper";
import Card from "@sections/projects/ProjectCard";
import CardStack from "@components/common/CardStack";

export default function Projects({ ratio = 0, offset = 0, stackProgress = 0 }) {
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
    <CardStack
      cardWidth={480}
      cardHeight={450}
      stackOffset={40}
      widthStep={30}
      heightStep={20}
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
