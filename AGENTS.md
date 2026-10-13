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
- The hero 3D scene is lazy-loaded and only mounted client-side on desktop with WebGL and no reduced-motion — keeps the page usable and fast everywhere.
