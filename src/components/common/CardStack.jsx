export default function CardStack({
  cardWidth,
  cardHeight,
  stackOffset,
  widthStep,
  heightStep,
  children,
  stackProgress = 0,
}) {
  const items = Array.isArray(children) ? children : [children];
  const totalCards = items.length;
  const cardsProgress = stackProgress * totalCards;

  const visiblePeeks = Math.min(totalCards - 1, 4);
  const peekSize = stackOffset - heightStep;
  const containerHeight = cardHeight + visiblePeeks * peekSize;

  const currentTop = Math.floor(cardsProgress);
  const frac = cardsProgress - currentTop;

  return (
    <div className="relative h-full flex items-center justify-center">
      <div
        className="relative"
        style={{
          width: `${cardWidth}px`,
          height: `${containerHeight}px`,
          clipPath: "inset(0 -60px 0 -60px)",
        }}
      >
        {items.map((child, index) => {
          const localProgress = cardsProgress - index;
          const clampedLocal = Math.max(0, Math.min(1, localProgress));

          if (localProgress >= 1.05) {
            return null;
          }

          const isTopCard = index === currentTop;
          const isExiting = isTopCard && frac > 0;
          const isNextUp = index === currentTop + 1;

          const homeY = 2 + index * stackOffset;
          const homeWidth = cardWidth - index * widthStep;
          const homeHeight = cardHeight - index * heightStep;
          const topY = 2;

          let renderWidth, renderHeight, renderY;

          if (index <= currentTop) {
            renderWidth = cardWidth;
            renderHeight = cardHeight;
            renderY = topY;
          } else if (isNextUp) {
            renderWidth = homeWidth + frac * (cardWidth - homeWidth);
            renderHeight = homeHeight + frac * (cardHeight - homeHeight);
            renderY = homeY + frac * (topY - homeY);
          } else {
            renderWidth = homeWidth;
            renderHeight = homeHeight;
            renderY = homeY;
          }

          const exitTranslation = clampedLocal * (cardHeight + stackOffset);
          const translateY = renderY - exitTranslation;

          const darkenOpacity =
            index <= currentTop
              ? 0
              : isNextUp
                ? Math.min((1 - frac) * index * 0.12, 0.5)
                : Math.min(index * 0.12, 0.5);

          const opacity =
            clampedLocal <= 0.5 ? 1 : 1 - (clampedLocal - 0.5) * 2;

          const shouldAnimate = isExiting || isNextUp || isTopCard;

          return (
            <div
              key={index}
              className={`absolute rounded-3xl overflow-hidden border px-6 py-5 ${
                shouldAnimate ? "transition-all duration-300 ease-out" : ""
              } ${
                isTopCard || isNextUp
                  ? "border-slate-200 bg-white shadow-2xl"
                  : "border-slate-300 bg-slate-50 shadow-md"
              }`}
              style={{
                left: "50%",
                transform: `translateX(-50%) translateY(${translateY}px)`,
                width: `${renderWidth}px`,
                height: `${renderHeight}px`,
                zIndex: totalCards - index,
                opacity,
                pointerEvents: isTopCard ? "auto" : "none",
              }}
            >
              {darkenOpacity > 0.01 && (
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
                  style={{
                    backgroundColor: `rgba(0,0,0,${darkenOpacity})`,
                  }}
                />
              )}
              {child}
              {isTopCard && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/95 to-transparent" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
