// src/modules/events/autoAdvanceChapter.js

export function setupAutoAdvance() {
  let idleTimeout;
  const idleDelay = 10000; // 15 秒無操作就切換

  function resetIdleTimer() {
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(autoAdvanceChapter, idleDelay);
  }

  function autoAdvanceChapter() {
    const steps = Array.from(document.querySelectorAll(".step"));
    const activeIndex = steps.findIndex((el) =>
      el.classList.contains("active")
    );

    if (activeIndex === -1) return;

    const next = steps[activeIndex + 1];
    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // 若已到最後一章，回到第一章
      const first = steps[0];
      if (first) {
        first.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  // 綁定常見互動事件
  ["mousemove", "keydown", "touchstart", "wheel", "scroll"].forEach((event) => {
    window.addEventListener(event, resetIdleTimer, { passive: true });
  });

  // 初始啟動
  resetIdleTimer();
}
