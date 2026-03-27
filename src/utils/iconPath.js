/**
 * Resolves an image `src` for public assets or absolute URLs.
 * - `http://`, `https://`, and `//` URLs are returned unchanged.
 * - Any other path is treated as relative to the Vite app base (`import.meta.env.BASE_URL`).
 */
export function resolveIconPath(path) {
  if (path == null || typeof path !== "string") return "";
  const trimmed = path.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  if (trimmed.startsWith("//")) {
    return trimmed;
  }
  const normalized = trimmed.replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
}
