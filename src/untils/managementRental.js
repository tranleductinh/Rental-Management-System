export const getValueByPath = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj) ?? "";
};

export const formatNumber = (number) => {
  return number.toLocaleString("en-US");
};

export const formatMonth = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};
