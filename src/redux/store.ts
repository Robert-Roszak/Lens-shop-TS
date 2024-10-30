import { configureStore } from '@reduxjs/toolkit';
import cartRedux from './cartRedux';
import { productsApi } from './productsRedux';
import { orderApi } from './orderRedux';
import { userApi } from './userReduxApi';
import userRedux from './userRedux';

export const store = configureStore({
  reducer: {
    cart: cartRedux,
    user: userRedux,
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware, orderApi.middleware, userApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;