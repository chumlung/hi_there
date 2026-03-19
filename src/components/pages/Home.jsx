import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@sections/navbar";
import Hero from "@sections/hero";
import About from "@sections/about";
import Skills from "@sections/skills";
import Projects from "@sections/projects";
import Blogs from "@sections/blogs";
import Contact from "@sections/contact";

const SECTION_IDS = ["about", "skills", "projects", "blogs", "contact"];
const TRACK_IDS = ["hero", ...SECTION_IDS];
const PROJECTS_INDEX = 3;
const PROJECTS_STACK_SCROLL_SPAN = 1.7;
const MOBILE_MAX_WIDTH_PX = 767;
const TABLET_MIN_WIDTH_PX = 768;
const TABLET_MAX_WIDTH_PX = 1023;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function mapVirtualToSectionPosition(virtualIndex) {
  // Reserve extra virtual space between "projects" and "blogs" to keep
  // projects visible while the stack animates.
  if (virtualIndex <= PROJECTS_INDEX) {
    return virtualIndex;
  }
  if (virtualIndex < PROJECTS_INDEX + PROJECTS_STACK_SCROLL_SPAN) {
    return PROJECTS_INDEX;
  }
  return virtualIndex - (PROJECTS_STACK_SCROLL_SPAN - 1);
}

function computeRatios(position) {
  const maxIndex = TRACK_IDS.length - 1;
  const clamped = clamp(position, 0, maxIndex);
  const ratios = {};

  TRACK_IDS.forEach((id, index) => {
    const distance = Math.abs(index - clamped);
    // Non-overlapping fade: section is visible only when distance < 0.5,
    // and fully fades out before the next one starts fading in.
    const ratio = distance < 0.5 ? 1 - distance * 2 : 0;
    ratios[id] = ratio;
  });

  return ratios;
}

function getActiveSection(ratios) {
  let bestId = SECTION_IDS[0];
  let bestValue = ratios[bestId] ?? 0;

  SECTION_IDS.forEach((id) => {
    const value = ratios[id] ?? 0;
    if (value > bestValue) {
      bestId = id;
      bestValue = value;
    }
  });

  return bestId;
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`).matches;
  });
  const [isTablet, setIsTablet] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(
      `(min-width: ${TABLET_MIN_WIDTH_PX}px) and (max-width: ${TABLET_MAX_WIDTH_PX}px)`,
    ).matches;
  });
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [ratios, setRatios] = useState(() => computeRatios(0));
  const touchStartYRef = useRef(null);
  const [mobileActiveSection, setMobileActiveSection] = useState("hero");

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`);
    const tabletMedia = window.matchMedia(
      `(min-width: ${TABLET_MIN_WIDTH_PX}px) and (max-width: ${TABLET_MAX_WIDTH_PX}px)`,
    );
    const handleChange = (event) => setIsMobile(event.matches);
    const handleTabletChange = (event) => setIsTablet(event.matches);
    setIsMobile(media.matches);
    setIsTablet(tabletMedia.matches);
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handleChange);
      tabletMedia.addEventListener("change", handleTabletChange);
      return () => media.removeEventListener("change", handleChange);
    }
    media.addListener(handleChange);
    tabletMedia.addListener(handleTabletChange);
    return () => media.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (isMobile || isTablet) return;
    const maxIndex =
      TRACK_IDS.length - 1 + (PROJECTS_STACK_SCROLL_SPAN - 1);

    const handleWheel = (event) => {
      event.preventDefault();
      const delta = event.deltaY;
      const step = delta / 1500;

      setVirtualIndex((prev) => {
        const next = clamp(prev + step, 0, maxIndex);
        const sectionPosition = mapVirtualToSectionPosition(next);
        setRatios(computeRatios(sectionPosition));
        return next;
      });
    };

    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      touchStartYRef.current = touch.clientY;
    };

    const handleTouchMove = (event) => {
      if (touchStartYRef.current == null) return;
      const touch = event.touches[0];
      const deltaY = touchStartYRef.current - touch.clientY;
      const step = deltaY / 900;

      setVirtualIndex((prev) => {
        const next = clamp(prev + step, 0, maxIndex);
        const sectionPosition = mapVirtualToSectionPosition(next);
        setRatios(computeRatios(sectionPosition));
        return next;
      });

      touchStartYRef.current = touch.clientY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isMobile, isTablet]);

  const handleNavigate = useCallback((id) => {
    if (isMobile || isTablet) return;
    const index = TRACK_IDS.indexOf(id);
    if (index === -1) return;
    const virtualTarget =
      index <= PROJECTS_INDEX
        ? index
        : index + (PROJECTS_STACK_SCROLL_SPAN - 1);
    setVirtualIndex(virtualTarget);
    setRatios(computeRatios(index));
  }, []);

  useEffect(() => {
    if (!isMobile && !isTablet) return;
    const ids = ["hero", ...SECTION_IDS];
    const container =
      document.querySelector('[data-scroll-root="true"]') ?? window;
    const NAV_OFFSET_PX = 80;

    const updateActive = () => {
      let bestId = ids[0];
      let bestDist = Infinity;
      let containerTop = 0;

      if (!(container instanceof Window)) {
        const rect = container.getBoundingClientRect();
        containerTop = rect.top;
      }

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const top = rect.top - containerTop;
        const dist = Math.abs(top - NAV_OFFSET_PX);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = id;
        }
      });

      setMobileActiveSection(bestId);
    };

    updateActive();
    const options = { passive: true };
    if (container instanceof Window) {
      window.addEventListener("scroll", updateActive, options);
    } else {
      container.addEventListener("scroll", updateActive, options);
    }
    window.addEventListener("resize", updateActive, options);

    return () => {
      if (container instanceof Window) {
        window.removeEventListener("scroll", updateActive);
      } else {
        container.removeEventListener("scroll", updateActive);
      }
      window.removeEventListener("resize", updateActive);
    };
  }, [isMobile, isTablet]);

  if (isMobile) {
    return (
      <div
        className="h-screen bg-white overflow-x-hidden overflow-y-auto"
        data-scroll-root="true"
      >
        <Navbar
          variant="mobile"
          activeSection={mobileActiveSection}
          onNavigate={setMobileActiveSection}
        />
        <main className="px-4 pt-16 pb-10 space-y-10">
          <Hero mode="mobile" />
          <About mode="mobile" />
          <Skills mode="mobile" />
          <Projects mode="mobile" />
          <Blogs mode="mobile" />
          <Contact mode="mobile" />
        </main>
      </div>
    );
  }

  if (isTablet) {
    return (
      <div
        className="h-screen bg-white overflow-x-hidden overflow-y-auto"
        data-scroll-root="true"
      >
        <Navbar
          variant="tablet"
          activeSection={mobileActiveSection}
          onNavigate={setMobileActiveSection}
        />
        <main className="mx-8 pt-16 pb-10 space-y-10">
          <Hero
            mode="mobile"
            mobileGridClassName="grid-cols-1 md:grid-cols-2"
          />
          <About mode="mobile" />
          <Skills mode="mobile" />
          <Projects mode="mobile" />
          <Blogs mode="mobile" />
          <Contact mode="mobile" />
        </main>
      </div>
    );
  }

  const sectionProgress = {
    about: ratios.about ?? 0,
    skills: ratios.skills ?? 0,
    projects: ratios.projects ?? 0,
    blogs: ratios.blogs ?? 0,
    contact: ratios.contact ?? 0,
  };

  const sectionPosition = mapVirtualToSectionPosition(virtualIndex);
  const projectsStackProgress = clamp(
    (virtualIndex - PROJECTS_INDEX) / PROJECTS_STACK_SCROLL_SPAN,
    0,
    1,
  );

  const heroRatio = ratios.hero ?? 1;
  const rawActiveSection = getActiveSection(ratios);
  const activeSection = (heroRatio ?? 0) >= 0.6 ? null : rawActiveSection;
  const heroOffset = 0 - sectionPosition;
  const aboutOffset = 1 - sectionPosition;
  const skillsOffset = 2 - sectionPosition;
  const projectsOffset = 3 - sectionPosition;
  const blogsOffset = 4 - sectionPosition;
  const contactOffset = 5 - sectionPosition;

  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="relative h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-[10%_35%_55%]">
        <div className="hidden lg:flex lg:col-start-1 lg:col-end-2 items-center justify-start">
          <Navbar
            activeSection={activeSection}
            sectionProgress={sectionProgress}
            onNavigate={handleNavigate}
          />
        </div>
        <main className="relative h-full overflow-hidden lg:col-start-2 lg:col-end-4">
          <Hero ratio={heroRatio} offset={heroOffset} />
          <About ratio={sectionProgress.about} offset={aboutOffset} />
          <Skills ratio={sectionProgress.skills} offset={skillsOffset} />
          <Projects
            ratio={sectionProgress.projects}
            offset={projectsOffset}
            stackProgress={projectsStackProgress}
          />
          <Blogs ratio={sectionProgress.blogs} offset={blogsOffset} />
          <Contact ratio={sectionProgress.contact} offset={contactOffset} />
        </main>
      </div>
    </div>
  );
}
