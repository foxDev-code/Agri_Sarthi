// Choreography measured against the complete pass beginning at source 13.8s.
// All decorative paths are deterministic functions of scroll time, so reversing
// scroll returns through the same poses instead of starting new animations.
export function addReferenceMotion({
  gsap,
  timeline: t,
  panels: p,
  orb,
  forestBridge,
  canopy,
  orbitalState,
  counters,
}) {
  const originals = [];
  for (const heading of document.querySelectorAll(
    ".section-heading h2,.evolve-copy h3",
  )) {
    originals.push([heading, heading.innerHTML]);
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const fragment = document.createDocumentFragment();
      for (const token of node.textContent.split(/(\s+)/)) {
        if (!token) continue;
        if (/^\s+$/.test(token))
          fragment.append(document.createTextNode(token));
        else {
          const span = document.createElement("span");
          span.className = "motion-word";
          span.textContent = token;
          fragment.append(span);
        }
      }
      node.replaceWith(fragment);
    }
  }
  const heading = (selector, time) => {
    const el = document.querySelector(selector);
    const words = el.querySelectorAll(".motion-word");
    if (words.length)
      t.fromTo(
        words,
        { opacity: 0, filter: "blur(7px)", y: 10 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.55,
          stagger: 0.075,
          ease: "power2.out",
        },
        time,
      );
    const eyebrow = el.querySelector(".eyebrow");
    if (eyebrow)
      t.fromTo(
        eyebrow,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        time - 0.1,
      );
    const body = el.querySelectorAll(
      ":scope > p:not(.eyebrow),:scope > .button,:scope > .button-row",
    );
    if (body.length)
      t.fromTo(
        body,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.2 },
        time + 0.75,
      );
  };
  const reveal = (i, time, duration = 0.5) =>
    t.to(p[i], { autoAlpha: 1, duration }, time);
  const hide = (i, time, duration = 0.5) =>
    t.to(p[i], { autoAlpha: 0, duration }, time);
  counters.forEach((counter) =>
    t.fromTo(
      counter,
      { value: 0 },
      {
        value: counter.target,
        duration: counter.element.closest(".hero") ? 3.2 : 1.25,
        ease: "power2.out",
      },
      counter.element.closest(".hero") ? 0.45 : 17.5,
    ),
  );

  // Hero: hold while crystal, meters and floating cards settle; enter the canopy.
  t.fromTo(
    ".hero-product",
    { scale: 0.94, rotationZ: -1.5 },
    { scale: 1, rotationZ: 0, duration: 3.6 },
    0,
  )
    .fromTo(
      ".crystal-art",
      { rotationY: -15, rotationZ: -5 },
      { rotationY: 12, rotationZ: 4, duration: 6.3 },
      0,
    )
    .fromTo(
      ".meter i",
      { scaleX: 0.08, transformOrigin: "left center" },
      { scaleX: 1, duration: 3.2, stagger: 0.25 },
      0.7,
    )
    .fromTo(
      ".floating-grade",
      { opacity: 0, scale: 0.9, y: 18 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8 },
      0.3,
    )
    .fromTo(
      ".floating-note",
      { opacity: 0.2, x: -20 },
      { opacity: 1, x: 0, duration: 1.2 },
      0.2,
    )
    .fromTo(".hero-landscape", { scale: 1 }, { scale: 1.035, duration: 6.3 }, 0)
    .to(".hero-copy", { yPercent: -155, opacity: 0, duration: 1.1 }, 6.4)
    .to(
      ".hero-product",
      { yPercent: -190, scale: 0.9, opacity: 0, duration: 1.3 },
      6.5,
    )
    .to(".hero-bottom", { y: -45, opacity: 0, duration: 0.65 }, 6.5)
    .to(".hero-landscape", { scale: 2.6, yPercent: -28, duration: 1.6 }, 6.4)
    .fromTo(
      forestBridge,
      { autoAlpha: 0, scale: 0.8, yPercent: 95, rotation: -8 },
      { autoAlpha: 1, scale: 2.1, yPercent: 0, rotation: 0, duration: 1.05 },
      6.55,
    )
    .to(
      forestBridge,
      { scale: 3.4, yPercent: -95, autoAlpha: 0, duration: 1.1 },
      7.7,
    );
  hide(0, 7.8, 0.5);
  reveal(1, 7.7, 0.6);
  // About: camera moves between two branches, holds, then drops beneath them.
  t.fromTo(
    ".about-landscape",
    { scale: 1.42, yPercent: 12 },
    { scale: 1.02, yPercent: 0, duration: 1.5 },
    7.8,
  );
  heading(".about .section-heading", 8.7);
  t.to(
    ".about .section-heading",
    { yPercent: -160, opacity: 0, duration: 1.15 },
    11.7,
  ).to(".about-landscape", { scale: 1.62, yPercent: -38, duration: 2.4 }, 11.8);
  hide(1, 13.5, 0.8);
  reveal(2, 14.2, 0.5);
  heading(".predictions .section-heading", 14.65);
  // Forecast: shells rise first, then the internal panels, graphs and counters.
  t.fromTo(
    ".prediction-tree",
    { scale: 1.35, yPercent: 18 },
    { scale: 1, yPercent: 0, duration: 2.7 },
    14.3,
  )
    .fromTo(
      ".prediction-card",
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.95,
        stagger: 0.18,
        ease: "power2.out",
      },
      16.5,
    )
    .fromTo(
      ".prediction-card .metric-panel,.focus-pill",
      { opacity: 0, y: 15, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12 },
      17.3,
    )
    .fromTo(
      ".bar-chart i",
      { scaleY: 0.03, transformOrigin: "center bottom" },
      { scaleY: 1, duration: 0.8, stagger: 0.08 },
      17.7,
    )
    .fromTo(
      ".focus-card .chart-stroke",
      { strokeDasharray: 270, strokeDashoffset: 270 },
      { strokeDashoffset: 0, duration: 1 },
      17.65,
    )
    .fromTo(
      ".card-description",
      { opacity: 0 },
      { opacity: 1, duration: 0.6, stagger: 0.12 },
      17.55,
    )
    .to(".prediction-grid", { yPercent: -170, duration: 0.9 }, 19.05)
    .to(
      ".predictions .section-heading",
      { yPercent: -180, opacity: 0, duration: 0.7 },
      19,
    )
    .to(
      ".prediction-tree",
      { yPercent: -55, opacity: 0, duration: 0.9 },
      19.05,
    );
  hide(2, 19.65, 0.4);
  reveal(3, 19.5, 0.5);
  heading(".oracle .section-heading", 19.8);
  t.to(orb, { autoAlpha: 1, duration: 0.8 }, 19.6)
    .fromTo(
      orbitalState,
      { grow: 0.45, spin: 0, assemble: 0 },
      { grow: 1, spin: 1.1, assemble: 1, duration: 1.6 },
      19.7,
    )
    .to(orbitalState, { spin: 1.8, duration: 2.4 }, 21.3)
    .fromTo(
      ".oracle-copy",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.65 },
      21.1,
    )
    .to(
      ".oracle .section-heading",
      { yPercent: -190, opacity: 0, duration: 0.9 },
      23.25,
    )
    .to(".oracle-copy", { y: -160, opacity: 0, duration: 1 }, 23.3);
  hide(3, 24, 0.6);
  reveal(4, 23.55, 0.65);
  heading(".dashboard .section-heading", 23.85);
  // The globe descends along the double helix while the card field orbits it.
  t.to(
    orbitalState,
    { spread: 1, lower: 1, grow: 0.96, spin: 4.3, helix: 1, duration: 4.9 },
    23.35,
  )
    .fromTo(
      ".satellite-left",
      { xPercent: -35, y: "-45vh", rotation: -7, opacity: 0 },
      { xPercent: 0, y: "6vh", rotation: 0, opacity: 1, duration: 4.8 },
      23.5,
    )
    .fromTo(
      ".satellite-right",
      { xPercent: 30, y: "45vh", rotation: 7, opacity: 0 },
      { xPercent: 0, y: "-36vh", rotation: 0, opacity: 1, duration: 4.8 },
      23.5,
    )
    .fromTo(
      ".satellite-echo-left",
      { y: "85vh", opacity: 0, rotation: -5 },
      { y: "25vh", opacity: 0.55, rotation: 0, duration: 4.6 },
      24.3,
    )
    .fromTo(
      ".satellite-echo-right",
      { y: "-85vh", opacity: 0, rotation: 5 },
      { y: "-30vh", opacity: 0.45, rotation: 0, duration: 4.6 },
      24.3,
    )
    .to(
      ".dashboard .section-heading",
      { yPercent: -190, opacity: 0, duration: 0.9 },
      28.35,
    )
    .to(
      ".satellite-card",
      { y: "-80vh", opacity: 0, duration: 1.15, stagger: 0.07 },
      28.5,
    )
    .to(
      orbitalState,
      { lower: 2.8, grow: 0.75, spread: 1.6, spin: 5.5, duration: 1.2 },
      28.4,
    )
    .to(orb, { autoAlpha: 0, yPercent: -30, duration: 0.7 }, 29.1);
  hide(4, 29.35, 0.5);
  reveal(5, 29.2, 0.65);
  t.fromTo(
    p[5],
    { yPercent: 90 },
    { yPercent: 0, duration: 1.05 },
    29.2,
  ).fromTo(
    ".engine-landscape",
    { scale: 1.14, yPercent: 6 },
    { scale: 1, yPercent: 0, duration: 1.7 },
    29.3,
  );
  heading(".engine .section-heading", 30);
  t.fromTo(
    ".engine-card",
    { y: 35, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
    30.8,
  )
    .fromTo(
      ".arc path",
      { strokeDasharray: 340, strokeDashoffset: 340 },
      { strokeDashoffset: 0, duration: 1.2 },
      30.9,
    )
    .fromTo(
      ".arc circle:last-child",
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
      32,
    )
    .fromTo(
      ".study-cycle",
      { rotation: -40, opacity: 0 },
      { rotation: 0, opacity: 1, duration: 1 },
      31,
    )
    .to(".study-cycle", { rotation: 55, duration: 4 }, 32)
    .fromTo(
      ".moss-orb",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.5 },
      29.6,
    );
  // Repeating elliptical route with near/far depth poses, driven by story time.
  const ball = { phase: 0 };
  const moss = document.querySelector(".moss-orb");
  const moveBall = () => {
    const a = ball.phase;
    gsap.set(moss, {
      x: Math.cos(a) * innerWidth * 0.23,
      y: Math.sin(a) * innerHeight * 0.22,
      scale: 0.78 + (Math.sin(a) + 1) * 0.25,
      rotation: a * 45,
    });
  };
  t.to(ball, { phase: Math.PI * 5.3, duration: 6.5, onUpdate: moveBall }, 29.5);
  // Preserve the overlap: engine lifts away while the oversized title enters.
  reveal(6, 35.55, 0.4);
  t.to(p[5], { yPercent: -110, duration: 2.5 }, 35.6).to(
    ".moss-orb",
    { opacity: 0, duration: 0.5 },
    35.8,
  );
  hide(5, 37.8, 0.3);
  t.fromTo(".evolve-title", { x: "70vw" }, { x: "-20vw", duration: 5.45 }, 35.6)
    .fromTo(".evolve-title", { y: "32vh" }, { y: 0, duration: 3 }, 35.6)
    .fromTo(
      ".evolve-stone",
      { yPercent: 75, scale: 1.04 },
      { yPercent: 0, scale: 1, duration: 3.1 },
      35.8,
    );
  heading(".evolve-copy", 38.05);
  t.fromTo(
    ".evolve-features li",
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.45, stagger: 0.18 },
    39.1,
  ).to(p[6], { yPercent: -105, duration: 1.35 }, 41.15);
  hide(6, 42.1, 0.4);
  reveal(7, 41.4, 0.5);
  t.fromTo(
    canopy,
    { autoAlpha: 0, scale: 0.16, rotation: -25, yPercent: 45 },
    { autoAlpha: 1, scale: 0.9, rotation: 0, yPercent: 0, duration: 1.7 },
    41.5,
  ).to(canopy, { scale: 1.18, rotation: 10, duration: 3.1 }, 43.2);
  heading(".individual .section-heading", 42.7);
  // Same canopy persists under pricing. No second background fading into place.
  t.to(
    ".individual .section-heading",
    { opacity: 0, scale: 1.05, duration: 0.65 },
    46.3,
  ).to(canopy, { scale: 1.65, rotation: 15, duration: 1.3 }, 46.3);
  hide(7, 46.8, 0.4);
  reveal(8, 46.7, 0.5);
  const priceReveal = { progress: 0 };
  const priceElements = [...document.querySelectorAll("[data-price]")];
  t.fromTo(
    priceReveal,
    { progress: 0 },
    {
      progress: 1,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        priceElements.forEach((el, i) => {
          el.textContent = (
            Number(el.dataset.value) * priceReveal.progress
          ).toLocaleString("en-IN", { maximumFractionDigits: 0 });
        });
      },
    },
    46.9,
  );
  t.fromTo(
    ".price-card",
    { yPercent: 120, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.05,
      stagger: 0.16,
      ease: "power2.out",
    },
    46.7,
  )
    .fromTo(
      ".price-card > *",
      { opacity: 0 },
      { opacity: 1, duration: 0.6, stagger: 0.035 },
      47.25,
    )
    .fromTo(
      ".billing-toggle",
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      48,
    )
    .to(canopy, { scale: 1.85, rotation: 19, duration: 3 }, 47.6)
    .to(
      ".pricing-grid,.billing-toggle,.pricing-footnote",
      { opacity: 0, xPercent: -12, duration: 0.7 },
      50.85,
    )
    .to(canopy, { scale: 3.7, rotation: 22, duration: 1.4 }, 51)
    .to(canopy, { autoAlpha: 0, duration: 0.4 }, 52.15);
  hide(8, 51.5, 0.4);
  reveal(9, 51.15, 0.7);
  t.fromTo(
    p[9],
    { maskImage: 'radial-gradient(ellipse,#000 45%,transparent 70%)', maskPosition: '55% 53%', maskRepeat: 'no-repeat', maskSize: '1% 1%' },
    { maskSize: '280% 280%', duration: 1.15 },
    51.15,
  )
    .fromTo(
      ".footer-landscape",
      { scale: 1.2, yPercent: 0 },
      { scale: 1, yPercent: 0, duration: 1.7 },
      51.4,
    )
    .fromTo(
      ".footer-panel",
      { yPercent: 90, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.5 },
      52.6,
    )
    .fromTo(
      ".footer-intro > *",
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.2 },
      53,
    )
    .fromTo(
      ".footer-links > *",
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.14 },
      54,
    )
    .fromTo(
      ".footer-news > *",
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.22 },
      54.9,
    )
    .fromTo(".footer-bottom", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 56)
    .to({}, { duration: 0.5 }, 56.5);
  return () => {
    originals.forEach(([heading, html]) => {
      heading.innerHTML = html;
    });
    priceElements.forEach((el, i) => {
      el.textContent = Number(el.dataset.value).toLocaleString("en-IN");
    });
  };
}
