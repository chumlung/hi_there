export default function BlogCard({ title, excerpt, link, imageFileName }) {
  const baseUrl = import.meta.env.BASE_URL;
  const src = `${baseUrl}assets/images/blog/${imageFileName}`;

  return (
    <article
      className="flex flex-col overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-md
                 transition-shadow duration-200 hover:shadow-lg"
    >
      <img
        src={src}
        alt={title}
        className="w-full h-40 sm:h-44 object-cover"
      />
      <div className="flex flex-col gap-2 p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-semibold text-base text-slate-900">
            {title}
          </h3>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors shrink-0"
              aria-label={`Open ${title} in new tab`}
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
        <p className="text-sm text-slate-600 leading-relaxed">{excerpt}</p>
      </div>
    </article>
  );
}
