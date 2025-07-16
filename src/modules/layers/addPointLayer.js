// src/modules/utils/addPointLayer.js
import { getLayerData } from "../utils/getLayerData.js";

/**
 * 在地圖上新增 Symbol Layer（圖標 + 文字）
 * @param {mapboxgl.Map} map - 地圖實例
 * @param {string} chapterID - 對應 config 裡的章節 ID
 */
export function addPointLayer(map, chapterID) {
  const sourceId = `${chapterID}_PointSource`;
  const layerId = `${chapterID}_PointLayer`;
  const iconId = `${chapterID}_Icon`;

  const data = getLayerData(chapterID);
  if (!data || !data.IconPath) {
    console.warn(`❌ 無法取得 ${chapterID} 的 IconPath`);
    return;
  }

  // ✅ 直接設定參數（不要從 config 取得）
  const iconSize = 0.4;
  const textField = "title";
  const textColor = "#8e6428";

  map.loadImage(data.IconPath, (error, image) => {
    if (error) {
      console.error("❌ 載入 icon 失敗", error);
      return;
    }

    if (!map.hasImage(iconId)) {
      map.addImage(iconId, image);
    }

    if (!map.getLayer(layerId)) {
      map.addLayer({
        id: layerId,
        type: "symbol",
        source: sourceId,
        layout: {
          "icon-image": iconId,
          "icon-size": iconSize,
          "icon-allow-overlap": true,
          "text-field": ["get", textField],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-allow-overlap": true,
          "text-offset": [0, 2.25],
          "text-anchor": "top",
          "text-size": ["step", ["zoom"], 0, 9, 12],
        },
        paint: {
          "text-color": textColor,
          "text-halo-color": "#ffffff",
          "text-halo-width": 1,
        },
      });
    }
  });
}
