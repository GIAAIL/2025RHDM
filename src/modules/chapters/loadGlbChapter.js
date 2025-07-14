import config from "../../config/config.js";
import { addGlbLayer } from "../layers/addGlbLayer.js";

export function loadGlbChapter(map, tb) {
  const chapterId = "glb-chapter";
  const chapter = config.chapters.find((ch) => ch.id === chapterId);

  if (!chapter) {
    console.warn(`找不到 chapter：${chapterId}`);
    return;
  }

  const modelConfig = chapter.model;
  if (!modelConfig) {
    console.warn(`chapter ${chapterId} 沒有指定 model 配置`);
    return;
  }

  const modelPath = modelConfig.path;
  const modelLngLat = chapter.location.center;
  const modelAltitude = modelConfig.altitude || 0;
  const modelScale = modelConfig.scale || 1;
  const modelRotation = modelConfig.rotation || [0, 0, 0];

  const chapterElement = document.getElementById(chapterId);
  if (!chapterElement) {
    console.warn(`無法找到章節 DOM：#${chapterId}`);
    return;
  }

  let added = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !added) {
          addGlbLayer(map, tb, {
            layerId: `glb-${chapterId}-model`,
            modelUrl: modelPath,
            lngLat: modelLngLat,
            altitude: modelAltitude,
            scale: modelScale,
            rotation: modelRotation,
          });
          added = true;
        }
      });
    },
    { threshold: 0.6 }
  );

  observer.observe(chapterElement);
}
