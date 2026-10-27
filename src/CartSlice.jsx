import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: [], addedToCart: {} },
  reducers: {
    addItem(state, action) {
      const product = action.payload;
      const existing = state.cartItems.find((item) => item.name === product.name);
      if (existing) existing.quantity += 1;
      else state.cartItems.push({ ...product, quantity: 1 });
      state.addedToCart[product.name] = true;
    },
    removeItem(state, action) {
      const name = typeof action.payload === 'string' ? action.payload : action.payload.name;
      state.cartItems = state.cartItems.filter((item) => item.name !== name);
      delete state.addedToCart[name];
    },
    updateQuantity(state, action) {
      const { name, quantity } = action.payload;
      const item = state.cartItems.find((entry) => entry.name === name);
      if (!item) return;
      if (quantity <= 0) {
        state.cartItems = state.cartItems.filter((entry) => entry.name !== name);
        delete state.addedToCart[name];
      } else {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.addedToCart = {};
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectAddedToCart = (state) => state.cart.addedToCart;
export const selectCartCount = (state) => selectCartItems(state).reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) => selectCartItems(state).reduce((total, item) => total + item.cost * item.quantity, 0);
export default cartSlice.reducer;
