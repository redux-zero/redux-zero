export function setJSONData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  return data;
}

export function getJSONData(key) {
  return JSON.parse(localStorage.getItem(key) || '{}');
}
