export const isVariantValid = (product) => {
  return (
    product?.type === "variable" ||   // 🔥 IMPORTANT FIX
    (Array.isArray(product?.variations) && product.variations.length > 0) ||
    (Array.isArray(product?.colors) && product.colors.length > 0)
  );
};



