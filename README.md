# 🎂💙 Birthday Surprise

A single-page, mobile-first birthday surprise. Dark navy background, subtle electric-blue
glow, and three of her favourite Gojo images. Simple, clean, and playful.

No build step, no dependencies.

```
index.html            structure only — text is injected from script.js
style.css             all styling, colours and animations
script.js             app engine + ALL the text in the CONFIG block at the top
public/images/
  gojo-eyes.jpg       birthday reveal  (Gojo's blue eyes)
  gojo-main.jpg       main Gojo visual
  gojo-smile.jpg      final birthday message
```

## Run it

Double-click `index.html`, or serve the folder:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Serving is recommended because the page references `public/images/…`.

## The page, top to bottom

1. **Opening** — greeting + "Open Your Surprise 🎁".
2. **Birthday reveal** — the "November 27" fib, then the real date `09 • 11 • 2026`,
   with the eyes image and a brief celebratory glow + confetti.
3. **Gojo visual** — `gojo-main.jpg` with a blue aura and gentle floating particles.
4. **Final birthday message** — `gojo-smile.jpg` above the message on mobile, beside it on
   wide screens, then the closing line and "Replay the Surprise ↻".

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

All three are used exactly as supplied, at their original aspect ratio (never stretched).

| Image | Where | Treatment |
| --- | --- | --- |
| `gojo-eyes.jpg` | Birthday reveal | Framed card, compact, brief glow intensify when the date lands |
| `gojo-main.jpg` | Gojo visual | Largest image, blue aura + gentle particles |
| `gojo-smile.jpg` | Final message | Above the message on mobile, sticky beside it on ≥900px |

`gojo-eyes.jpg` has a large pure-white background, but the eye content runs **edge to edge**
horizontally, so cutting the background out would clip the eyes. It is therefore shown in a
clean frame on the dark theme rather than keyed out — this is the "otherwise, preserve the
image and display it in a visually appropriate frame" option.

To swap an image, just replace the file in `public/images/` keeping the same name. If you
change the pixel dimensions, update the `width`/`height` attributes on the matching `<img>`
in `index.html` so the browser can reserve the right space.

## Responsive behaviour

- Mobile-first; verified with no horizontal overflow at 320, 360, 375, 390, 412, 768,
  1024 and 1440 px.
- Type scales with `clamp()`, so headings never clip or become oversized.
- On screens ≥900px the final message becomes a two-column grid with the smile image
  sticky beside the text; on phones the image sits above the message.
- All buttons are ≥44px tall. The layout is keyboard-navigable and Enter activates both
  the opening and replay buttons.

## Accessibility

- `prefers-reduced-motion: reduce` disables the ambient drift, particles, confetti and the
  section entrance animation, and shows the date immediately.
- All three images have descriptive `alt` text.
- Each image carries `width`/`height` plus `decoding="async"` so it cannot cause layout shift.
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
