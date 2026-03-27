/** Paths relative to `public/` (use with `import.meta.env.BASE_URL`). */
export const pillIcons = {
  linkedin: "assets/icons/linkedin.svg",
  email: "assets/icons/email.svg",
  resume: "assets/icons/resume.svg",
  externalLink: "assets/icons/external-link.svg",
};

export const resumePdf = {
  path: "assets/documents/Chumlung_Limbu_Resume.pdf",
  downloadFilename: "Chumlung_Limbu_Resume.pdf",
};

export function resumePdfHref() {
  return `${import.meta.env.BASE_URL}${resumePdf.path}`;
}
