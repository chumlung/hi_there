import { useEffect, useState } from "react";

const THRESHOLDS = [0, 0.25, 0.5, 0.75, 1];

/**
 * Returns the intersection ratio (0-1) for the element with the given id.
 * Used by SectionWrapper for fade/translate and by Home for sectionProgress state.
 */
export function useScrollProgress(id) {
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const el = id ? document.getElementById(id) : null;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === id) {
            setRatio(entry.intersectionRatio);
          }
        });
      },
      { root: null, threshold: THRESHOLDS }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id]);

  return ratio;
}
