const images = require.context("@/assets/images", false, /^.*\.webp$/).keys();

export const randomCost = () => {
  return Math.round((Math.random() * 100) / 9) * 10;
};

export const imagesProduct = (idx) => {
  return images[idx % images.length].slice(2);
};
