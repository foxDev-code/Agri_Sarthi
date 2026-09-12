# Crop-content adaptation audit

Completed 2026-09-11. This covers the crop-project content adaptation, not a
new frame-by-frame reconstruction of the original video.

## Requirement coverage

| Project requirement | Implemented location and treatment |
| --- | --- |
| Recurring India losses, 15–25% | About scene; Evidence explains the broader biotic scope of the CEEW estimate |
| India around 30%, described as government estimate | Evidence retains the claim with an explicit unverified-attribution label and links a parliamentary reply; no false government endorsement |
| FAO global up to 40% | Hero counter, introduction and source disclosure |
| Rice 37.4%, wheat 28.2%, maize 31.2%, soybean 26.3% | Animated crop cards and Evidence; historical global, multi-cause scope explained |
| Vegetables 46–100% insect pests / 5–90% diseases | Evidence disclosure; exact studies and conditions unverified |
| Tea 147 million kg / Rs 2,865 crore per year | Two animated impact cards, source button and 2023 TRA report disclosure |
| Industry disease-only 15–25% across 140+ million hectares | Evidence retains the supplied framing and states what remains unverified |
| Wheat, rice, cotton; tomatoes, chilies, grapes, mangoes | Evolution scene and industry-context disclosure |
| Karnataka, Maharashtra, Andhra Pradesh trials; 30–60% reduction | Evidence lists all regions and the claimed range; no identifiable trial established, no Pyko performance claim |
| Early detection and targeted intervention rationale | Intelligence, field companion, evolution and evidence scenes; proposed edge-AI capability distinguished from local demo functions |
| Preserve current appearance | Original CSS, image assets, fonts, orb implementation, scene selectors, order and timeline timings retained; copy, counters and actions adapted |

## Browser and build evidence

- Vite production build passed after the final code changes.
- Inspected rendered hero, About, crop cards, Oracle, dashboard, field
  companion, evolution, individuality, tea impact and footer scenes.
- Desktop inspection at 1286x900; mobile at 390x844; default narrow desktop
  pane also inspected. No page-width overflow was detected in the mobile
  DOM check. Mobile cleanup removed inert flags and split-word wrappers.
- Tea totals remained 147 and 2,865 after switching from cinematic to mobile.
- Opened Evidence and expanded the trial caveat; confirmed all eight data
  groups are present. Read the source opens the tea disclosure directly.
- Saved a sample field observation, reloaded, and verified it persisted.
  Checked crop onboarding and the prepared edge-AI explanation.
- Verified forward chapter navigation to tea impact and reverse navigation
  to Oracle. Explicit user-input handlers still interrupt navigation/tour;
  navigation no longer relies on ScrollTo autoKill's scroll-position test.
- Browser error-log inspection returned no JavaScript errors.
- Note export code creates a text Blob and download link. The in-app
  browser did not report a completed download event during this check;
  successful file delivery is not claimed. The UI keeps notes readable and
  explains that a blocked download does not remove the saved observations.
- Original style bundle identifier remains index-3VpawkP_.css and the orb
  bundle identifier remains orb-C4w2rrON.js; these assets were not redesigned.

## Limits

This is a website and functional local field notebook, not a trained
edge-AI diagnostic deployment. Exact reference-video pixel matching is not
claimed. Source notes intentionally retain uncertainty where the supplied
claims lack identifiable studies. Reduced-motion and WebGL fallback code
is retained from the original site; those settings were not newly emulated
in this content pass.
