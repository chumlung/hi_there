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

export default function Card({
  name,
  roles,
  description,
  industryDomain,
  siteUrl,
  keyContributions,
}) {
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
            className="text-blue-600 hover:text-blue-700 transition-colors"
            aria-label={`Open ${name} website in new tab`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M11 3a1 1 0 100 2h2.586L9.293 9.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        )}
      </div>
      <p className="text-slate-700 text-sm leading-relaxed mb-3">
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
