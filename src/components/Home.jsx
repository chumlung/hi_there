import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Blogs from "./Blogs";
import Contact from "./Contact";

const SECTION_IDS = ["about", "skills", "projects", "blogs", "contact"];
const TRACK_IDS = ["hero", ...SECTION_IDS];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
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
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [ratios, setRatios] = useState(() => computeRatios(0));
  const touchStartYRef = useRef(null);

  useEffect(() => {
    const maxIndex = TRACK_IDS.length - 1;

    const handleWheel = (event) => {
      event.preventDefault();
      const delta = event.deltaY;
      const step = delta / 1500;

      setVirtualIndex((prev) => {
        const next = clamp(prev + step, 0, maxIndex);
        setRatios(computeRatios(next));
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
        setRatios(computeRatios(next));
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
  }, []);

  const handleNavigate = useCallback((id) => {
    const index = TRACK_IDS.indexOf(id);
    if (index === -1) return;
    setVirtualIndex(index);
    setRatios(computeRatios(index));
  }, []);

  const sectionProgress = {
    about: ratios.about ?? 0,
    skills: ratios.skills ?? 0,
    projects: ratios.projects ?? 0,
    blogs: ratios.blogs ?? 0,
    contact: ratios.contact ?? 0,
  };

  const heroRatio = ratios.hero ?? 1;
  const rawActiveSection = getActiveSection(ratios);
  const activeSection = (heroRatio ?? 0) >= 0.6 ? null : rawActiveSection;
  const heroOffset = 0 - virtualIndex;
  const aboutOffset = 1 - virtualIndex;
  const skillsOffset = 2 - virtualIndex;
  const projectsOffset = 3 - virtualIndex;
  const blogsOffset = 4 - virtualIndex;
  const contactOffset = 5 - virtualIndex;

  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="flex h-full max-w-6xl mx-auto">
        <div className="hidden md:flex w-32 lg:w-40 items-center justify-center">
          <Navbar
            activeSection={activeSection}
            sectionProgress={sectionProgress}
            onNavigate={handleNavigate}
          />
        </div>
        <main className="relative flex-1 min-w-0 h-full overflow-hidden">
          <Hero ratio={heroRatio} offset={heroOffset} />
          <About ratio={sectionProgress.about} offset={aboutOffset} />
          <Skills ratio={sectionProgress.skills} offset={skillsOffset} />
          <Projects ratio={sectionProgress.projects} offset={projectsOffset} />
          <Blogs ratio={sectionProgress.blogs} offset={blogsOffset} />
          <Contact ratio={sectionProgress.contact} offset={contactOffset} />
        </main>
      </div>
    </div>
  );
}
