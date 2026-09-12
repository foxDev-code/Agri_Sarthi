import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    noDiscovery: true,
    include: [],
    exclude: [
      "gsap",
      "gsap/ScrollTrigger",
      "gsap/ScrollToPlugin",
      "gsap/CustomEase",
      "three",
    ],
  },
});
