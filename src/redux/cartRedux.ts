import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartModel } from '../types/interfaces';


interface CartState {
  items: CartModel[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const addItemToCart = (state: CartState, action: PayloadAction<CartModel>) => {
  const productInCart = action.payload;
  const received = JSON.parse(localStorage.getItem('cart') || '[]') || [];
  if (!received || received.length === 0) {
    received.push(productInCart);
    localStorage.setItem('cart', JSON.stringify(received));
  }
  else if (received != null && received.length >= 1) {
    const isInLocalStorage = received.some((item: CartModel) => item._id === productInCart._id);
    if (isInLocalStorage) {
      const toEdit = received.filter((item: CartModel) => item._id === productInCart._id);
      toEdit[0].quantity += productInCart.quantity;
      const toStay = received.filter((item: CartModel) => item._id !== productInCart._id);
      toStay.push(toEdit[0]);
      localStorage.setItem('cart', JSON.stringify(toStay));
    }
    else {
      received.push(productInCart);
      localStorage.setItem('cart', JSON.stringify(received));
    }
  }

  if (state.items.length > 0) {
    const foundIndex = state.items.findIndex(item => item._id === productInCart._id);
    if (foundIndex >= 0) {
      const newState = state.items;
      newState[foundIndex].quantity += productInCart.quantity;
      state.items = newState;
    }
    else state.items.push(productInCart);
  }
  else state.items = [productInCart];
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: addItemToCart,
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;