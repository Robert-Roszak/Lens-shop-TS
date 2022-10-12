import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config';
import { productModel } from '../types/product.model';

export const productsSlice = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    fetchProducts: builder.query<productModel[], void>({
      query: () => `/products`,
    }),
  }),
});

export const { useFetchProductsQuery } = productsSlice;