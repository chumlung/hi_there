import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@src/data/resume";
import { pillIcons, resumePdf, resumePdfHref } from "@src/data/pillIcons";
import SectionWrapper from "@components/common/SectionWrapper";
import PillButton from "@components/common/PillButton";
import ProjectCard from "@sections/projects/ProjectCard";
import CardStack from "@components/common/CardStack";
import useElementSize from "@src/hooks/useElementSize";

export default function Projects({
  ratio = 0,
  offset = 0,
  stackProgress = 0,
  mode = "desktop",
}) {
  const [stackRef, stackSize] = useElementSize();
  const availableWidth = stackSize.width || 480;
  const cardWidth = Math.max(280, Math.min(Math.floor(availableWidth), 480));
  const isMobile = mode === "mobile";

  const [viewportHeight, setViewportHeight] = useState(() => {
    if (typeof window === "undefined") return 0;
    return window.innerHeight;
  });

  useEffect(() => {
    if (!isMobile) return;
    const onResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isMobile]);

  const NAVBAR_HEIGHT_PX = 56; // matches mobile navbar padding + line-height
  const mobileAvailableHeight = Math.max(0, viewportHeight - NAVBAR_HEIGHT_PX - 24);

  const cardHeight = isMobile
    ? Math.max(420, Math.min(Math.round(mobileAvailableHeight * 0.78), 620))
    : Math.max(320, Math.round(cardWidth * 0.94));

  const stackOffset = isMobile
    ? 22
    : Math.max(24, Math.round(cardWidth * (40 / 480)));

  const widthStep = isMobile
    ? 18
    : Math.max(18, Math.round(cardWidth * (30 / 480)));

  const heightStep = isMobile
    ? 12
    : Math.max(12, Math.round(cardWidth * (20 / 480)));

  const [mobileProgress, setMobileProgress] = useState(0);

  const effectiveProgress = isMobile ? mobileProgress : stackProgress;

  const progressStepDivisor = useMemo(() => (isMobile ? 320 : 1500), [isMobile]);

  const stackScrollRef = useRef(null);
  const scrollRangeRef = useRef(0);

  const transitions = useMemo(() => Math.max(projects.length - 1, 1), []);

  useEffect(() => {
    if (!isMobile) return;
    const node = stackScrollRef.current;
    if (!node) return;

    const update = () => {
      const maxScroll = Math.max(1, node.scrollHeight - node.clientHeight);
      scrollRangeRef.current = maxScroll;
      const next = Math.max(0, Math.min(node.scrollTop / maxScroll, 1));
      setMobileProgress(next);
    };

    update();
    node.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      node.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isMobile, transitions, progressStepDivisor]);

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
        I have an empathetic approach to a project and it's requirements.
      </p>
      <p className="text-blue-700 font-semibold">
        I believe a project means more than the codebase, it's encompasses the user experience, timely delivery and longetivity of the product.
        </p>
      </div>
      <div className="flex flex-wrap gap-6 items-center pt-1 m-2">
        <PillButton
          iconPath={pillIcons.resume}
          label="Resume"
          href={resumePdfHref()}
          download={resumePdf.downloadFilename}
        />
      </div>
    </div>
  );

  const right = (
    <div ref={stackRef} className="w-full min-w-0">
      {isMobile ? (
        <div
          ref={stackScrollRef}
          className="w-full overflow-y-auto touch-pan-y rounded-3xl"
          style={{ height: `${cardHeight + stackOffset * 3}px` }}
        >
          <div
            style={{
              height: `${cardHeight + stackOffset * 3 + (projects.length - 1) * (cardHeight * 0.55)}px`,
            }}
          >
            <div className="sticky top-0">
              <CardStack
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                stackOffset={stackOffset}
                widthStep={widthStep}
                heightStep={heightStep}
                stackProgress={effectiveProgress}
              >
                {projects.map((project) => (
                  <ProjectCard
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
          </div>
        </div>
      ) : (
        <CardStack
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          stackOffset={stackOffset}
          widthStep={widthStep}
          heightStep={heightStep}
          stackProgress={effectiveProgress}
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
      sectionClassName="bg-white !overflow-visible"
      mode={mode}
    />
  );
}
