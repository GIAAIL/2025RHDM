export function addLineLayer(map, chapterID) {
  var sourceName = chapterID + "_LineSource";
  var LayerName = chapterID + "_LineLayer";

  map.addLayer({
    id: LayerName,
    type: "line",
    source: sourceName,
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#000000",
      "line-width": 3,
    },
  });
}
