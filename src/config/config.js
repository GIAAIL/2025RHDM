// src/config/config.js

export default {
  // Mapbox 樣式與授權設定
  style: "mapbox://styles/yunchen-lee/clsvlegso000y01oic95c3egs", // 自訂樣式（隱藏 shield）
  accessToken:
    "pk.eyJ1IjoieXVuY2hlbi1sZWUiLCJhIjoiY2wxeGttYmg0MDNwaTNicWY5bWM5ZHM0OCJ9.gS5S-DMTk308nQP8MAzN0w", // 使用者 token

  // 互動與顯示設定
  showMarkers: false, // 是否顯示預設 marker
  markerColor: "#1e9696", // Marker 顏色
  inset: true, // 是否啟用小地圖
  theme: "dark", // 主題樣式（dark/light）
  use3dTerrain: true, // 啟用 3D 地形
  projection: "globe", // 投影方式（預設為地球）

  // 頁面標頭內容
  title: "Projects",
  subtitle: "... subtitle ...",
  byline: "By ...",
  footer:
    '&copy; National Yang Ming Chiao Tung University. Created using <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.',

  // 各章節定義（對應 scrollama）
  chapters: [
    {
      id: "chapter-00",
      alignment: "left",
      hidden: false,
      title: "",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      location: {
        center: [120.38, 23.9],
        zoom: 6.8,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
      mediaType: "none",
      layerData: {},
    },
    {
      id: "chapter-01",
      alignment: "left",
      hidden: false,
      title: "01. 交大實景拍攝影像",
      description: "Copy these sections to add to your story.",
      location: {
        center: [120.999, 24.7857],
        zoom: 15.5,
        pitch: 26,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
      layerData: {
        source: {
          LineSource: "datasets/nycu_photo/campus.geojson",
          PointSource:
            "datasets/nycu_photo/2023_0321_183347_photo_Info.geojson",
        },
        IconPath: "public/images/pin_image_v5.png",
        mediaType: "image",
      },
    },
    {
      id: "chapter-02",
      alignment: "left",
      hidden: false,
      title: "02. 空拍分析影像 白海豚",
      description: "拍攝標的物為白海豚...附兩段空拍影像供標註使用。",
      location: {
        center: [120.5, 24.3],
        zoom: 12,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
      layerData: {
        source: {
          PointSource: "datasets/Dolphin/video/dp/data.geojson",
        },
        IconPath: "public/images/pin_dolphin_v5.png",
        mediaType: "videoLocal",
      },
    },
    {
      id: "chapter-03",
      alignment: "left",
      hidden: false,
      title: "03. 無人機苗栗山區道路自主導航",
      description:
        "使用無人機進行苗栗山區道路自主導航...影片已上傳至 YouTube。",
      location: {
        center: [120.882246, 24.539507],
        zoom: 15,
        pitch: 20,
        bearing: 40,
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
      layerData: {
        source: {
          LineSource: [
            "datasets/Miaoli_drone/2023_0531_Miaoli_dronePath/2023_0316_1130_drone_path_0.txt",
            "datasets/Miaoli_drone/2023_0531_Miaoli_dronePath/2023_0316_1154_drone_path_0.txt",
            "datasets/Miaoli_drone/2023_0531_Miaoli_dronePath/2023_0316_1154_drone_path_1.txt",
            "datasets/Miaoli_drone/2023_0531_Miaoli_dronePath/2023_0316_1441_drone_path_0.txt",
          ],
          PointSource: "datasets/Miaoli_drone/miaoli_drone.geojson",
        },
        IconPath: "public/images/pin_drone_v5.png",
        mediaType: "videoApi",
      },
    },
    {
      id: "chapter-04",
      alignment: "left",
      hidden: false,
      title: "04. 群飛路徑視覺化測試資料",
      description: "Copy these sections to add to your story.",
      location: {
        center: [121.318873, 23.589414],
        zoom: 14.5,
        pitch: 30,
        bearing: -60.0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
      mediaType: "none",
      layerData: {
        source: {
          Line3DSource: [
            "datasets/dronePath_demo/2023_0409_170757_drone_path_0.txt",
            "datasets/dronePath_demo/2023_0409_170757_drone_path_1.txt",
            "datasets/dronePath_demo/2023_0409_170757_drone_path_2.txt",
          ],
        },
        IconPath: "public/images/pin_drone_v5.png",
        mediaType: "",
      },
    },
    {
      id: "chapter-05",
      alignment: "left",
      hidden: false,
      title: "05. 台東多良車站即時影像",
      description: "Taitung Amazing",
      location: {
        center: [120.96311, 22.50725],
        zoom: 10,
        pitch: 52,
        bearing: 180,
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
      layerData: {
        source: {
          PointSource:
            "datasets/station_videoStram/station_videoStream.geojson",
        },
        IconPath: "public/images/pin_VideoCamera_v5.png",
        mediaType: "videoApi",
      },
    },
    {
      id: "chapter-06",
      alignment: "left",
      hidden: false,
      title: "06. 新竹南寮漁港 無人機長程影像傳輸",
      description: "Hsinchu Nanliao Fishing Harbor",
      location: {
        center: [120.928638, 24.850431],
        zoom: 15.5,
        pitch: 26,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
      layerData: {
        source: {
          PointSource: "datasets/2025_project-04/data.geojson",
        },
        IconPath: "public/images/pin_drone_v5.png",
        mediaType: "videoApi",
      },
    },
    {
      id: "chapter-07",
      alignment: "left",
      hidden: false,
      title: "07. 景美溪 精準復拍",
      description: "景美溪 精準復拍",
      location: {
        center: [121.572698, 24.98791],
        zoom: 19,
        pitch: 26,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
      layerData: {
        source: {
          LineSource: "datasets/2025_project-01/pathCoord.geojson",
          PointSource: "datasets/2025_project-01/data.geojson",
        },
        IconPath: "public/images/pin_drone_v5.png",
        mediaType: "videoApi",
      },
    },

    {
      id: "chapter-08",
      alignment: "left",
      hidden: false,
      title: "08. 景美溪 中長程河道自主偵測及人員偵測",
      description: "Autonomous River Detection",
      location: {
        center: [121.5721878, 24.98542485],
        zoom: 15.5,
        pitch: 26,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
      layerData: {
        source: {
          LineSource: "datasets/2025_project-03/pathCoord.geojson",
          PointSource: "datasets/2025_project-03/data.geojson",
        },
        IconPath: "public/images/pin_drone_v5.png",
        mediaType: "videoApi",
      },
    },

    {
      id: "chapter-09",
      alignment: "left",
      hidden: false,
      title: "09.景美溪 結合影像分割之智慧壓縮技術",
      description: "景美溪 結合影像分割之智慧壓縮技術",
      location: {
        center: [121.561555, 24.979622],
        zoom: 19,
        pitch: 26,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
      mediaType: "video",
      layerData: {
        source: {
          PointSource: "datasets/2025_project-05/data.geojson",
        },
        IconPath: "public/images/pin_drone_v5.png",
        mediaType: "videoApi",
      },
    },
    {
      id: "chapter-10",
      alignment: "left",
      hidden: false,
      title: "10.景美溪 拍翼機狹小空間影像傳輸",
      description: "景美溪 拍翼機狹小空間影像傳輸",
      location: {
        center: [121.572608, 24.988037],
        zoom: 20,
        pitch: 26,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
      layerData: {
        source: {
          PointSource: "datasets/2025_project-06_1/data.geojson",
        },
        IconPath: "public/images/pin_drone_v5.png",
        mediaType: "videoApi",
      },
    },
    {
      id: "chapter-11",
      alignment: "left",
      hidden: false,
      title: "11. 景美溪 多機協同影像擷取與3D建模展示",
      description: "景美溪 多機協同影像擷取與3D建模展示",
      location: {
        center: [121.571873, 24.987525],
        zoom: 19,
        pitch: 75,
        bearing: -57,
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
      layerData: {
        source: {
          PointSource: "datasets/2025_project-06_2_1/data.geojson",
        },
        IconPath: "public/images/pin_drone_v5.png",
        mediaType: "videoApi",
      },
      models: [
        {
          path: import.meta.env.BASE_URL + "model/model1.glb",
          lngLat: [121.572053, 24.987097],
          altitude: -1,
          scale: 0.4,
          rotation: [0, 0, 0],
        },
        {
          path: "model/model2.glb",
          lngLat: [121.572062, 24.98758],
          altitude: 0,
          scale: 0.4,
          rotation: [0, 0, 112],
        },
      ],
    },
    {
      id: "chapter-12",
      alignment: "left",
      hidden: false,
      title: "12. 頭前溪 多台無人機Formation結果",
      description: "頭前溪 多台無人機Formation結果",
      location: {
        center: [121.03463233198876, 24.796782019818245],
        zoom: 15.5,
        pitch: 26,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
      layerData: {
        source: {
          PointSource: "datasets/2025_project-06_2_2/data.geojson",
        },
        IconPath: "public/images/pin_drone_v5.png",
        mediaType: "videoApi",
      },
    },
  ],
};
