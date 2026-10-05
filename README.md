# Anitik Aaron Maharana — Portfolio

React + TypeScript + Tailwind CSS v4 + Framer Motion, built with Vite.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Content — one file

All content lives in `src/data/profile.ts`. Sections are shown **only when they have data**, and the navigation and
section numbers adjust to match. Right now that's About, Education and Contact.

To add more, fill the matching array and the section appears automatically:

| Array | Section |
| --- | --- |
| `experience` | Experience (internships, with certificate thumbnails via `documents`) |
| `skills` | Technical Arsenal |
| `projects` | Projects (with case-study modal) |
| `certificates` | Certificates & Credentials |
| `activities` | Achievements & Activities |
| `learning` / `journey` | Currently Learning / Recent Journey |

Only add facts that can be backed up: a project, certificate, course or confirmed role.

## Assets

| File | Status |
| --- | --- |
| `public/headshot.webp` + `.jpg` | Not added yet. Until it exists, the hero shows an "AM" monogram. Use a square image of at least 800 px. |
| `public/resume.pdf` | Not added yet. Once it exists, the Resume buttons link to it automatically; until then they open LinkedIn. |

## Options

- **Phone number**: set `SHOW_PHONE = true` in `src/data/profile.ts` to list it under Contact. It's off by default because public numbers attract spam.
- **Contact form**: set `CONTACT_FORM_ENDPOINT` (for example a Formspree URL) to send messages directly. Until then, the form opens a pre-filled email.
- **Image swaps**: use a new filename rather than overwriting an old one, so CDN caches don't keep serving the previous image.
