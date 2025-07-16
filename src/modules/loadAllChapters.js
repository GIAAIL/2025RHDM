// src/modules/loadAllChapters.js
import { loadGeojsonSource } from "./source/loadGeojsonSource.js";
import { addPointLayer } from "./layers/addPointLayer.js";
import { addLineLayer } from "./layers/addLineLayer.js";
import { addThreejsLine } from "./layers/addThreejsLine.js";

import { mapOnEvents } from "./events/mapOnEvents.js";

import { load11Chapter } from "./chapters/load11Chapter.js";
import config from "../config/config.js";

export function loadAllChapters(map, tb) {
  config.chapters.map((chapter) => {
    if (chapter.id !== "chapter-00") {
      // console.log(chapter);
    }
    const activeChapters = [
      "chapter-07",
      "chapter-01",
      "chapter-02",
      "chapter-03",
      "chapter-04",
    ];

    if (chapter.id !== "chapter-00") {
      //讀入資料來源
      loadGeojsonSource(map, chapter.id);

      //增加視覺化圖層
      // === 加入 PointLayer ===
      const PointSource = chapter.layerData?.source?.PointSource;
      if (PointSource) {
        const PointPaths = Array.isArray(PointSource)
          ? PointSource
          : [PointSource];
        PointPaths.forEach((_, i) => {
          PointPaths.length > 1
            ? addPointLayer(map, `${chapter.id}_${i}`)
            : addPointLayer(map, chapter.id);
        });
      }

      // === 加入 LineLayer ===
      const lineSource = chapter.layerData?.source?.LineSource;
      if (lineSource) {
        const linePaths = Array.isArray(lineSource) ? lineSource : [lineSource];
        linePaths.forEach((_, i) => {
          linePaths.length > 1
            ? addLineLayer(map, `${chapter.id}_${i}`)
            : addLineLayer(map, chapter.id);
        });
      }

      // === 加入 Line3DLayer ===
      const line3DSource = chapter.layerData?.source?.Line3DSource;
      if (line3DSource) {
        const linePaths = Array.isArray(line3DSource)
          ? line3DSource
          : [line3DSource];
        linePaths.forEach((_, i) => {
          const datapath = chapter.layerData.source.Line3DSource;
          addThreejsLine(tb, datapath[i]);
        });
      }

      const mediaType = chapter.layerData?.mediaType;
      mapOnEvents(map, chapter.id, mediaType);
    }
  });

  load11Chapter(map);
}
