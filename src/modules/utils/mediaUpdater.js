// src/modules/utils/mediaUpdater.js

// change info img
export function changeImageSource(imgsrc) {
  console.log("trigger image");

  document.getElementById("Imgcontent").src = imgsrc;
}

// change info video
export function changeVideoApiSource(videosrc) {
  console.log("trigger videoApi", videosrc);

  const iframe = document.getElementById("Videocontent");

  iframe.src = videosrc;
}

// change info video
export function changeVideoLocalSource(videosrc) {
  console.log("trigger videoLocal");

  document.getElementById("VideoFilecontent_Source").src = videosrc;

  var x = document.getElementById("VideoFilecontent");
  x.autoplay = true;
  x.load();
}

export function resetMediaDisplay() {
  document.getElementById("Imgcontent")?.classList.add("u-hidden");
  document.getElementById("VideoFilecontent")?.classList.add("u-hidden");
  document.getElementById("Videocontent")?.classList.add("u-hidden");
}

export function showMediaElement(id) {
  document.getElementById(id)?.classList.remove("u-hidden");
}

// -------------------------------------------
// change coordinate
export function changeInfoCoordinate(coorsrc) {
  document.getElementById("infotext-coordinate").innerHTML =
    "資料座標 ▸ " + coorsrc;
}

// change time
export function changeInfoDate(timescr) {
  document.getElementById("infotext-date").innerHTML = "拍攝日期 ▸ " + timescr;
}

// change time
export function changeInfoDataTitle(timescr) {
  document.getElementById("infotext-datatitle").innerHTML =
    "資料標題 ▸ " + timescr;
}
