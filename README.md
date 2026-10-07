# Aditya Singhal: portfolio

A static portfolio site. No build step and no dependencies: plain HTML, CSS and JavaScript.

## Files

| Path | What it is |
|---|---|
| `index.html` | The page structure and SEO tags |
| `css/style.css` | All styling, including light and dark themes |
| `js/data.js` | **All the text content** (projects, skills, achievements, contact). Edit this to change wording or add a project |
| `js/main.js` | Rendering, scroll reveals, theme toggle, nav behaviour |
| `assets/aditya.jpg` | Profile photo (square, shown as a circle) |
| `assets/og.jpg` | Social preview image (1200x630) |
| `assets/favicon.svg` | Browser tab icon |
| `resume.pdf` | The one-page résumé the buttons link to |
| `vercel.json` | Cache and security headers for Vercel |

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy on Vercel

1. Push this folder to a GitHub repo, or run `npx vercel` inside it.
2. In Vercel, import the repo. Framework preset: **Other**. Leave the build command and output directory empty.
3. Deploy.

Netlify, Cloudflare Pages and GitHub Pages also work: point them at this folder and leave the build settings empty.

## After you have a domain

In `index.html`, change `og:image` to the full address, for example
`https://your-domain.com/assets/og.jpg`. Social sites need an absolute URL to show the preview image.

## Notes

- Fonts load from Google Fonts. If you want zero external requests, download the three families and add `@font-face` rules to `css/style.css`.
- Keep your phone number off the public site; the page shows only email, LinkedIn and GitHub.
