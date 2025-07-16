/**
 * 根據 properties.title 去除重複的 GeoJSON features
 * @param {Array<GeoJSON.Feature>} features - 原始 feature 陣列
 * @param {boolean} [verbose=false] - 是否印出重複紀錄與統計
 * @returns {Array<GeoJSON.Feature>} 去重後的 features 陣列
 */
export function cullDupFeatures(features, verbose = false) {
  const seenTitles = new Set();
  const uniqueFeatures = [];
  const duplicateTitles = [];

  for (const feature of features) {
    const title = feature.properties?.title;

    if (!title) continue; // 沒有 title 則略過

    if (!seenTitles.has(title)) {
      seenTitles.add(title);
      uniqueFeatures.push(feature);
    } else {
      duplicateTitles.push(title);
    }
  }

  if (verbose && duplicateTitles.length > 0) {
    console.warn(
      `[deduplicateByTitle] 移除 ${duplicateTitles.length} 筆重複資料 (依據 title)`
    );
    const summary = {};
    for (const t of duplicateTitles) {
      summary[t] = (summary[t] || 0) + 1;
    }
    console.table(summary);
  }

  return uniqueFeatures;
}
