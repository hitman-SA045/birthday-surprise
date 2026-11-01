# 🎂💙 Birthday Surprise

A single-page, mobile-first birthday surprise. Dark navy background, subtle electric-blue
glow, and three of her favourite Gojo images used as immersive section backgrounds.
Simple, clean, and playful.

No build step, no dependencies.

```
index.html            structure only — text is injected from script.js
style.css             all styling, colours, background art and animations
script.js             app engine + ALL the text in the CONFIG block at the top
public/images/
  gojo-eyes.jpg       opening section background
  gojo-main.jpg       birthday reveal + Gojo visual backgrounds
  gojo-smile.jpg      final birthday message background
```

## Run it

Double-click `index.html`, or serve the folder:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Serving is recommended because the page references `public/images/…`.

## The page, top to bottom

1. **Opening** — greeting + "Open Your Surprise 🎁", over a full-screen
   `gojo-eyes.jpg` background.
2. **Birthday reveal** — the "November 27" fib, then the real date `09 • 11 • 2026`,
   over a `gojo-main.jpg` background, with a brief celebratory glow + confetti.
3. **Gojo visual** — a full-scene `gojo-main.jpg` background with a blue aura,
   gentle floating particles and the existing copy.
4. **Final birthday message** — the complete message over a `gojo-smile.jpg`
   background, then the closing line and "Replay the Surprise ↻".

Sections 2–4 start `hidden` and are revealed when the opening button is pressed.

## ✏️ Where to change text

**Open `script.js` and edit the `CONFIG` block at the very top** — that is the only place
you need to touch.

```js
const CONFIG = {
  herName:  "Divya dharshini",
  fakeDate: "November 27",
  realDate: "09 • 11 • 2026 🎂💙",
```

Every line of copy lives in `CONFIG.text`, named after the section it belongs to:

| Key | Section |
| --- | --- |
| `openTitle`, `openLede`, `openBtn` | 1. Opening |
| `revealLine1` … `revealLine4`, `revealBtn` | 2. Birthday reveal |
| `gojoTitle`, `gojoSub`, `gojoBtn` | 3. Gojo visual |
| `messageTitle`, `messageBody[]`, `messageSignOff[]` | 4. Final message |
| `closingLine`, `replayBtn` | Closing |

Notes:

- `messageBody` is an **array** — one item renders as one paragraph.
- `messageSignOff` is a 2-item array: `"With dumbness,"` and the sign-off line.
- `realDate` is applied to the big date element *and* is the only place that date is written.
- Emoji are plain UTF-8 in this file — keep the file saved as UTF-8 (no BOM).

## The three images

All three are used exactly as supplied. They are never stretched: the opening, reveal and
Gojo visual use `cover` backgrounds, while the final message uses a face-safe responsive
crop (a portrait-height fit on phones, a cover crop on wider screens), all with a navy scrim
and per-section positioning.

| Image | Where | Treatment |
| --- | --- | --- |
| `gojo-eyes.jpg` | Opening | Cover background; the copy is centred over the eye band on phones and sits lower on desktop |
| `gojo-main.jpg` | Birthday reveal + Gojo visual | Cover background with two different crops; the face stays in view behind the centred mobile copy |
| `gojo-smile.jpg` | Final message | Face-safe background: portrait-height fit on phones, cover crop on wider screens; the face stays visible behind the translucent message card |

`gojo-eyes.jpg` has a large pure-white background, so the navy gradient overlay tames the
white areas while keeping the glowing eye band readable. The reveal's glow pulse now targets
the whole section, and the Gojo visual section keeps its aura and particles over the artwork.

To swap an image, replace the file in `public/images/` keeping the same name. The CSS paths
are relative, so they work both locally and from a GitHub Pages project subpath. Background
images need no `width`/`height` markup.

## Responsive behaviour

- Mobile-first; verified with no horizontal overflow at 320, 360, 375, 390, 430, 461,
  500, 620, 621, 768, 899, 900, 1024 and 1440 px, plus 740 × 360 landscape.
- Type scales with `clamp()`, so headings never clip or become oversized.
- Below 900px the sections centre their copy, use content-sized minimum heights and
  tighter spacing; the final message stays a single centred card on every screen size.
- The final message portrait is fitted on phones and uses a face-safe cover crop on wider
  screens, so Gojo's face stays visible without hard letterboxing.
- All buttons are ≥44px tall. The layout is keyboard-navigable and Enter activates both
  the opening and replay buttons.

## Accessibility

- `prefers-reduced-motion: reduce` disables the ambient drift, particles, confetti and the
  section entrance animation, and shows the date immediately.
- The three Gojo images are decorative CSS backgrounds, so they are hidden from assistive
  tech; the page copy carries the meaning.
- The ambient background is `aria-hidden` and the confetti canvas is non-interactive.

## Colours

All in `:root` at the top of `style.css`:

```css
--blue:   #4fc3ff;   /* main electric blue */
--purple: #a06bff;   /* subtle purple highlight */
--bg:     #000308;   /* near-black */
```

## Notes

- Confetti is a plain `<canvas id="confetti">`, drawn with `requestAnimationFrame` and
  stopped when it finishes — no library.
- Works offline apart from the two Google Fonts (Outfit / Inter); if they fail to load it
  falls back to the system sans-serif.
- Replay re-hides every section, resets the date, clears the confetti, scrolls to the top
  and re-arms the opening button so the whole thing can be watched again.
