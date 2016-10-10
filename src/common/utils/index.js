export function clamp(value, minValue, maxValue) {
  return Math.max(minValue, Math.min(value, maxValue));
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function diff(a, b) {
  const result = {};

  Object.keys(a).forEach((key) => {
    if (a[key] !== b[key]) {
      result[key] = b[key];
    }
  });

  return result;
}
