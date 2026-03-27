import { resolveIconPath } from "@src/utils/iconPath";
import { pillIcons } from "@src/data/pillIcons";

function highlightText(text, phrases = []) {
  let parts = [text];

  phrases.forEach((phrase, phraseIndex) => {
    if (!phrase) return;
    const nextParts = [];

    parts.forEach((part) => {
      if (typeof part !== "string") {
        nextParts.push(part);
        return;
      }

      const split = part.split(phrase);
      split.forEach((chunk, i) => {
        if (chunk) {
          nextParts.push(chunk);
        }
        if (i < split.length - 1) {
          nextParts.push(
            <span
              key={`${phrase}-${phraseIndex}-${i}`}
              className="text-blue-700 font-semibold"
            >
              {phrase}
            </span>,
          );
        }
      });
    });

    parts = nextParts;
  });

  return parts;
}

export default function ProjectCard({
  name,
  roles,
  description,
  industryDomain,
  siteUrl,
  keyContributions,
}) {
  const externalLinkIconUrl = resolveIconPath(pillIcons.externalLink);

  return (
    <>
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <div className="flex flex-col">
          <h3 className="font-semibold text-base sm:text-lg text-slate-900">
            {name}
          </h3>
          {industryDomain && (
            <p className="text-xs text-slate-500">{industryDomain}</p>
          )}
        </div>
        {siteUrl && (
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors inline-flex shrink-0"
            aria-label={`Open ${name} website in new tab`}
          >
            <span
              className="inline-block h-4 w-4 bg-current"
              style={{
                maskImage: `url(${externalLinkIconUrl})`,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskImage: `url(${externalLinkIconUrl})`,
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
              }}
              aria-hidden
            />
          </a>
        )}
      </div>
      <p className="text-slate-700 text-xs sm:text-sm leading-snug sm:leading-relaxed mb-3">
        {description}
      </p>
      {Array.isArray(roles) && roles.length > 0 && (
        <p className="text-xs sm:text-sm text-blue-900 font-semibold mb-3">
          {roles.join(" | ")}
        </p>
      )}
      {Array.isArray(keyContributions) && keyContributions.length > 0 && (
        <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-2">
          {keyContributions.map((contribution, i) => (
            <li key={i}>
              {highlightText(
                contribution.title,
                contribution.highlightPhrases,
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
