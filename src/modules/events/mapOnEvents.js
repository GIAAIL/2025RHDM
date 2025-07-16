import { handleFeatureClick } from "./featureHandler.js";

export function mapOnEvents(map, chapterId, mediaType) {
  const id = chapterId + "_PointLayer";

  map.on("click", id, (e) => {
    const feature = e.features[0];
    handleFeatureClick(map, feature, mediaType);
  });

  map.on("mouseenter", id, () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", id, () => {
    map.getCanvas().style.cursor = "";
  });
}
