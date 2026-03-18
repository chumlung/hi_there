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

  if (totalCards === 0) {
    return null;
  }

  const maxVisibleCards = 4;
  const totalTransitions = Math.max(totalCards - 1, 1);
  const normalizedProgress = Math.max(0, Math.min(stackProgress, 1));
  const cardsProgress = normalizedProgress * totalTransitions;

  const visiblePeeks = Math.min(totalCards - 1, maxVisibleCards - 1);
  const peekSize = stackOffset - heightStep;
  const containerHeight = cardHeight + visiblePeeks * peekSize;

  const currentTop = Math.min(Math.floor(cardsProgress), totalCards - 1);
  const frac = currentTop >= totalCards - 1 ? 0 : cardsProgress - currentTop;

  const getSlotGeometry = (slot) => ({
    width: cardWidth - slot * widthStep,
    height: cardHeight - slot * heightStep,
    y: 2 + slot * stackOffset,
  });

  const topExitDistance = cardHeight + stackOffset;

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
          const relativeIndex = index - currentTop;
          if (relativeIndex < 0 || relativeIndex > maxVisibleCards) {
            return null;
          }

          const isTopCard = relativeIndex === 0;
          const isIncomingBottom = relativeIndex === maxVisibleCards;

          let renderWidth = cardWidth;
          let renderHeight = cardHeight;
          let translateY = 2;
          let opacity = 1;
          let slotForShading = 0;

          if (isTopCard) {
            const slot0 = getSlotGeometry(0);
            renderWidth = slot0.width;
            renderHeight = slot0.height;
            translateY = slot0.y - frac * topExitDistance;
            opacity = 1 - frac;
          } else if (isIncomingBottom) {
            const bottomSlot = getSlotGeometry(maxVisibleCards - 1);
            renderWidth = bottomSlot.width;
            renderHeight = bottomSlot.height;
            translateY = bottomSlot.y;
            opacity = frac;
            slotForShading = maxVisibleCards - 1;
          } else {
            const fromSlot = getSlotGeometry(relativeIndex);
            const toSlot = getSlotGeometry(relativeIndex - 1);

            renderWidth = fromSlot.width + frac * (toSlot.width - fromSlot.width);
            renderHeight =
              fromSlot.height + frac * (toSlot.height - fromSlot.height);
            translateY = fromSlot.y + frac * (toSlot.y - fromSlot.y);
            slotForShading = relativeIndex - frac;
          }

          const darkenOpacity = isTopCard
            ? 0
            : Math.min(slotForShading * 0.12, 0.5) * opacity;

          const shouldAnimate = isTopCard || relativeIndex <= maxVisibleCards;

          return (
            <div
              key={index}
              className={`absolute rounded-3xl overflow-hidden border px-4 py-4 sm:px-5 sm:py-4 lg:px-6 lg:py-5 ${
                shouldAnimate ? "transition-all duration-300 ease-out" : ""
              } ${
                isTopCard || relativeIndex === 1
                  ? "border-slate-200 bg-white shadow-2xl"
                  : "border-slate-300 bg-slate-50 shadow-md"
              }`}
              style={{
                left: "50%",
                transform: `translateX(-50%) translateY(${translateY}px)`,
                width: `${renderWidth}px`,
                height: `${renderHeight}px`,
                zIndex: isTopCard ? totalCards + 5 : totalCards - (relativeIndex - 1),
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
