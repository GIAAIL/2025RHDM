// src/main.js

// 匯入初始化地圖與故事元素相關模組
import { setupStoryElements } from "./modules/init/setupStoryElements.js";
import { initializeMap } from "./modules/init/mapConfig.js";
import { setupScrollEvents } from "./modules/events/scrollEvents.js";
import { setupAutoAdvance } from "./modules/events/autoAdvanceChapter.js";

// 匯入所有章節的統一載入函式
import { loadAllChapters } from "./modules/loadAllChapters.js";

// 匯入側欄開關功能
import { openSidebar, closedSidebar } from "./modules/utils/sidebar.js";

// 匯入全域配置
import config from "./config/config.js";

async function init() {
  // 初始化 Mapbox 地圖與 Threebox
  const { map, insetMap, tb } = await initializeMap(config);

  // 將地圖物件設為全域，方便其他模組使用
  window.mainMap = map;

  // 將側欄開關功能綁定到全域，供 HTML 事件呼叫
  window.closedSidebar = function (id) {
    closedSidebar(window.mainMap, id);
  };
  window.openSidebar = function (id, zoom) {
    if (!window.mainMap) return;
    openSidebar(window.mainMap, id, zoom);
  };

  // 設定故事內容與互動元素
  setupStoryElements(config, map);

  // 一次載入所有章節（含 3D 物件等）
  loadAllChapters(map, tb);

  // 設定滾動事件與地圖內縮圖事件監聽
  setupScrollEvents(map, insetMap, tb, config);

  // 啟用自動章節切換功能
  // setupAutoAdvance();
}

// 啟動初始化並捕捉錯誤
init().catch((err) => {
  console.error("初始化失敗：", err);
});
