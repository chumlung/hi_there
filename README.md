# Chumlung Limbu - Portfolio

A M portfolio website showcasing projects, skills, and blog placeholder. Built with React, Tailwind CSS, and Vite. Hosted on GitHub Pages.

## Tech Stack

- React 18
- Tailwind CSS
- Vite

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

1. Ensure `base` in `vite.config.js` matches your repo:
   - For `username/hi_there`: `base: '/hi_there/'`
   - For user/org pages (`username.github.io`): `base: '/'`

2. Deploy:
```bash
npm run deploy
```

This builds the app and pushes the `dist/` folder to the `gh-pages` branch. Enable GitHub Pages in repo Settings → Pages → Source: Deploy from branch `gh-pages`.

3. **Update contact email** in `src/components/Contact.jsx` before deploying.
