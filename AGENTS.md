<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Salon site is a single page (`src/routes/index.tsx`) composed of section components in `src/components/salon/`, with all sample content in `src/data/salon.ts` — keeps copy/placeholders editable in one place.
- The scroll-guided scissors scene is lazy-loaded once in a pointer-transparent page overlay, mounted client-side only on desktop with WebGL and no reduced-motion — avoids duplicate canvases and keeps smaller screens unobstructed.
- Scissors orientation is owned by the overlay using screen-space target vectors; the 3D model keeps its blade axis upright and only animates opening and subtle depth tilt — prevents conflicting rotations from aiming away from content.
- Ambient gradients use semantic CSS tokens and cursor/scroll custom properties, with grain in a pointer-transparent overlay and all ambient animation disabled for reduced motion — keeps the background interactive without blocking content.
- Stylist cards use two inert, backface-hidden faces with hover, keyboard and tap state — keeps hidden controls out of keyboard navigation.
- Motion primitives live in salon components; React Bits adaptations use the existing Framer Motion dependency and semantic CSS gradients — avoids duplicate animation runtimes and keeps them themeable.
- Review scrolling uses duplicated CSS tracks with pause controls and a static reduced-motion alternative — keeps the loop seamless and accessible.
