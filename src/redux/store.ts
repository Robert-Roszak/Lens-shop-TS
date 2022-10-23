import { configureStore } from '@reduxjs/toolkit';
import cartRedux from './cartRedux';
import { productsSlice } from './productsRedux';

export const store = configureStore({
  reducer: {
    cart: cartRedux,
    [productsSlice.reducerPath]: productsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;