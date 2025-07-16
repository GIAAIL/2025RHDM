import config from "../../config/config.js";

/**
 * 根據 chapterID 從 config 中讀取對應的 GeoJSON source，並加到地圖
 *
 * @param {mapboxgl.Map} map - Mapbox GL JS 地圖實例
 * @param {string} chapterID - config.chapters 中的章節 ID，例如 "chapter-07"
 */
export function loadGeojsonSource(map, chapterID) {
  if (!map || typeof chapterID !== "string") {
    console.warn("❌ 無效的 map 或 chapterID");
    return;
  }

  const chapter = config.chapters.find((c) => c.id === chapterID);
  if (!chapter) {
    console.warn(`❌ 找不到 chapter: ${chapterID}`);
    return;
  }

  const sourceDict = chapter.layerData?.source;
  if (!sourceDict || typeof sourceDict !== "object") {
    console.warn(`❌ chapter ${chapterID} 中沒有有效的 layerData.source`);
    return;
  }

  for (const [key, dataPaths] of Object.entries(sourceDict)) {
    // 包裝成陣列，統一處理
    const paths = Array.isArray(dataPaths) ? dataPaths : [dataPaths];

    paths.forEach((dataPath, idx) => {
      if (typeof dataPath !== "string" || !dataPath.trim()) {
        console.warn(`⚠️ 忽略無效的資料路徑：${key}[${idx}]`);
        return;
      }

      // 多個 path 時加上編號，避免 source ID 衝突
      const sourceId =
        paths.length > 1 ? `${chapterID}_${idx}_${key}` : `${chapterID}_${key}`;

      if (!map.getSource(sourceId)) {
        // console.log("added source", sourceId);

        map.addSource(sourceId, {
          type: "geojson",
          data: dataPath,
        });
      }
    });
  }
}
