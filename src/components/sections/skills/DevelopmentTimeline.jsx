import StepCard from "@components/sections/skills/StepCard";

/** Tailwind classes — keep full strings so JIT picks them up */
const STEP_ACCENTS = [
  { border: "border-teal-500", dot: "bg-teal-500", line: "bg-teal-400/60" },
  { border: "border-sky-500", dot: "bg-sky-500", line: "bg-sky-400/60" },
  { border: "border-blue-600", dot: "bg-blue-600", line: "bg-blue-400/60" },
  { border: "border-indigo-500", dot: "bg-indigo-500", line: "bg-indigo-400/60" },
  { border: "border-violet-500", dot: "bg-violet-500", line: "bg-violet-400/60" },
  { border: "border-cyan-600", dot: "bg-cyan-600", line: "bg-cyan-400/60" },
];

function chunkPairs(arr) {
  const rows = [];
  for (let i = 0; i < arr.length; i += 2) {
    rows.push({ left: arr[i], right: arr[i + 1] ?? null, startIndex: i });
  }
  return rows;
}

function SpineDot({ accent }) {
  return (
    <span
      className={`relative z-20 box-border h-2 w-2 shrink-0 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-200/80 ${accent.dot}`}
      aria-hidden
    />
  );
}

function ConnectorLine({ accent }) {
  return (
    <div
      className={`h-px min-h-px min-w-[6px] flex-1 self-center ${accent.line}`}
      aria-hidden
    />
  );
}

/** Pull following pairs upward (same net effect as -32px between groups, without clipping the first card). */
const BETWEEN_PAIRS_OVERLAP = "-mt-8"; /* 32px */
/** Pull the right card up under the left card in the same pair (compact stagger). */
const WITHIN_PAIR_OVERLAP = "-mt-7"; /* 28px — tune with -mt-6 / -mt-8 if needed */

export default function DevelopmentTimeline({ items, baseUrl }) {
  if (!items?.length) return null;

  const rows = chunkPairs(items);

  return (
    <section className="relative mx-auto max-w-lg" aria-label="Development lifecycle steps">
      {/* Spine — centered on section; matches flex middle column (equal flex-1 halves) */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-px -translate-x-1/2 bg-slate-200"
        aria-hidden
      />

      <ul className="relative z-[1] m-0 list-none p-0">
        {rows.map(({ left, right, startIndex }) => {
          const leftAccent = STEP_ACCENTS[startIndex % STEP_ACCENTS.length];
          const rightAccent = right
            ? STEP_ACCENTS[(startIndex + 1) % STEP_ACCENTS.length]
            : null;
          const leftIcon = `${baseUrl}assets/icons/${left.icon}`;
          const isPair = Boolean(right);

          const isFirstPair = startIndex === 0;

          return (
            <li
              key={`row-${startIndex}`}
              className={
                `${isPair ? "relative mb-1 pb-1 sm:mb-1.5" : "relative mb-1"} ${
                  !isFirstPair ? BETWEEN_PAIRS_OVERLAP : ""
                }`.trim()
              }
            >
              {/* Row 1: left card → line → dot (on spine) → empty right half */}
              <div className="flex w-full items-center">
                <div className="flex min-w-0 flex-1 items-center justify-end gap-0 pr-0">
                  <StepCard
                    number={startIndex + 1}
                    title={left.title}
                    description={left.description}
                    iconSrc={leftIcon}
                    iconAlt={left.icon}
                    borderAccentClass={leftAccent.border}
                  />
                  <ConnectorLine accent={leftAccent} />
                </div>
                <div className="flex w-2 shrink-0 items-center justify-center self-center">
                  <SpineDot accent={leftAccent} />
                </div>
                <div className="min-w-0 flex-1 self-center" aria-hidden />
              </div>

              {/* Row 2: empty left → dot → line → right card (staggered down) */}
              {right && (
                <div
                  className={`flex w-full items-center ${WITHIN_PAIR_OVERLAP}`}
                >
                  <div className="min-w-0 flex-1 self-center" aria-hidden />
                  <div className="flex w-2 shrink-0 items-center justify-center self-center">
                    <SpineDot accent={rightAccent} />
                  </div>
                  <div className="flex min-w-0 flex-1 items-center justify-start gap-0 pl-0">
                    <ConnectorLine accent={rightAccent} />
                    <StepCard
                      number={startIndex + 2}
                      title={right.title}
                      description={right.description}
                      iconSrc={`${baseUrl}assets/icons/${right.icon}`}
                      iconAlt={right.icon}
                      borderAccentClass={rightAccent.border}
                    />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
