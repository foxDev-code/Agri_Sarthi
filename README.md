# AgriSarthi — Crop Awareness and Early-Detection Concept

> 🌐 **Live Website:** [https://agri-sarthi-lovat.vercel.app](https://agri-sarthi-lovat.vercel.app)

A crop-protection project presented in the AgriSarthi botanical website.
The original scenery, fonts, colors, ten-scene layout, live particle globe
and reversible 57-second scroll choreography are retained.

---

## 🚀 Live Demo & Deployment

- **Production URL:** [https://agri-sarthi-lovat.vercel.app](https://agri-sarthi-lovat.vercel.app)
- **Deployment Platform:** Vercel (Vite preset)

---

## Run Locally on Windows, macOS or Linux

Install a compatible Node.js runtime (Node 22.12+ in the 22 release line).
From this folder run:

```sh
node preview.mjs
```

Open `http://127.0.0.1:4173`. Windows users can also double-click `START-PREVIEW.cmd`. The included dist folder needs no npm install to preview.
Keep the terminal running. See `SETUP-GUIDE.md` for setup details.

To develop and rebuild:

```sh
npm install
npm run dev
npm run build
```

## Content and Evidence

The hero and About scene introduce recurring crop losses and earlier observation. Three floating cards show rice 37.4%, wheat 28.2%, maize 31.2% and soybean 26.3%. The former pricing cards now show the reported tea-sector losses of 147 million kg and Rs 2,865 crore annually.

Open Evidence in the navigation for every supplied project figure, scope, source links and uncertainty notes. `src/crop-evidence.js` contains that content. Figures describe different years, populations and causes, so they must not be added together. Unverified claims are retained as labeled project context: the approximately 30% government attribution, vegetable 46–100% / 5–90% ranges, disease-only 15–25% across 140+ million hectares, and the claimed 30–60% regional trial reduction.

This is an edge-AI product concept, not a deployed diagnostic model. No crop-loss reduction, detection accuracy or automated diagnosis is claimed.

## Working Interactions

- Crop profile and local field workspace.
- Guided scouting checklist.
- Dated observation notes saved in this browser, with text-file download.
- Prepared early-detection workflow explanations.
- Expandable source and evidence notes, including all supplied figures.
- Downloadable contact-message drafts; locally saved newsletter interest.
- Privacy dialog for clearing local preferences and observations.
- Chapter navigation, forward/reverse scrolling and Play/Pause tour.

Manual scroll/touch/navigation interrupts the tour. Desktop cinematic mode uses widths >=601px and heights >=560px. Smaller viewports use stacked sections; reduced motion uses a static layout. No accounts, email delivery, live monitoring, payments or trained AI inference are connected.

## Design and Technical Notes

Vite, semantic HTML/CSS/JavaScript, GSAP and Three.js. Assets and fonts are local; the supplied production build can be viewed without internet.
Original visual provenance and animation comparison are documented in `ASSET-PROMPTS.md` and `REFERENCE-AUDIT.md`. These describe the original video reconstruction. `CROP-CONTENT-AUDIT.md` covers the current adaptation. `AGENT-PROMPT.txt` provides reusable reconstruction guidance and a current crop-content overlay.
