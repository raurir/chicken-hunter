export const rnd = (min, max) => Math.floor(Math.random() * (max - min) + min);
export const limit = (input, min, max) =>
  Math.min(Math.max(input, min), max - 1);
