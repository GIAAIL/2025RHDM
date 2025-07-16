// src/modules/events/autoChapterCycler.js

export function setupAutoChapterCycler(map) {
  const idleDelay = 3000; // 10 秒無操作後進入輪播模式
  const featureClickDelay = 3000; // 每個 feature 點擊間隔
  const chapterStartDelay = 2000; // 每個章節進入後等待時間

  let idleTimeout = null;
  let isCycling = false;

  function resetIdleTimer() {
    if (isCycling) return; // 播放中不打斷
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(startChapterCycle, idleDelay);
  }

  function getChapters() {
    return Array.from(document.querySelectorAll(".step"));
  }

  function getChapterById(id) {
    return document.getElementById(id);
  }

  function getNextChapter(currentEl) {
    const steps = getChapters();
    const index = steps.findIndex((el) => el === currentEl);
    return steps[index + 1] || steps[0];
  }

  function startChapterCycle() {
    isCycling = true;
    const firstStep = getCurrentStep() || getChapters()[0];
    playChapter(map, firstStep);
  }

  function getCurrentStep() {
    return getChapters().find((el) => el.classList.contains("active"));
  }

  function playChapter(map, stepEl) {
    const chapterId = stepEl.id;
    const layerId = `${chapterId}_PointLayer`;
    const sourceId = `${chapterId}_PointSource`;

    // 捲動至章節區塊
    stepEl.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      const source = map.getSource(sourceId);
      console.log(source);

      if (!map.getLayer(layerId) || !source) {
        console.warn(`缺少圖層或資料來源 ${layerId}`);
        moveToNextChapter(map, stepEl);
        return;
      }

      const data = source._data || source._options?.data;
      const features = data?.features || [];

      if (features.length === 0) {
        console.warn(`章節 ${chapterId} 無 feature`);
        moveToNextChapter(map, stepEl);
        return;
      }

      let i = 0;
      function clickNextFeature() {
        const feature = features[i];
        if (!feature) {
          moveToNextChapter(map, stepEl);
          return;
        }

        const [lng, lat] = feature.geometry.coordinates;
        const fakeEvent = {
          type: "click",
          features: [feature],
          lngLat: { lng, lat },
          point: map.project([lng, lat]),
        };

        map.fire("click", fakeEvent);
        i++;
        setTimeout(clickNextFeature, featureClickDelay);
      }

      clickNextFeature();
    }, chapterStartDelay);
  }

  function moveToNextChapter(map, currentStepEl) {
    const next = getNextChapter(currentStepEl);
    playChapter(map, next);
  }

  // 綁定所有常見使用者操作，重設 idle timer
  ["mousemove", "keydown", "touchstart", "wheel", "scroll"].forEach((event) => {
    window.addEventListener(event, resetIdleTimer, { passive: true });
  });

  // 初始啟動計時器
  resetIdleTimer();
}
