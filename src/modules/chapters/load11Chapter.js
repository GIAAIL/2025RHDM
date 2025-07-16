// src/modules/chapters/load6_2_1Chapter.js

import config from "../../config/config.js";
import { addGlbLayer } from "../layers/addGlbLayer.js";

export function load11Chapter(map) {
  //-----------------------------------------------------------------
  const chapterID = "chapter-11";
  const chapter = config.chapters.find((ch) => ch.id === chapterID);

  if (!chapter) {
    console.warn(`找不到 chapter：${chapterID}`);
    return;
  }

  const models = chapter.models;
  if (!Array.isArray(models) || models.length === 0) {
    console.warn(`chapter ${chapterID} 沒有指定 models 配置`);
    return;
  }

  const chapterElement = document.getElementById(chapterID);
  if (!chapterElement) {
    console.warn(`無法找到章節 DOM：#${chapterID}`);
    return;
  }

  let added = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !added) {
          models.forEach((modelConfig, index) => {
            const modelPath = modelConfig.path;
            const modelLngLat = modelConfig.lngLat || chapter.location.center;
            const modelAltitude = modelConfig.altitude || 0;
            const modelScale = modelConfig.scale || 1;
            const modelRotation = modelConfig.rotation || [0, 0, 0];

            addGlbLayer(map, tb, {
              layerId: `glb-${chapterID}-model-${index}`,
              modelUrl: modelPath,
              lngLat: modelLngLat,
              altitude: modelAltitude,
              scale: modelScale,
              rotation: modelRotation,
            });
          });
          added = true;
        }
      });
    },
    { threshold: 0.6 }
  );

  observer.observe(chapterElement);
}
