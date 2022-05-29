export const clamp = (num: number, max = 1.0, min = 0.0) => {
  return Math.min(Math.max(min, num), max);
};
