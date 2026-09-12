import { evidenceHTML } from "./crop-evidence.js";
import "./style.css";
import { initScrollStory } from "./scroll-story.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("ui-out", "0.23,1,0.32,1");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const mark = `<svg viewBox="0 0 32 40" aria-hidden="true"><path d="M2 1 10 4V37L2 40ZM14 5 29 10V20L14 18ZM14 23 29 21V31L14 36Z" fill="currentColor"/></svg>`;
const arrow = `<span class="arrow" aria-hidden="true">↗</span>`;
const logo = `<a class="logo" href="#home" aria-label="AgriSarthi home">${mark}<span>AgriSarthi</span></a>`;
const button = (label, action = "start", cls = "") =>
  `<button class="button ${cls}" data-action="${action}">${label}${arrow}</button>`;
const spark = `<svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 1c0 14-5 19-19 19 14 0 19 5 19 19 0-14 5-19 19-19C25 20 20 15 20 1Z" fill="currentColor"/></svg>`;
const lineChart = `<svg class="line-chart" viewBox="0 0 240 95" aria-hidden="true"><path class="chart-grid" d="M0 20H240M0 50H240M0 80H240"/><path class="chart-fill" d="M0 76 Q20 75 35 60T70 66T110 57T155 45T185 43T220 15L240 9V95H0Z"/><path class="chart-stroke" d="M0 76 Q20 75 35 60T70 66T110 57T155 45T185 43T220 15L240 9"/></svg>`;

document.querySelector("#app").innerHTML = `
  <header class="site-header">
    ${logo}
    <nav class="desktop-nav" aria-label="Main navigation">
      <a href="#home" class="active">Home</a><a href="#about">About</a><button data-action="careers">Evidence</button><a href="#pricing">Impact</a>
    </nav>
    <div class="header-actions"><button class="login" data-action="workspace">Field notes</button>${button("Get started", "start", "header-cta")}
      <details class="mobile-menu"><summary aria-label="Open navigation"><span></span><span></span></summary><nav aria-label="Mobile navigation"><a href="#home">Home</a><a href="#about">About</a><a href="#pricing">Impact</a><button data-action="careers">Evidence</button><button data-action="workspace">Field workspace</button></nav></details>
    </div>
  </header>
  <main id="main">
    <section class="hero scene" id="home" aria-labelledby="hero-title">
      <div class="hero-landscape landscape" aria-hidden="true"></div><div class="hero-shade" aria-hidden="true"></div>
      <div class="hero-copy">
        <p class="eyebrow">Edge AI for earlier crop awareness</p>
        <h1 id="hero-title">See the earliest signs.<br><em>Protect what grows.</em></h1>
        ${button("Get started")}
      </div>
      <div class="hero-product" aria-label="Crop awareness concept preview">
        <div class="product-card">
          <div class="crystal-art" aria-hidden="true"></div>
          <div class="product-copy"><em>Crop Awareness</em><span>Observe symptoms</span><div class="meter"><i></i></div><span>Record changes</span><div class="meter gold"><i></i></div></div>
        </div>
        <div class="floating-note"><em>A small sign today.<br>A different harvest tomorrow.</em><span>Notice sooner.<br>Respond with clarity.</span></div>
        <div class="floating-grade"><strong><span data-count="40">40</span>%</strong><em>Global loss · up to</em>${button("Explore evidence", "careers", "dark")}</div>
      </div>
      <div class="hero-bottom"><div><p>Pests and diseases take a share of harvests every year. FAO estimates losses of up to 40% globally. AgriSarthi explores how earlier observation can support timely crop care.</p><a class="text-link" href="#about">Learn more <span aria-hidden="true">↗</span></a></div><a class="scroll-cue" href="#about">${spark}<em>Scroll to explore</em></a></div>
    </section>
    <section class="about scene" id="about" aria-labelledby="about-title">
      <div class="about-landscape landscape" aria-hidden="true"></div>
      <div class="section-heading reveal"><p class="eyebrow">About us</p><h2 id="about-title">Awareness is <em>your<br>first line of care.</em></h2><p>Indian crop losses are estimated at 15–25% from pests,<br>diseases, weeds and other biotic threats. Behind every number<br>is a season of work. Our edge-AI concept brings observation<br>closer to the field, so early signs can lead to informed action.</p>${button("Get started")}</div>
      <div class="about-caption reveal"><span>Less guesswork.</span><span>More understanding.</span><span>A clearer way forward.</span></div>
    </section>
    <section class="predictions scene" id="predictions" aria-labelledby="predictions-title">
      <div class="prediction-tree" aria-hidden="true"></div>
      <div class="section-heading reveal"><p class="eyebrow">The scale of crop loss</p><h2 id="predictions-title">See what is at risk.<br><em>Act before it spreads.</em></h2><p>Historical global estimates reveal losses across staple crops.<br>These include weeds, animal pests and pathogens; they are<br>context for prevention, not predictions for an individual farm.</p></div>
      <div class="prediction-grid">
        <button class="prediction-card reveal" data-insight="grade"><div class="metric-panel"><span>Rice loss</span><strong><span data-count="37.4" data-decimal="1">37.4</span></strong><small>Percent · historical global estimate</small><div class="bar-chart" aria-hidden="true">${[25, 48, 38, 70, 64, 85, 93].map((n) => `<i style="--bar:${n}%"></i>`).join("")}</div></div><div class="card-description"><h3>Rice loss</h3><p>Rice: 37.4% estimated loss. Explore the source, scope and comparison across staple crops.</p><span class="card-arrow" aria-hidden="true">↗</span></div></button>
        <button class="prediction-card focus-card reveal" data-insight="focus"><div class="focus-pill">${spark}<div><strong><span data-count="26.3" data-decimal="1">26.3</span>%</strong><small>Soybean loss</small></div></div><div class="metric-panel white-panel"><span>Wheat loss</span><strong><span data-count="28.2" data-decimal="1">28.2</span>%</strong>${lineChart}</div><div class="card-description"><h3>Wheat loss</h3><p>Wheat: 28.2%. Soybean: 26.3%. Historical global losses show why crop protection matters.</p><span class="card-arrow" aria-hidden="true">↗</span></div></button>
        <button class="prediction-card stability-card reveal" data-insight="stability"><div class="metric-panel"><div class="metric-top"><span>Maize loss</span><small>GLOBAL</small></div><strong><span data-count="31.2" data-decimal="1">31.2</span>%</strong><small>Historical loss estimate</small><div class="stability-list"><span><i></i>Rice <b>37.4%</b></span><span><i></i>Wheat <b>28.2%</b></span><span><i></i>Soybean <b>26.3%</b></span></div></div><div class="card-description"><h3>Staples under pressure</h3><p>Maize: 31.2%. Losses vary with region, weather, crop stage and management.</p><span class="card-arrow" aria-hidden="true">↗</span></div></button>
      </div>
    </section>
    <section class="oracle scene" id="oracle" aria-labelledby="oracle-title">
      <div class="section-heading reveal"><p class="eyebrow">Intelligence closer to the field</p><h2 id="oracle-title">Earlier signals.<br><em>A clearer next move.</em></h2></div>
      <div class="orb-stage" id="orb-stage" aria-hidden="true"><div class="orb-fallback"></div><canvas id="orb-canvas"></canvas></div>
      <div class="oracle-copy reveal"><p>An edge-AI early-detection concept.<br>Bring symptom capture and crop context together, then support<br>expert review. Explore the workflow; live diagnosis is not connected.</p>${button("Explore early detection", "oracle")}</div>
      <span class="orb-coordinate left">01 / INTELLIGENCE</span><span class="orb-coordinate right">EVERYTHING IS CONNECTED</span>
    </section>
    <section class="dashboard scene" id="dashboard" aria-labelledby="dashboard-title">
      <div class="dashboard-glow" aria-hidden="true"></div><div class="helix" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="section-heading reveal"><p class="eyebrow">Field awareness</p><h2 id="dashboard-title">A clearer way to<br><em>Observe Your Crop</em></h2><p>Keep crop, location and symptom observations together.<br>Build a record for follow-up and expert review. This preview<br>stores field notes locally; it does not monitor a live farm.</p></div>
      <div class="dashboard-preview reveal"><div class="dashboard-top"><span>${mark} Your field, in focus</span><span class="live-dot">Illustrative record</span></div><div class="dashboard-metrics"><div><small>Plants checked</small><strong>24<span> plants</span></strong><span class="positive">Sample scouting entry</span></div><div><small>Symptoms observed</small><strong>3<span> plants</span></strong><span class="muted">Example only · not live data</span></div></div>${lineChart}<div class="week-labels"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div></div>
      <button class="satellite-card satellite-left reveal" data-insight="grade"><span class="mini-graph" aria-hidden="true"><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="1 6"/></svg></span><h3>Crop Context & Evidence</h3><p>Understand the loss estimates behind the need for earlier crop care.</p></button>
      <button class="satellite-card satellite-right reveal" data-action="study">${spark}<h3>Observation History</h3><p>Record symptoms and changes to support a clearer follow-up.</p></button>
    </section>
    <section class="engine scene" id="engine" aria-labelledby="engine-title"><div class="engine-landscape landscape" aria-hidden="true"></div><div class="moss-orb" aria-hidden="true"></div><div class="section-heading reveal"><p class="eyebrow">Field companion</p><h2 id="engine-title">A companion built<br><em>for how you grow.</em></h2><p>From scouting to field notes, build a repeatable observation routine.<br>The edge-AI vision is local assistance, with expert review when needed.</p></div><div class="engine-grid"><button class="engine-card reveal" data-action="focus"><svg class="arc" viewBox="0 0 240 130" aria-hidden="true"><path d="M20 110C20 10 120-20 210 35"/><circle cx="20" cy="110" r="5"/><circle cx="210" cy="35" r="5"/></svg><h3>Guided Field Scouting</h3><p>Use a short observation checklist. Capture crop context and changes before requesting expert guidance.</p></button><button class="engine-card reveal" data-action="study"><div class="study-cycle" aria-hidden="true"><span>Observe</span><span>Record</span><span>Review</span><span>Follow up</span><i>↻</i></div><h3>Local Observation Notes</h3><p>Save a dated field observation on this device and download a record for your own follow-up.</p></button></div></section>
    <section class="evolve scene" id="careers" aria-labelledby="evolve-title"><div class="evolve-stone" aria-hidden="true"></div><h2 id="evolve-title" class="evolve-title reveal"><span>AgriSarthi</span> evolves — <span class="evolve-tail">with you.</span></h2><div class="evolve-copy reveal"><p class="eyebrow">Designed around the field</p><h3>A platform that<br><em>grows with your field</em></h3><p>Wheat, rice and cotton face recurring pressure. Tomatoes, chilies, grapes and mangoes can face severe outbreaks. AgriSarthi’s proposed edge-AI assistant connects early observation with crop context, so the next step can be reviewed before damage spreads.</p><ul class="evolve-features"><li>Capture crop, location and visible symptoms</li><li>Keep observations available on the same device</li><li>Support timely review by a local crop expert</li></ul>${button("Our philosophy", "philosophy")}</div></section>
    <section class="individual scene" aria-labelledby="individual-title"><div class="canopy landscape" aria-hidden="true"></div><div class="section-heading reveal"><p class="eyebrow">Every field has its own story</p><h2 id="individual-title">Every crop is different.<br>Every field, unique. <em>Your<br class="individual-break">guidance should reflect it.</em></h2><p>Your crop. Your conditions. Your season.<br>Earlier awareness starts with what is happening in your field.</p><div class="button-row">${button("Explore AgriSarthi")}<a class="text-link" href="#pricing">Explore the impact ↗</a></div></div></section>
    <section class="pricing scene" id="pricing" aria-labelledby="pricing-title"><div class="pricing-canopy landscape" aria-hidden="true"></div><div class="section-heading reveal"><p class="eyebrow">One crop. A significant cost.</p><h2 id="pricing-title">The cost of waiting.<br><em>The case for awareness.</em></h2><div class="billing-toggle" role="group" aria-label="Evidence view"><button data-billing="monthly" aria-pressed="true">Tea losses</button><button data-billing="yearly" aria-pressed="false">Source <span>2023</span></button></div></div><div class="pricing-grid"><article class="price-card reveal"><p class="plan-label">ANNUAL TEA CROP LOSS</p><h3>A harvest under pressure.</h3><div class="price"><span>~</span><strong data-price="essential" data-value="147">147</strong><small>million kg / year</small></div><p class="billing-note">TRA estimate · reported 2023</p><ul><li>Indian tea plantations</li><li>Annual loss attributed to pests</li><li>Reported by Tea Research Association</li><li>Sector estimate, not a farm forecast</li></ul>${button("Read the source", "essential")}</article><article class="price-card featured reveal"><div class="popular">ONE CROP. A WIDER CHALLENGE.</div><p class="plan-label">ANNUAL REVENUE LOSS</p><h3>The economic cost.</h3><div class="price"><span>₹</span><strong data-price="intelligence" data-value="2865">2,865</strong><small>crore / year</small></div><p class="billing-note">TRA estimate · reported 2023</p><ul><li>Estimated tea-sector revenue loss</li><li>Same report as the volume estimate</li><li>Earlier observation motivates this project</li><li>No measured AgriSarthi savings claimed</li></ul>${button("Explore the evidence", "intelligence")}</article></div><p class="pricing-footnote">Tea Research Association estimate, reported in 2023. Open the source for context.</p></section>
    <footer class="site-footer" id="contact"><div class="footer-landscape" aria-hidden="true"></div><div class="footer-panel"><div class="footer-intro">${logo}<h2>The future of<br><em>crop awareness</em></h2><p>Earlier observation, crop context,<br>and an edge-AI vision for informed field care.</p>${button("Contact Us", "contact")}</div><div class="footer-links"><span>Explore</span><a href="#home">Home</a><a href="#about">About Us</a><a href="#contact" data-action="contact">Contacts</a><a href="#pricing">Impact</a><button data-action="careers">Evidence</button></div><div class="footer-news"><label for="newsletter-email">A little clarity in your inbox.</label><form id="newsletter-form"><input id="newsletter-email" type="email" name="email" placeholder="Your email address" required autocomplete="email"><button aria-label="Save newsletter interest">↗</button></form><p id="newsletter-status" role="status">Ideas for more informed crop care.</p></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} AgriSarthi</span><button data-action="privacy">Privacy</button><a href="#home">Back to top ↑</a></div></div></footer>
  </main>
  <dialog id="experience-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Close dialog">×</button><div id="dialog-content"></div></dialog>
  <div class="scroll-progress" aria-hidden="true"></div>
`;

const safe = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        ch
      ],
  );
const storage = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem("pyko-" + key));
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem("pyko-" + key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
};
const dialog = document.querySelector("#experience-dialog");
const content = document.querySelector("#dialog-content");
let focusInterval;

let lastFocus;

function openDialog(html) {
  if (!dialog.open) lastFocus = document.activeElement;
  clearInterval(focusInterval);
  content.innerHTML = html;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add("dialog-open");
  document.querySelector(".dialog-close").focus({ preventScroll: true });
  if (!reduceMotion.matches)
    content.animate(
      [
        { opacity: 0, transform: "scale(0.97)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      { duration: 250, easing: "cubic-bezier(0.23,1,0.32,1)" },
    );
}
const intro = (tag, title, copy = "") =>
  `<p class="eyebrow">${tag}</p><h2 id="dialog-title">${title}</h2>${copy ? `<p class="dialog-description">${copy}</p>` : ""}`;
function start() {
  openDialog(`${intro("Field companion · local preview", "Know your <em>field.</em>", "Save crop context on this device. This prototype does not run an AI diagnosis.")}<form id="start-form" class="dialog-form"><label>Your name<input name="name" maxlength="40" required autocomplete="given-name"></label><label>Your crop<select name="goal"><option>Rice</option><option>Wheat</option><option>Maize</option><option>Soybean</option><option>Cotton</option><option>Tea</option><option>Tomato</option><option>Chili</option><option>Grape</option><option>Mango</option><option>Other</option></select></label><button class="button dark">Open field workspace ${arrow}</button></form>`);
  document.querySelector('#start-form').addEventListener('submit', e => {
    e.preventDefault(); const f = new FormData(e.currentTarget);
    const profile = {name: String(f.get('name')).trim(), goal: f.get('goal')};
    storage.set('profile', profile); workspace(profile);
  });
}
function workspace(profile = storage.get('profile')) {
  const notes = storage.get('field-notes') || [];
  openDialog(`${intro("Field workspace · local preview", profile ? `Welcome, ${safe(profile.name)}.` : "Your field, <em>in focus.</em>", profile ? `Crop: ${safe(profile.goal)}` : "Create and download observation notes. No live farm data or AI inference is connected.")}<div class="workspace-stats"><div><small>Saved observations</small><strong>${notes.length}</strong><span>On this device</span></div><div><small>AI diagnosis</small><strong>—</strong><span>Not connected</span></div><div><small>Next step</small><strong>Expert</strong><span>Review recommended</span></div></div><div class="workspace-actions">${button("Scouting checklist", "focus", "dark")}${button("Record observations", "study", "dark")}${button("Explore guidance", "oracle", "dark")}</div><p class="demo-note">Notes stay in this browser unless you download them. No cloud monitoring is active.</p>`);
}
function insight() { evidence(); }
function evidence() {
  openDialog(`${intro("Research & project context", "The evidence behind <em>early awareness.</em>", "Estimates describe different places, years and causes. They must not be added together or treated as AgriSarthi performance results.")}${evidenceHTML}`);
}
function oracle() {
  openDialog(`${intro("Edge-AI concept · prepared guidance", "A clearer <em>next move.</em>", "The proposed assistant would combine local symptom capture with crop context. This demo provides a workflow only; no trained disease model is connected.")}<div class="oracle-options"><button data-question="focus">What should I record?</button><button data-question="exam">What does edge AI mean here?</button><button data-question="habit">How should I follow up?</button></div><div id="oracle-answer" class="oracle-answer" aria-live="polite">${spark}<p>Start with an observation, not an assumed diagnosis.</p></div>`);
}
const oracleAnswers = {
  focus: "Record the crop, growth stage, location, date, affected plant parts and how symptoms are distributed. Clear close-up and whole-plant photos can help a local crop expert review the observation.",
  exam: "The project vision is inference on a nearby device, reducing dependence on a network connection. The current website has local note storage, but no deployed AI model, offline diagnosis or validated detection accuracy.",
  habit: "Compare later observations with the earlier record and note changes. Share the context with a local extension worker or crop expert for diagnosis and locally appropriate management. This preview does not prescribe treatments."
};
function focusSession() {
  openDialog(`${intro("Field scouting", "Notice the <em>small changes.</em>", "A simple observation checklist, not a diagnostic test.")}<form class="dialog-form">${['Identify crop and growth stage','Note date, location and recent conditions','Observe affected and unaffected plants','Record plant parts, symptoms and distribution','Arrange expert review and a follow-up observation'].map(t=>`<label><input type="checkbox"> ${t}</label>`).join('')}</form>${button("Record your observations", "study", "dark")}`);
}
function study() {
  const notes = storage.get('field-notes') || [];
  openDialog(`${intro("Observation notebook", "Keep a clearer <em>field record.</em>", "Saved on this device. Downloads contain your notes; nothing is sent to a server.")}<form id="study-form" class="dialog-form"><label>Crop and location<input name="crop" required maxlength="160" value="${safe(storage.get('profile')?.goal || '')}" placeholder="Rice · field location"></label><label>Your observations<textarea name="notes" rows="4" maxlength="5000" required placeholder="Growth stage, affected plants, visible symptoms, recent changes…"></textarea></label><button class="button dark">Save observation ${arrow}</button></form><p id="note-status" role="status"></p><div id="study-cards">${notes.map(n=>`<details class="recall-card"><summary>${safe(n.date)} · ${safe(n.crop)}</summary><p>${safe(n.text)}</p></details>`).join('')}</div><button class="button dark" id="download-notes">Download saved notes ${arrow}</button>`);
  document.querySelector('#study-form').addEventListener('submit', e=>{
    e.preventDefault(); const f=new FormData(e.currentTarget);
    notes.unshift({date:new Date().toISOString().slice(0,10),crop:String(f.get('crop')).trim(),text:String(f.get('notes')).trim()});
    if(storage.set('field-notes',notes)){study();document.querySelector('#note-status').textContent='Observation saved on this device.';}
    else document.querySelector('#note-status').textContent='Unable to save. Copy your note before closing this dialog.';
  });
  document.querySelector('#download-notes').addEventListener('click',()=>{
    const url=URL.createObjectURL(new Blob([notes.map(n=>`${n.date} | ${n.crop}\n${n.text}`).join('\n\n')],{type:'text/plain'}));
    const a=document.createElement('a');a.href=url;a.download='agrisarthi-field-observations.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
    document.querySelector('#note-status').textContent='Download requested. If your browser blocks it, your saved notes remain visible below.';
  });
}
function contact() {
  openDialog(
    `${intro("Start a conversation", "Let’s find <em>clarity.</em>", "Write a message and download it as a draft. This local preview does not send messages.")}<form id="contact-form" class="dialog-form"><label>Your email<input name="email" type="email" required autocomplete="email" placeholder="you@example.com"></label><label>What is on your mind?<textarea name="message" rows="4" required maxlength="5000" placeholder="Tell us a little about it."></textarea></label><button type="submit" class="button dark">Download message draft ${arrow}</button><p id="contact-status" role="status"></p></form>`,
  );
  document.querySelector("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const url = URL.createObjectURL(
      new Blob(
        [
          `Message for AgriSarthi\nFrom: ${data.get("email")}\n\n${data.get("message")}`,
        ],
        { type: "text/plain" },
      ),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "agrisarthi-message-draft.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    document.querySelector("#contact-status").textContent =
      "Your draft is downloaded. No message has been sent.";
  });
}
const actions = {
  start,
  workspace: () => workspace(),
  oracle,
  focus: focusSession,
  study,
  contact,
  essential: () => { evidence(); document.querySelectorAll(".crop-evidence details").forEach((el, i) => { el.open = i === 5; }); },
  intelligence: evidence,
  careers: evidence,
  philosophy: evidence,
  privacy: () =>
    openDialog(
      `${intro("Privacy in this preview", "Your space. <em>Your information.</em>")}<p class="dialog-description">This website stores only your optional name, crop, field observations, and newsletter interest in this browser. There is no account service, payment processing, analytics tracking, or email delivery. Field observations remain on this device until you clear them. Downloads remain wherever you save them.</p><button class="button dark" data-action="clear-data">Clear saved preferences ${arrow}</button>`,
    ),
  "clear-data": () => {
    try {
      ["profile", "newsletter", "field-notes"].forEach((k) =>
        localStorage.removeItem("pyko-" + k),
      );
    } catch {}
    openDialog(
      `${intro("Privacy", "A fresh <em>start.</em>", "Your saved preferences have been cleared from this browser.")}`,
    );
  },
};
document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]");
  if (action) {
    event.preventDefault();
    actions[action.dataset.action]?.();
  }
  const insightButton = event.target.closest("[data-insight]");
  if (insightButton) insight(insightButton.dataset.insight);
  const question = event.target.closest("[data-question]");
  if (question) {
    document.querySelector("#oracle-answer").innerHTML =
      `${spark}<p>${oracleAnswers[question.dataset.question]}</p><small>Example guidance · this preview uses prepared responses</small>`;
  }
  const link = event.target.closest('a[href^="#"]');
  if (link && !action) {
    document.querySelector(".mobile-menu").open = false;
  }
});
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      dialog.close();
  }
});
dialog.addEventListener("close", () => {
  clearInterval(focusInterval);
  document.body.classList.remove("dialog-open");
  lastFocus?.focus({ preventScroll: true });
});
document.querySelectorAll('[data-billing]').forEach(el => el.addEventListener('click', () => {
  if(el.dataset.billing === 'yearly') evidence();

}));

document
  .querySelector("#newsletter-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const ok = storage.set(
      "newsletter",
      new FormData(event.currentTarget).get("email"),
    );
    document.querySelector("#newsletter-status").textContent = ok
      ? "Interest saved on this device. Email delivery is not connected."
      : "Your browser could not save this preference. Please try again with local storage enabled.";
  });

// One camera-like timeline replaces the disconnected section animations.
initScrollStory(reduceMotion);
