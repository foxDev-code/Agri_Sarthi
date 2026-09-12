import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "./scroll-story.css";
import { addReferenceMotion } from "./reference-motion.js";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Times are measured from the uninterrupted 57-second pass in the recording.
export const chapters = [
  { id: "home", name: "Crop awareness", time: 0, enter: 0 },
  { id: "about", name: "Awareness", time: 11, enter: 7.8 },
  { id: "predictions", name: "Crop losses", time: 18.7, enter: 14.2 },
  { id: "oracle", name: "Oracle", time: 22, enter: 19.5 },
  { id: "dashboard", name: "Your field", time: 26.5, enter: 23.55 },
  { id: "engine", name: "Field companion", time: 33, enter: 29.2 },
  { id: "careers", name: "AgriSarthi evolves", time: 40, enter: 35.55 },
  { id: "individual", name: "Every field", time: 44.8, enter: 41.4 },
  { id: "pricing", name: "Tea impact", time: 49.5, enter: 46.7 },
  { id: "contact", name: "Crop clarity", time: 56, enter: 51.15 },
];
const duration = 57;

export function initScrollStory(reducedMotion) {
  const media = gsap.matchMedia();
  const main = document.querySelector("#main");
  document.querySelector(".individual").id = "individual";
  let orbReady;
  const loadOrb = () =>
    (orbReady ||= import("./orb.js")
      .then(({ initOrb }) =>
        initOrb(document.querySelector("#orb-canvas"), reducedMotion),
      )
      .catch((error) =>
        console.warn("Using the static Oracle illustration.", error),
      ));

  media.add(
    "(min-width: 601px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)",
    () => {
      const panels = chapters.map((chapter) =>
        document.getElementById(chapter.id),
      );
      const stage = document.createElement("div");
      stage.className = "story-stage";
      main.classList.add("story-track");
      document.documentElement.classList.add("cinematic-scroll");
      main.prepend(stage);
      panels.forEach((panel, index) => {
        stage.append(panel);
        panel.classList.add("story-scene");
        panel.style.zIndex = index + 1;
        panel.inert = index !== 0;
      });
      const orb = document.querySelector("#orb-stage");
      const orbSlot = document.createComment("Oracle globe home");
      orb.before(orbSlot);
      stage.append(orb);
      orb.classList.add("story-orb");
      const forestBridge = document.createElement("div");
      forestBridge.className = "forest-bridge";
      forestBridge.setAttribute("aria-hidden", "true");
      stage.append(forestBridge);
      const canopy = document.createElement("div");
      canopy.className = "story-canopy";
      canopy.setAttribute("aria-hidden", "true");
      stage.append(canopy);
      panels[5].style.zIndex = "12";
      const echoes = ["left", "right"].map((side) => {
        const echo = document
          .querySelector(".satellite-" + side)
          .cloneNode(true);
        echo.classList.add("satellite-echo-" + side);
        echo.classList.remove("satellite-" + side);
        echo.removeAttribute("data-insight");
        echo.tabIndex = -1;
        echo.setAttribute("aria-hidden", "true");
        echo.inert = true;
        panels[4].append(echo);
        return echo;
      });
      const controls = document.createElement("div");
      controls.className = "story-controls";
      controls.innerHTML = `<button class="tour-toggle" aria-pressed="false"><span aria-hidden="true">▷</span> Play tour</button><span class="chapter-label">01 / Crop awareness</span><nav class="chapter-dots" aria-label="Animation chapters">${chapters.map((c, i) => `<button data-chapter="${c.id}" aria-label="${c.name}" ${i === 0 ? 'aria-current="step"' : ""}><span></span></button>`).join("")}</nav>`;
      document.body.append(controls);
      const play = controls.querySelector(".tour-toggle");
      let tour,
        navigation,
        active = -1;
      const orbitalState = {
        spin: 0,
        spread: 0,
        lower: 0,
        grow: 1,
        assemble: 1,
        helix: 0,
      };
      let orbRequested = false;
      const counters = [...stage.querySelectorAll("[data-count]")].map(
        (element) => ({
          element,
          original: element.textContent,
          value: 0,
          target: Number(element.dataset.count),
          decimals: Number(element.dataset.decimal || 0),
        }),
      );
      let timeline;
      const update = () => {
        const time = timeline.time();
        const index = Math.max(
          0,
          chapters.findLastIndex((c) => time >= c.enter + (c.enter ? 0.45 : 0)),
        );
        stage.dataset.scene = chapters[index].id;
        stage.dataset.time = time.toFixed(2);
        counters.forEach((counter) => {
          counter.element.textContent = counter.value.toFixed(counter.decimals);
        });
        if (index !== active) {
          active = index;
          panels.forEach((panel, i) => {
            panel.inert = i !== index;
            panel.classList.toggle("is-current-scene", i === index);
            panel.setAttribute("aria-hidden", String(i !== index));
          });
          controls.querySelector(".chapter-label").textContent =
            `${String(index + 1).padStart(2, "0")} / ${chapters[index].name}`;
          controls
            .querySelectorAll("[data-chapter]")
            .forEach((button, i) =>
              i === index
                ? button.setAttribute("aria-current", "step")
                : button.removeAttribute("aria-current"),
            );
          document
            .querySelectorAll(".desktop-nav a")
            .forEach((a) =>
              a.classList.toggle("active", a.hash === "#" + chapters[index].id),
            );
        }
        if (time > 16 && time < 32 && !orbRequested) {
          orbRequested = true;
          loadOrb().then(() =>
            orb.dispatchEvent(
              new CustomEvent("story-orbit", {
                detail: { ...orbitalState, cinematic: true },
              }),
            ),
          );
        }
        orb.dispatchEvent(
          new CustomEvent("story-orbit", {
            detail: { ...orbitalState, cinematic: true },
          }),
        );
        document.querySelector(".scroll-progress").style.transform =
          `scaleX(${time / duration})`;
      };
      gsap.set(panels.slice(1), { autoAlpha: 0 });
      gsap.set(orb, { autoAlpha: 0 });
      gsap.set(forestBridge, { autoAlpha: 0 });
      timeline = gsap.timeline({
        defaults: { ease: "none" },
        onUpdate: update,
        scrollTrigger: {
          trigger: main,
          pin: stage,
          start: "top top",
          end: () => `+=${innerHeight * 10}`,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      chapters.forEach((chapter) =>
        timeline.addLabel(chapter.id, chapter.time),
      );
      gsap.set(canopy, { autoAlpha: 0 });
      const restoreHeadings = addReferenceMotion({
        gsap,
        timeline,
        panels,
        orb,
        forestBridge,
        canopy,
        orbitalState,
        counters,
      });
      const stopTour = () => {
        tour?.kill();
        tour = null;
        play.setAttribute("aria-pressed", "false");
        play.innerHTML = '<span aria-hidden="true">▷</span> Play tour';
      };
      const goTo = (id, instant = false) => {
        const chapter = chapters.find((c) => c.id === id);
        if (!chapter) return;
        stopTour();
        navigation?.kill();
        if (Math.abs(timeline.scrollTrigger.end - timeline.scrollTrigger.start - innerHeight * 10) > 1) ScrollTrigger.refresh();
        const trigger = timeline.scrollTrigger;
        navigation = gsap.to(window, {
          scrollTo: {
            y:
              trigger.start +
              (chapter.time / duration) * (trigger.end - trigger.start),
            autoKill: false,
          },
          duration: instant ? 0 : 1.25,
          ease: "power2.inOut",
        });
      };
      const click = (event) => {
        const chapterButton = event.target.closest("[data-chapter]");
        const anchor = event.target.closest('a[href^="#"]');
        const id =
          chapterButton?.dataset.chapter ||
          (anchor && !anchor.dataset.action ? anchor.hash.slice(1) : null);
        if (!id || !chapters.some((c) => c.id === id)) return;
        event.preventDefault();
        goTo(id);
        history.replaceState(null, "", "#" + id);
      };
      document.addEventListener("click", click, true);
      play.addEventListener("click", () => {
        if (tour) {
          stopTour();
          return;
        }
        navigation?.kill();
        const trigger = timeline.scrollTrigger;
        if (timeline.time() > 55.5) {
          window.scrollTo({ top: 0, behavior: "instant" });
          timeline.progress(0);
        }
        play.setAttribute("aria-pressed", "true");
        play.innerHTML = '<span aria-hidden="true">Ⅱ</span> Pause tour';
        tour = gsap.to(window, {
          scrollTo: { y: trigger.end, autoKill: false },
          duration: Math.max(1, duration - timeline.time()),
          ease: "none",
          onComplete: stopTour,
        });
      });
      const interrupt = (event) => {
        if (event.type === 'pointerdown' && event.target.closest('.tour-toggle')) return;
        if (
          event.type !== "keydown" ||
          [
            "ArrowDown",
            "ArrowUp",
            "PageDown",
            "PageUp",
            "Home",
            "End",
            " ",
          ].includes(event.key)
        ) {
          stopTour();
          navigation?.kill();
        }
      };
      window.addEventListener("wheel", interrupt, { passive: true });
      window.addEventListener("touchstart", interrupt, { passive: true });
      window.addEventListener("keydown", interrupt);
      window.addEventListener("pointerdown", interrupt);
      const dialog = document.querySelector("#experience-dialog");
      const dialogObserver = new MutationObserver(() => {
        if (dialog.open) stopTour();
      });
      dialogObserver.observe(dialog, {
        attributes: true,
        attributeFilter: ["open"],
      });
      update();
      ScrollTrigger.refresh();
      let disposed = false;
      const initialHash = location.hash.slice(1);
      document.fonts.ready.then(() =>
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (disposed) return;
            ScrollTrigger.refresh();
            goTo(initialHash || "home", true);
          }),
        ),
      );
      let review;
      if (new URLSearchParams(location.search).has("review")) {
        review = document.createElement("form");
        review.className = "motion-review";
        review.innerHTML =
          '<label>Animation time (seconds)<input aria-label="Animation time in seconds" type="number" min="0" max="57" step="0.05" value="0"></label><button>Inspect frame</button><small>Reference recording = animation time + 13.8 seconds</small>';
        review.addEventListener("submit", (event) => {
          event.preventDefault();
          stopTour();
          navigation?.kill();
          if (Math.abs(timeline.scrollTrigger.end - timeline.scrollTrigger.start - innerHeight * 10) > 1) ScrollTrigger.refresh();
          const seconds = Math.max(
            0,
            Math.min(57, Number(review.querySelector("input").value) || 0),
          );
          const trigger = timeline.scrollTrigger;
          gsap.set(window, {
            scrollTo: {
              y:
                trigger.start +
                (seconds / duration) * (trigger.end - trigger.start),
            },
          });
          ScrollTrigger.update();
          trigger.getTween()?.progress(1);
          timeline.time(seconds);
        });
        document.body.append(review);
      }
      return () => {
        disposed = true;
        restoreHeadings();
        echoes.forEach((echo) => echo.remove());
        review?.remove();
        stopTour();
        navigation?.kill();
        dialogObserver.disconnect();
        document.removeEventListener("click", click, true);
        window.removeEventListener("wheel", interrupt);
        window.removeEventListener("touchstart", interrupt);
        window.removeEventListener("keydown", interrupt);
        window.removeEventListener("pointerdown", interrupt);
        orbSlot.replaceWith(orb);
        orb.classList.remove("story-orb");
        orb.dispatchEvent(
          new CustomEvent("story-orbit", {
            detail: { cinematic: false, spread: 0, lower: 0, grow: 1, spin: 0 },
          }),
        );
        panels.forEach((panel) => {
          panel.inert = false;
          panel.style.removeProperty("z-index");
          panel.removeAttribute("aria-hidden");
          panel.classList.remove("story-scene", "is-current-scene");
          main.append(panel);
        });
        stage.remove();
        counters.forEach((counter) => {
          counter.element.textContent = counter.original;
        });
        controls.remove();
        main.classList.remove("story-track");
        document.documentElement.classList.remove("cinematic-scroll");
      };
    },
  );

  // Longer, stacked mobile cards stay readable; the scenery still tracks scrolling.
  media.add(
    "(max-width: 600px), (max-height: 559px), (prefers-reduced-motion: reduce)",
    () => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            loadOrb();
            observer.disconnect();
          }
        },
        { rootMargin: "600px" },
      );
      observer.observe(document.querySelector("#orb-stage"));
      if (!reducedMotion.matches) {
        document.querySelectorAll(".scene").forEach((section) => {
          const background = section.querySelector(".landscape");
          if (background)
            gsap.fromTo(
              background,
              { scale: 1.08 },
              {
                scale: 1.35,
                yPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              },
            );
          const items = section.querySelectorAll(
            ".section-heading,.prediction-card,.engine-card,.price-card",
          );
          items.forEach((item) =>
            gsap.from(item, {
              y: 55,
              opacity: 0,
              duration: 0.8,
              ease: "ui-out",
              scrollTrigger: { trigger: item, start: "top 88%", once: true },
            }),
          );
        });
      }
      return () => observer.disconnect();
    },
  );
  window.addEventListener("load", () => ScrollTrigger.refresh());
}


