# Reference motion comparison

The original recording was decoded from 7.02s through 80.12s: 4,387 frames. Consecutive-frame differences were measured across the complete interval. Visual inspection used 147 half-second samples, with individual full-size frames checked for text, geometry and scene transitions. This is not a claim that every decoded frame received separate visual inspection.

The recording restarts its embedded video around 13.8s and loops again around 70.8s. The website uses the complete 57-second pass between those points. Desktop recording controls and the operating-system menu at the end are outside the website.

| Animation time | Source time, approximately | Difference addressed |
|---|---|---|
| 0–6.4 | 13.8–20.2 | Longer hero hold, crystal rotation, meter fills, floating-card entrances and grade counter |
| 6.4–8.8 | 20.2–22.6 | Foreground canopy traversal and camera handoff into the branches |
| 8.7–14.3 | 22.5–28.1 | Correct two-branch About scenery, progressive word focus, description and Get started button, downward camera departure |
| 14.2–20 | 28–33.8 | Dark framing, card shells before internal panels, staggered graphs and counters; cards travel upward out of frame |
| 19.5–24 | 33.3–37.8 | Globe assembles with illuminated core, local connections and orbiting lights; text reveals progressively |
| 23.5–29.8 | 37.3–43.6 | One persistent globe descends along a double helix; particle ribbon and opposing card paths with background echoes |
| 29.2–38.1 | 43–51.9 | Separate moving moss sphere, animated arc and study cycle; engine lifts away while evolution enters underneath |
| 35.6–42.5 | 49.4–56.3 | Correct rock-carved mark, oversized horizontal title, progressive platform copy and three missing feature bullets |
| 41.5–47 | 55.3–60.8 | Small canopy grows and rotates behind the progressive individuality message |
| 46.7–52.5 | 60.5–66.3 | Same canopy continues under centered pricing; prices count up; scenery expands into a softened reveal of the stone |
| 52.6–57 | 66.4–70.8 | Glass footer rises, followed separately by the introduction, links, newsletter and lower row |

## Verification

Production build passed. Browser checks covered scene selection, fixed-time transition inspection, backward timeline movement, annual-price updates, responsive cleanup at 390px, and cinematic rendering at 655px. No console warnings or errors were emitted by the final build during these checks. The mobile layout had no horizontal overflow or leftover inert panels or split text.

Open `http://127.0.0.1:4173/?review=1` for an optional visible frame-inspection form. Enter an animation time and choose **Inspect frame**. Add approximately 13.8 seconds to locate that pose in the original recording. The normal URL hides these development controls.

## Remaining fidelity limits

The source video does not contain the original 3D geometry, camera rig or editable design assets. The botanical scenes use regenerated images with layered browser transforms; the globe is live Three.js geometry. This revision matches the observed sequence and fills the identified missing elements, but is not a pixel-identical reconstruction of the original 3D rendering. Small screens use an adapted layout, and reduced-motion preferences remove the cinematic movement.
