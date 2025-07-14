// src/modules/loadAllChapters.js

import { loadNycuChapter } from "./chapters/nycuChapter.js";
import { loadDolphinChapter } from "./chapters/dolphinChapter.js";
import { loadMiaoliDroneChapter } from "./chapters/miaoliDroneChapter.js";
import { load3dDroneChapter } from "./chapters/3dDroneChapter.js";
import { loadStreamChapter } from "./chapters/streamChapter.js";
import { load3Chapter } from "./chapters/load3Chapter.js";
import { load4Chapter } from "./chapters/load4Chapter.js";
import { load5Chapter } from "./chapters/load5Chapter.js";
import { load6_1Chapter } from "./chapters/load6_1Chapter.js";
import { load6_2_1Chapter } from "./chapters/load6_2_1Chapter.js";
import { load6_2_2Chapter } from "./chapters/load6_2_2Chapter.js";
// import { load3DBuildingsLayer } from "./layers/buildings3DLayer.js";

export function loadAllChapters(map, tb) {
  loadNycuChapter(map);
  loadDolphinChapter(map);
  loadMiaoliDroneChapter(map);
  load3dDroneChapter(map, tb);
  loadStreamChapter(map);
  // load3DBuildingsLayer(map);
  load3Chapter(map);
  load4Chapter(map);
  load5Chapter(map);
  load6_1Chapter(map);
  load6_2_1Chapter(map);
  load6_2_2Chapter(map);
  // 你可以在這裡新增其他章節
}
