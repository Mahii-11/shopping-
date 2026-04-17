export const isVariantValid = (item) =>
  item.variation_id > 0 ||
  item.color_id > 0 ||
  item.size_id > 0;