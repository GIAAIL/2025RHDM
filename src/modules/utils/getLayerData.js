import config from "../../config/config.js";

/**
 * 根據章節 ID 取得對應的 layerData 設定
 * @param {string} chapterId - 章節 ID（如 "chapter-00"）
 * @returns {Object|null} - 對應的 layerData，如果不存在則回傳 null
 */
export function getLayerData(chapterId) {
  const chapter = config.chapters.find((ch) => ch.id === chapterId);
  if (!chapter) {
    console.warn(`找不到章節：${chapterId}`);
    return null;
  }

  if (!chapter.layerData) {
    console.warn(`章節 ${chapterId} 沒有 layerData 欄位`);
    return null;
  }

  return chapter.layerData;
}
