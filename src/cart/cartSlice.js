import { createSlice } from "@reduxjs/toolkit";

/**
 * 🧠 Unique cart item identifier generator
 * (supports single + variation products)
 */
const getCartKey = (item) =>
  `${item.product_slug || item.slug}_${
    item.variation_id || 0
  }_${item.color_id || 0}_${item.size_id || 0}`;

const initialState = {
  cart: [],
  showCartPopup: false,
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
          quantity: newItem.quantity ?? 1,
          price: Number(newItem.price) || 0,
        });
      }

      state.showCartPopup = true;
    },

    // ❌ REMOVE ITEM (by full key payload)
    removeItem(state, action) {
      state.cart = state.cart.filter(
        (item) => getCartKey(item) !== action.payload
      );
    },

    // 🔼 INCREASE QTY
    increaseQty(state, action) {
      const item = state.cart.find(
        (item) => getCartKey(item) === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    // 🔽 DECREASE QTY
    decreaseQty(state, action) {
      const item = state.cart.find(
        (item) => getCartKey(item) === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // 🧹 CLEAR CART
    clearCart(state) {
      state.cart = [];
      state.showCartPopup = false;
    },

    // 👁 POPUP CONTROL
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
   📊 SELECTORS (PRO STYLE)
========================= */

// all cart items
export const getCart = (state) => state.cart.cart;

// total quantity
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

// total price (dynamic safe calculation)

const getItemPrice = (item) => {
  return (
    Number(item.discount_price) ||
    Number(item.sale_price) ||
    Number(item.price) ||
    0
  );
};



export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => {
    const price = getItemPrice(item);
    const qty = Number(item.quantity) || 0;
    return sum + price * qty;
  }, 0);

  


// helper: generate key for UI actions
export const generateCartKey = (item) => getCartKey(item);