import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config';
import { OrderModel } from '../types/interfaces';

export const orderApi = createApi({
  reducerPath: 'orders',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    sendOrder: builder.mutation<{orderId: string}, Partial<OrderModel>>({
      query: (payload) => ({
        url: '/orders',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    fetchOrderById: builder.query<OrderModel, string | undefined>({
      query: (id) => `/orders/order/${id}`,
    }),
    fetchOrders: builder.query<OrderModel[], {email: string | undefined, isAdmin: boolean}>({
      query: ({ email, isAdmin }) => (`/orders?email=${email}&isAdmin=${isAdmin}`),
    }),
    updateOrderStatus: builder.mutation<void, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/orders/order/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
    }),
  }),
});

export const { useSendOrderMutation, useFetchOrderByIdQuery, useFetchOrdersQuery, useUpdateOrderStatusMutation } = orderApi;