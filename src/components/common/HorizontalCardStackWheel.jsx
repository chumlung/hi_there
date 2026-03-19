import { useCallback, useEffect, useRef, useState } from "react";

export default function HorizontalCardStackWheel({
  items,
  renderItem,
  heightInPx = 120,
  paddingInPx = 8,
  widthPercent = 90,
}) {
  const total = items?.length ?? 0;
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollFraction, setScrollFraction] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [containerWidth, setContainerWidth] = useState(300);
  const containerRef = useRef(null);
  const accRef = useRef(0);
  const snapTimerRef = useRef(null);
  const cursorUrl = `${import.meta.env.BASE_URL}assets/cursors/arrow-left-right.png`;

  const wrap = useCallback((i) => ((i % total) + total) % total, [total]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scheduleSnap = useCallback(() => {
    if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    snapTimerRef.current = setTimeout(() => {
      setIsScrolling(false);
      setScrollFraction(0);
      accRef.current = 0;
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || total <= 1) return;

    const THRESHOLD = 120;

    const onWheel = (e) => {  const isMostlyHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!isMostlyHorizontal) {
        return;
      }
    
      e.preventDefault();
      setIsScrolling(true);

      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      accRef.current += delta;
      const fraction = accRef.current / THRESHOLD;

      if (fraction >= 1) {
        setActiveIndex((currentIndex) => wrap(currentIndex + 1));
        accRef.current = 0;
        setScrollFraction(0);
      } else if (fraction <= -1) {
        setActiveIndex((currentIndex) => wrap(currentIndex - 1));
        accRef.current = 0;
        setScrollFraction(0);
      } else {
        setScrollFraction(fraction);
      }

      scheduleSnap();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [total, wrap, scheduleSnap]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || total <= 1) return;

    let startX = 0;
    const THRESHOLD = 60;

    const onStart = (e) => {
      startX = e.touches[0].clientX;
      accRef.current = 0;
      setIsScrolling(true);
    };

    const onMove = (e) => {
      const dx = startX - e.touches[0].clientX;
      const fraction = dx / THRESHOLD;

      if (fraction >= 1) {
        setActiveIndex((currentIndex) => wrap(currentIndex + 1));
        startX = e.touches[0].clientX;
        setScrollFraction(0);
      } else if (fraction <= -1) {
        setActiveIndex((currentIndex) => wrap(currentIndex - 1));
        startX = e.touches[0].clientX;
        setScrollFraction(0);
      } else {
        setScrollFraction(fraction);
      }
    };

    const onEnd = () => {
      setIsScrolling(false);
      setScrollFraction(0);
      accRef.current = 0;
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [total, wrap]);

  if (!total) return null;

  const SIDE_SCALE = 0.88;
  const HIDDEN_SCALE = 0.78;
  const PEEK = 10;
  const CARD_W = 0.88;
  const cardPx = containerWidth * CARD_W;

  const sideOffset = cardPx * (SIDE_SCALE - 1) / 2 - PEEK;
  const hiddenOffset = cardPx * (HIDDEN_SCALE - 1) / 2 - PEEK;

  const getSlot = (s) => {
    switch (s) {
      case 0:
        return { dx: 0, scale: 1, opacity: 1, darkenFactor: 0, z: 30 };
      case -1:
        return { dx: sideOffset, scale: SIDE_SCALE, opacity: 0.6, darkenFactor: 0.2, z: 20 };
      case 1:
        return { dx: -sideOffset, scale: SIDE_SCALE, opacity: 0.6, darkenFactor: 0.2, z: 20 };
      case -2:
        return { dx: hiddenOffset, scale: HIDDEN_SCALE, opacity: 0, darkenFactor: 0.35, z: 5 };
      case 2:
        return { dx: -hiddenOffset, scale: HIDDEN_SCALE, opacity: 0, darkenFactor: 0.35, z: 5 };
      default:
        return { dx: 0, scale: 0.7, opacity: 0, darkenFactor: 0, z: 0 };
    }
  };

  const interpolateNumber = (currentSlotState, nextSlotState, transitionProgress) => currentSlotState + (nextSlotState - currentSlotState) * transitionProgress;

  const getStyleAttributes = (currentSlotState, nextSlotState, transitionProgress) => ({
    dx: interpolateNumber(currentSlotState.dx, nextSlotState.dx, transitionProgress),
    scale: interpolateNumber(currentSlotState.scale, nextSlotState.scale, transitionProgress),
    opacity: interpolateNumber(currentSlotState.opacity, nextSlotState.opacity, transitionProgress),
    darkenFactor: interpolateNumber(currentSlotState.darkenFactor, nextSlotState.darkenFactor, transitionProgress),
    z: Math.round(interpolateNumber(currentSlotState.z, nextSlotState.z, transitionProgress)),
  });

  const slots = [-2, -1, 0, 1, 2];
  const transitionProgress = Math.abs(scrollFraction);
  const className = isScrolling ? "" : "transition-all duration-300 ease-out";

  return (
    <div
      ref={containerRef}
      className="relative mx-auto overflow-hidden"
      style={{
        width: `${widthPercent}%`,
        height: `${heightInPx}px`,
        paddingTop: `${paddingInPx}px`,
        paddingBottom: `${paddingInPx}px`,
        cursor: `url("${cursorUrl}") 8 8, ew-resize`,
      }}
    >
      {slots.map((slot) => {
        const idx = wrap(activeIndex + slot);
        const target =
          scrollFraction > 0 ? slot - 1 : scrollFraction < 0 ? slot + 1 : slot;
        const styleAttributes = getStyleAttributes(getSlot(slot), getSlot(target), transitionProgress);

        if (styleAttributes.opacity < 0.01) return null;

        return (
          <div
            key={slot}
            className={`absolute left-1/2 top-1/2 ${className}`}
            style={{
              width: `${CARD_W * 100}%`,
              transform: `translate(-50%, -50%) translateX(${styleAttributes.dx}px) scale(${styleAttributes.scale})`,
              opacity: styleAttributes.opacity,
              zIndex: styleAttributes.z,
              pointerEvents: slot === 0 ? "auto" : "none",
            }}
          >
            {styleAttributes.darkenFactor > 0.01 && (
              <div
                className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
                style={{ backgroundColor: `rgba(0,0,0,${styleAttributes.darkenFactor})` }}
              />
            )}
            {renderItem(items[idx], idx, { isActive: slot === 0 })}
          </div>
        );
      })}
    </div>
  );
}
