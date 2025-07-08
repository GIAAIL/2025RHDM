// src/modules/chapters/JingmeiRiverChapter.js
import { loadGeojsonSource } from "../source/loadGeojsonSource.js";
import { addPointLayer } from "../layers/addPointLayer.js";
import { addLineLayer } from "../layers/addLineLayer.js";
import { mapOnEvents } from "../utils/mapOnEvents.js";

export function loadJingmeiRiverChapter(map) {
  const chapterName = "jingmeiRiver";
  const sourceId = chapterName + "_source";
  const layerId = chapterName + "point_layer";
  const iconID = chapterName + "icon";
  const dataPath = "datasets/2025_project-03/pathCoord.geojson";
  const dataName = "Jingmei_River_Path_Tracking";
  const color = "#000000";

  //讀入資料來源
  loadGeojsonSource(map, {
    sourceId: sourceId,
    geojsonPath: dataPath,
  });

  //增加視覺化圖層
  addLineLayer(map, dataPath, dataName, color);

  addPointLayer(map, {
    layerId,
    sourceId,
    iconPath: "public/images/pin_drone_v5.png",
    iconName: iconID,
  });

  mapOnEvents(map, layerId, "videoApi");
}
