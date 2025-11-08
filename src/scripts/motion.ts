// motion.ts — Cárgalo como island (client:visible) donde lo necesites
import anime from "animejs";

const reduced = typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Reveal on Scroll con Anime.js (usa .fx-* de motion.css) */
export function mountReveal(selector = "[data-reveal]") {
  if (reduced) {
    document.querySelectorAll(selector).forEach(el => el.classList.remove("fx-fade-up","fx-fade-in","fx-scale-in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      const el = target as HTMLElement;
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: el.classList.contains("fx-fade-up") ? [16, 0] : 0,
        scale:   el.classList.contains("fx-scale-in") ? [.98, 1] : 1,
        duration: 700,
        easing: "easeOutCubic",
        delay: Number(el.getAttribute("data-delay")) || 0
      });
      io.unobserve(el);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(selector).forEach(el => io.observe(el));
}

/** Hover “ink” para CTAs (discreto, performante) */
export function enhancePrimaryButtons(selector = ".btn-primary") {
  if (reduced) return;
  document.querySelectorAll(selector).forEach((btn) => {
    btn.addEventListener("pointerenter", () => {
      anime({
        targets: btn,
        keyframes: [
          { filter: "brightness(1.04)", duration: 120 },
          { filter: "brightness(1.00)", duration: 180 }
        ],
        easing: "easeOutSine"
      });
    });
  });
}

/** Spotlight sutil para el hero (usa un pseudo overlay) */
export function mountSpotlight(containerSel = "[data-spotlight]") {
  if (reduced) return;
  const el = document.querySelector(containerSel) as HTMLElement | null;
  if (!el) return;
  el.style.setProperty("--spot-x","50%");
  el.style.setProperty("--spot-y","30%");
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    const x = Math.round(((e.clientX - r.left) / r.width) * 100);
    const y = Math.round(((e.clientY - r.top) / r.height) * 100);
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
  };
  el.addEventListener("pointermove", move);
}
