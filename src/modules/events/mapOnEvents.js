// src/modules/events/mapOnEvents.js

import {
  changeImageSource,
  changeVideoApiSource,
  changeVideoLocalSource,
  changeInfoCoordinate,
  changeInfoDate,
  changeInfoDataTitle,
  resetMediaDisplay,
  showMediaElement,
} from "../utils/mediaUpdater.js";
import { openSidebar } from "../utils/sidebar.js";

/**
 * 為指定圖層設定 Mapbox 的常見互動事件（click、hover）
 * @param {object} map - Mapbox GL JS 實例
 * @param {string} chapterId - 圖層 ID
 * @param {"image"|"video"} mediaType - 媒體類型
 */
export function mapOnEvents(map, chapterId, mediaType) {
  const id = chapterId + "_PointLayer";
  map.on("click", id, (e) => {
    const feature = e.features[0];
    const coords = feature.geometry.coordinates;
    const props = feature.properties;

    // resetMedia();

    map.flyTo({
      center: coords,
      essential: true,
      padding: { top: 0, bottom: 0, left: 300, right: 0 },
      duration: 1200,
    });

    // 重設顯示
    resetMediaDisplay();

    // 根據媒體類型切換內容與顯示元件
    if (mediaType === "image") {
      changeImageSource(props.imgurl);
      showMediaElement("Imgcontent");
    }

    if (mediaType === "videoLocal") {
      changeVideoLocalSource(props.videourl);
      showMediaElement("VideoFilecontent");
    }

    if (mediaType === "videoApi") {
      changeVideoApiSource(props.videourl);
      showMediaElement("Videocontent");
    }

    changeInfoCoordinate(coords.map((x) => x.toFixed(2)).join(", "));
    changeInfoDate(props.time);
    changeInfoDataTitle(props.title);

    openSidebar(map, "infoContent", 15.5);
  });

  map.on("mouseenter", id, () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", id, () => {
    map.getCanvas().style.cursor = "";
  });
}
