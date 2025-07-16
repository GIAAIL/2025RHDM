import config from "../../config/config.js";
import { handleFeatureClick } from "../events/featureHandler.js";

let idleTimer = null;
let autoplayTimer = null;

const idleDelay = 10000; // 閒置 5 秒後啟動輪播

let currentStepIndex = -1;

/**
 * 啟動使用者閒置監聽，自動播放章節
 */
export function autoplay(map) {
  const resetIdleTimer = () => {
    clearTimeout(idleTimer);
    clearTimeout(autoplayTimer);

    //console.log("[autoplay] 使用者互動偵測到，重設輪播倒數計時");

    idleTimer = setTimeout(() => {
      //console.log("[autoplay] 5 秒無操作，啟動自動輪播模式");
      currentStepIndex = -1;
      startAutoplay(map);
    }, idleDelay);
  };

  ["mousemove", "keydown", "touchstart", "wheel", "scroll"].forEach((event) => {
    window.addEventListener(event, resetIdleTimer, { passive: true });
  });

  //console.log("[autoplay] 輪播監聽啟動，等待 5 秒閒置觸發播放");
  resetIdleTimer();
}

/**
 * 輪流播放每個章節
 */
function startAutoplay(map) {
  const steps = Array.from(document.querySelectorAll(".step"));
  const chapters = config.chapters;

  if (steps.length === 0 || chapters.length === 0) {
    console.warn("[autoplay] 無法輪播：缺少章節或 DOM");
    return;
  }

  if (currentStepIndex === -1) {
    currentStepIndex = steps.findIndex((el) => el.classList.contains("active"));
    if (currentStepIndex === -1) currentStepIndex = 0;
  } else {
    currentStepIndex = (currentStepIndex + 1) % steps.length;
  }

  const chapter = chapters[currentStepIndex];
  const stepElement = steps[currentStepIndex];

  //console.log(`[autoplay] 播放章節 #${currentStepIndex}: ${chapter.id}`);
  stepElement.scrollIntoView({ behavior: "smooth", block: "start" });

  let features = getFeaturesByChapterId(map, chapter.id);
  features = cullDupFeatures(features, false);

  if (features.length === 0) {
    console.warn(`[autoplay] 該章節無 feature：${chapter.id}`);
    const delay = getMediaType(chapter) === "image" ? 3000 : 10000;

    autoplayTimer = setTimeout(() => startAutoplay(map), delay);
    return;
  }

  playFeaturesSequentially(map, features, chapter, 0, () => {
    startAutoplay(map);
  });
}

/**
 * 遞迴播放章節內所有 features
 */
function playFeaturesSequentially(map, features, chapter, index, onComplete) {
  if (index >= features.length) {
    //console.log("[autoplay] 該章節播放完畢");
    onComplete();
    return;
  }

  const feature = features[index];
  const mediaType = getMediaType(chapter);

  //console.log(
  //     `[autoplay] 播放 feature #${index + 1}/${features.length}:`,
  //     feature.properties?.title || "(無標題)"
  //   );
  //console.log(`[autoplay] 當前 mediaType:${chapter.id}| ${mediaType}`);

  const delay = mediaType === "image" ? 3000 : 10000;

  handleFeatureClick(map, feature, mediaType);

  autoplayTimer = setTimeout(() => {
    playFeaturesSequentially(map, features, chapter, index + 1, onComplete);
  }, delay);
}

/**
 * 從 config 取得 mediaType，支援不同層級 fallback
 */
function getMediaType(chapter) {
  //console.log(chapter);

  return chapter.layerData?.mediaType || "image";
}

/**
 * 查詢 features（限定 Point）
 */
function getFeaturesByChapterId(map, chapterId) {
  const sourceId = chapterId + "_PointSource";

  try {
    const features = map.querySourceFeatures(sourceId, {
      filter: ["==", "$type", "Point"],
    });

    //console.log(`[getFeaturesByChapterId] 取得 ${features.length} 個 features`);
    return features;
  } catch (err) {
    console.warn(`[getFeaturesByChapterId] 查詢失敗：${sourceId}`, err);
    return [];
  }
}

/**
 * 依照 title 去重複
 */
function cullDupFeatures(features, verbose = false) {
  const seen = new Set();
  const result = [];
  const dups = [];

  for (const f of features) {
    const title = f.properties?.title;
    if (!title) continue;

    if (!seen.has(title)) {
      seen.add(title);
      result.push(f);
    } else {
      dups.push(title);
    }
  }

  if (verbose && dups.length > 0) {
    console.warn(`[cullDupFeatures] 移除 ${dups.length} 筆重複資料 (by title)`);
    const summary = {};
    dups.forEach((t) => (summary[t] = (summary[t] || 0) + 1));
    console.table(summary);
  }

  return result;
}
