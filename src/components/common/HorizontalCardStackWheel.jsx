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
  const [containerWidth, setContainerWidth] = useState(300);
  const containerRef = useRef(null);

  const wrapIndexes = useCallback((index) => ((index % total) + total) % total, [total]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const resizeObserver = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  const goNext = () => total > 1 && setActiveIndex((currentIndex) => wrapIndexes(currentIndex + 1));
  const goPrev = () => total > 1 && setActiveIndex((currentIndex) => wrapIndexes(currentIndex - 1));

  if (!total) return null;

  const SIDE_SCALE = 0.88;
  const HIDDEN_SCALE = 0.78;
  const PEEK = 10;
  const CARD_W = 0.88;
  const cardPx = containerWidth * CARD_W;

  const sideOffset = (cardPx * (SIDE_SCALE - 1)) / 2 - PEEK;
  const hiddenOffset = (cardPx * (HIDDEN_SCALE - 1)) / 2 - PEEK;

  const getSlotStyle = (s) => {
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

  const slots = [-2, -1, 0, 1, 2];
  const canNavigate = total > 1;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto overflow-hidden"
      style={{
        width: `${widthPercent}%`,
        height: `${heightInPx}px`,
        paddingTop: `${paddingInPx}px`,
        paddingBottom: `${paddingInPx}px`,
      }}
    >
      {slots.map((slot) => {
        const idx = wrapIndexes(activeIndex + slot);
        const s = getSlotStyle(slot);

        return (
          <div
            key={slot}
            className="absolute left-1/2 top-1/2 transition-all duration-500 ease-out"
            style={{
              width: `${CARD_W * 100}%`,
              transform: `translate(-50%, -50%) translateX(${s.dx}px) scale(${s.scale})`,
              opacity: s.opacity,
              zIndex: s.z,
              pointerEvents: slot === 0 ? "auto" : "none",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-[background-color] duration-500 ease-out"
              style={{ backgroundColor: `rgba(0,0,0,${s.darkenFactor})` }}
            />
            {renderItem(items[idx], idx, { isActive: slot === 0 })}
          </div>
        );
      })}

      {canNavigate && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous card"
            className="absolute left-1 top-1/2 -translate-y-1/2 z-40
                       flex items-center justify-center w-7 h-7 rounded-full
                       bg-white/30 backdrop-blur-sm text-blue-600/60
                       hover:bg-white/50 hover:text-blue-600 active:bg-white/60 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="12,4 6,10 12,16" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next card"
            className="absolute right-1 top-1/2 -translate-y-1/2 z-40
                       flex items-center justify-center w-7 h-7 rounded-full
                       bg-white/30 backdrop-blur-sm text-blue-600/60
                       hover:bg-white/50 hover:text-blue-600 active:bg-white/60 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="8,4 14,10 8,16" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
