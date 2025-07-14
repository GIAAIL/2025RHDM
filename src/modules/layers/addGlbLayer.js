//src/modules/utils/addGlbLayer.js

/**
 * 在地圖上加入一個 GLB 模型圖層（使用 Threebox）
 * @param {mapboxgl.Map} map - Mapbox 地圖實例
 * @param {Threebox} tb - Threebox 實例
 * @param {Object} options - 模型設定參數
 * @param {string} options.layerId - 圖層 ID（自定義）
 * @param {string} options.modelUrl - glb/gltf 模型網址
 * @param {[number, number]} options.lngLat - [經度, 緯度]
 * @param {number} [options.altitude=0] - 海拔高度（公尺）
 * @param {number|Object} [options.scale=1] - 縮放比例（可為單一數值或 {x, y, z}）
 * @param {[number, number, number]} [options.rotation=[0, 0, 0]] - 模型旋轉（degree, x y z）
 */
export function addGlbLayer(
  map,
  tb,
  {
    layerId,
    modelUrl,
    lngLat,
    altitude = 0,
    scale = 1,
    rotation = [0, 0, 0],
    ambientLightIntensity = 0.1,
    overrideMaterial = true,
    materialColor = 0xffffff,
  }
) {
  if (!map || !tb) {
    console.warn("地圖或 Threebox 尚未初始化");
    return;
  }

  if (map.getLayer(layerId)) {
    console.warn(`圖層 ${layerId} 已存在`);
    return;
  }

  map.addLayer({
    id: layerId,
    type: "custom",
    renderingMode: "3d",
    onAdd: function () {
      // ✅ 柔和環境光（AmbientLight）
      const ambientLight = new THREE.AmbientLight(
        0xffffff,
        ambientLightIntensity
      );
      tb.scene.add(ambientLight);

      const opts = {
        type: "gltf",
        obj: modelUrl,
        scale:
          typeof scale === "number" ? { x: scale, y: scale, z: scale } : scale,
        units: "meters",
        rotation: {
          x: rotation[0],
          y: rotation[1],
          z: rotation[2],
        },
      };

      tb.loadObj(opts, (model) => {
        model.setCoords([lngLat[0], lngLat[1], altitude]);

        if (overrideMaterial) {
          const standardMat = new THREE.MeshStandardMaterial({
            color: materialColor,
            metalness: 0.85, // 控制反光程度
            roughness: 0.9, // 越高越粗糙、越擴散
            flatShading: true, // 若想要更平面風格
          });

          model.traverse((child) => {
            if (child.isMesh) {
              child.material = standardMat;
              child.castShadow = false; // 若你要模型投影可改為 true
              child.receiveShadow = true; // 若你有地面接收可改為 true
            }
          });
        }

        tb.add(model);
      });
    },
    render: function () {
      tb.update();
    },
  });
}
