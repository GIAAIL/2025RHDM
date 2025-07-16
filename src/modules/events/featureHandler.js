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
 * 共用 feature 點擊處理邏輯（可由滑鼠點擊或自動輪播觸發）
 */
export function handleFeatureClick(map, feature, mediaType) {
  const coords = feature.geometry.coordinates;
  const props = feature.properties;

  map.flyTo({
    center: coords,
    essential: true,
    padding: { top: 0, bottom: 0, left: 300, right: 0 },
    duration: 1200,
  });

  resetMediaDisplay();

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
}
