// src/modules/chapters/load6_2_1Chapter.js
import { loadGeojsonSource } from "../source/loadGeojsonSource.js";
import { addPointLayer } from "../layers/addPointLayer.js";
import { mapOnEvents } from "../utils/mapOnEvents.js";
import config from "../../config/config.js";
import { addGlbLayer } from "../layers/addGlbLayer.js";

export function load6_2_1Chapter(map) {
  //-----------------------------------------------------------------
  const chapterName = "chapter-11";
  const chapter = config.chapters.find((ch) => ch.id === chapterName);

  if (!chapter) {
    console.warn(`找不到 chapter：${chapterName}`);
    return;
  }

  const models = chapter.models;
  console.log(models);
  if (!Array.isArray(models) || models.length === 0) {
    console.warn(`chapter ${chapterName} 沒有指定 models 配置`);
    return;
  }

  const chapterElement = document.getElementById(chapterName);
  if (!chapterElement) {
    console.warn(`無法找到章節 DOM：#${chapterName}`);
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
              layerId: `glb-${chapterName}-model-${index}`,
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
  //-----------------------------------------------------------------

  const sourceId = chapterName + "_source";
  const layerId = chapterName + "point_layer";
  const iconID = chapterName + "icon";
  const dataPath = "datasets/2025_project-06_2_1/data.geojson";

  loadGeojsonSource(map, {
    sourceId: sourceId,
    geojsonPath: dataPath,
  });

  addPointLayer(map, {
    layerId,
    sourceId,
    iconPath: "public/images/pin_drone_v5.png",
    iconName: iconID,
  });

  mapOnEvents(map, layerId, "videoApi");
}
