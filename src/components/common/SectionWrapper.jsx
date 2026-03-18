const OFFSET_PX = 40;

export default function SectionWrapper({
  id,
  left,
  right,
  ratio = 0,
  offset = 0,
  className = "",
  sectionClassName = "",
}) {
  // Introduce a buffer near 0 and 1 so opacity stays fully
  // transparent/opaque for a while before starting to fade.
  const BUFFER = 0.30; // 15% of visibility on each side

  let opacity;
  if (ratio <= BUFFER) {
    opacity = 0;
  } else if (ratio >= 1 - BUFFER) {
    opacity = 1;
  } else {
    // Remap [BUFFER, 1-BUFFER] linearly back to [0, 1]
    opacity = (ratio - BUFFER) / (1 - 2 * BUFFER);
  }

  const leftTranslateY = offset * OFFSET_PX;
  const rightTranslateY = -offset * OFFSET_PX;
  const zIndex = Math.round(opacity * 100);

  return (
    <section
      id={id}
      className="absolute inset-0 flex items-center px-4 sm:px-6 scroll-mt-0"
      style={{ pointerEvents: opacity > 0.05 ? "auto" : "none", zIndex }}
    >
      <div
        className={`mx-auto w-full h-full overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 lg:gap-16 bg-white py-10 md:py-16 ${sectionClassName} ${className}`}
      >
        <div
          className="transition-all duration-200 ease-out"
          style={{
            opacity,
            transform: `translateY(${leftTranslateY}px)`,
          }}
        >
          {left}
        </div>
        <div
          className="transition-all duration-200 ease-out"
          style={{
            opacity,
            transform: `translateY(${rightTranslateY}px)`,
          }}
        >
          {right}
        </div>
      </div>
    </section>
  );
}
