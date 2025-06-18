📁 Resilient-Homeland-Data-Map_v7
│
├── README.md # 📘 本文件
├── helper.html # 📄 說明或外部參考頁面
├── index.html # 🌐 主頁：type="module"，引入 src/main.js
│
├── 📁 datasets/ # 📦 原始資料集（GeoJSON / txt / mp4 / YouTube URLs）
│ ├── 📁 Dolphin/
│ ├── 📁 Miaoli_drone/
│ ├── 📁 dronePath_demo/
│ └── 📁 nycu_photo/
│
├── 📁 public/ # 📁 靜態資源目錄（前端可直接存取）
│ ├── 📁 css/
│ ├── 📁 fonts/
│ ├── 📁 images/
│ ├── 📁 images_readme/
│ └── drone_icon.svg # 📌 favicon 與標示圖示
│
├── 📁 src/ # 💡 前端開發核心原始碼
│ ├── main.js # 🚀 主入口，整合所有模組
│ │
│ ├── 📁 config/ # ⚙️ 設定檔模組
│ │ ├── config.js # Mapbox 設定與章節列表
│ │ └── constants.js # 常數：顏色、語言、樣式
│ │
│ ├── 📁 modules/ # 🔧 所有功能模組
│ │ ├── 📁 events/
│ │ │ └── scrollEvents.js # Scrollama 初始化與滾動事件處理
│ │ │
│ │ ├── 📁 init/
│ │ │ ├── mapConfig.js # 地圖初始化（Mapbox、三維地形、Threebox）
│ │ │ └── setupStoryElements.js # 動態建立 HTML 結構（故事章節等）
│ │ │
│ │ ├── 📁 layers/ # 📍 圖層模組（地圖上可互動資料）
│ │ │ ├── buildings3DLayer.js # Mapbox 3D 建築
│ │ │ ├── dolphinLayer.js # 白海豚影片圖層（MP4）
│ │ │ ├── drone3DPathLayer.js # 無人機三維路徑（Threebox）
│ │ │ ├── miaoliDroneLayer.js # 苗栗無人機路徑 + YouTube 點
│ │ │ ├── photoLayer.js # 校園照片圖層（Image marker）
│ │ │ └── streamVideoLayer.js # 多良車站 YouTube 串流圖層
│ │ │
│ │ └── 📁 utils/ # 🧩 工具模組（純邏輯/處理函式）
│ │ ├── helperFunctions.js # 共用函式（fetch, createLineLayer...）
│ │ ├── insetMap.js # 小地圖邊界畫框邏輯
│ │ ├── layerOpacity.js # 圖層透明度設定函式
│ │ ├── mediaUpdater.js # 圖片 / YouTube / MP4 動態更新
│ │ └── sidebar.js # 側欄開關與動畫處理
