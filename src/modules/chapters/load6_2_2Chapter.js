// src/modules/chapters/load6_2_2Chapter.js
import { loadGeojsonSource } from "../source/loadGeojsonSource.js";
import { addPointLayer } from "../layers/addPointLayer.js";
import { mapOnEvents } from "../utils/mapOnEvents.js";

export function load6_2_2Chapter(map) {
  const chapterName = "ToucianRiverFormation ";
  const sourceId = chapterName + "_source";
  const layerId = chapterName + "point_layer";
  const iconID = chapterName + "icon";

  //讀入資料來源
  loadGeojsonSource(map, {
    sourceId: sourceId,
    geojsonPath: "datasets/2025_project-06_2_2/data.geojson",
  });

  addPointLayer(map, {
    layerId,
    sourceId,
    iconPath: "public/images/pin_drone_v5.png",
    iconName: iconID,
  });

  mapOnEvents(map, layerId, "videoApi");
}
