import { createSlice } from "@reduxjs/toolkit";

/**
 * 🧠 Unique cart key (single + variation safe)
 */
const getCartKey = (item) =>
  `${item.slug || item.product_slug || item.id}_${
    item.variation_id ?? 0
  }_${item.color_id ?? 0}_${item.size_id ?? 0}`;

/**
 * 💰 Safe price extractor (future proof)
 */
const getItemPrice = (item) => {
  const price =
    Number(item?.price?.final) ||
    Number(item?.sale_price) ||
    Number(item?.price) ||
    0;

  return isNaN(price) ? 0 : price;
};

const initialState = {
  cart: [],
  showCartPopup: false,

  // 🆕 for toast (no breaking)
  lastAddedItem: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 🛒 ADD TO CART
    addItem(state, action) {
      const newItem = action.payload;

      const existingItem = state.cart.find(
        (item) => getCartKey(item) === getCartKey(newItem)
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity ?? 1;
      } else {
        state.cart.push({
          ...newItem,
          product_id: newItem.id || newItem.product_id,
          quantity: newItem.quantity ?? 1,
          price: getItemPrice(newItem),
        });
      }

      // 🆕 toast tracking (IMPORTANT FIX)
      state.lastAddedItem = newItem;

      state.showCartPopup = true;
    },

    // ❌ REMOVE ITEM
    removeItem(state, action) {
      state.cart = state.cart.filter(
        (item) => getCartKey(item) !== action.payload
      );
    },

    // 🔼 INCREASE
    increaseQty(state, action) {
      const item = state.cart.find(
        (item) => getCartKey(item) === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    // 🔽 DECREASE
    decreaseQty(state, action) {
      const item = state.cart.find(
        (item) => getCartKey(item) === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // 🧹 CLEAR
    clearCart(state) {
      state.cart = [];
      state.showCartPopup = false;
      state.lastAddedItem = null;
    },

    // 👁 HIDE TOAST
    hideCartPopup(state) {
      state.showCartPopup = false;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQty,
  decreaseQty,
  clearCart,
  hideCartPopup,
} = cartSlice.actions;

export default cartSlice.reducer;

/* =========================
   📊 SELECTORS (NO NAME CHANGE)
========================= */

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

/**
 * 💰 FIXED TOTAL PRICE (NO BREAK CHANGE)
 */
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => {
    const price = getItemPrice(item);
    const qty = Number(item.quantity) || 0;
    return sum + price * qty;
  }, 0);

/**
 * 🧠 KEY EXPORT (UNCHANGED NAME)
 */
export const generateCartKey = (item) => getCartKey(item);

/**
 * 🆕 toast support (optional safe export)
 */
export const getLastAddedItem = (state) => state.cart.lastAddedItem;