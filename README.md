# Velvet & Vine Salon

Frontend-only luxury salon site. TanStack Start (React 19) + Vite, Tailwind CSS v4, Framer Motion, React Three Fiber.

No backend, no database, no accounts, no payments — everything runs in the browser.

## Run it in VS Code

1. Unzip and open the `velvet-vine-salon` folder in VS Code.
2. Install [Node.js](https://nodejs.org) v20 or newer if you don't already have it.
3. In the VS Code terminal (`Ctrl` + `` ` ``):

   ```bash
   npm install
   npm run dev
   ```

4. Open the address it prints — usually http://localhost:5173

Other commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Local preview with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run lint` | ESLint check |
| `npm run test` | Vitest unit tests |

## Where things live

| Path | What's there |
| --- | --- |
| `src/routes/index.tsx` | The single page: assembles every section, plus the document `<head>` (title, description, social preview) |
| `src/routes/__root.tsx` | Fonts, theme colour, shared shell |
| `src/components/salon/` | One file per section: `Navbar`, `Hero`, `Services`, `Stylists`, `Experience`, `Testimonials`, `Booking`, `Contact` |
| `src/components/salon/ScrollScissors.tsx` | The scissors that follow the page and point at the section you're reading |
| `src/components/salon/SignatureScene.tsx` | The 3D scissors model and its animation |
| `src/components/salon/CursorAurora.tsx` | The glow that follows your cursor and drives the background colours |
| `src/components/salon/BlurText.tsx` | Words that fade in from blurred |
| `src/data/salon.ts` | **All copy and prices** — categories, services, stylists, reviews, opening hours, contact details, time slots |
| `src/assets/` | Photography, including `hero-interior.jpg` used as the opening background |
| `src/styles.css` | Colour tokens (oklch), glass, grain, atmosphere gradients, keyframes |

## Placeholder content (replace before launch)

- Address, phone, email, opening hours, social links.
- Service prices are illustrative.
- Stylists and testimonials are illustrative samples, not real people or verified reviews.
- Booking form only simulates a request; nothing is sent or reserved.

## Notes

- The 3D scissors only load on desktop browsers with WebGL, and never when "reduce motion" is switched on in the operating system.
- The opening background is a stock photo; swap `src/assets/hero-interior.jpg` for your own room shot and the site picks it up automatically.
