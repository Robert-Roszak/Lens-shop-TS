import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { loginSuccess, setLoginError } from './userRedux'; // Import user slice actions
import { API_URL } from '../config';
import { LoginRequest, LoginResponse } from '../types/interfaces';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: credentials.url,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = data.returnData.token;
          const isAdmin = data.returnData.isAdmin;
          const email = data.returnData.email;
          const _id = data.returnData._id;
          const isAuthenticated = true;
          
          dispatch(loginSuccess({ token, isAdmin, email, _id, isAuthenticated }));
          
        } catch (err: unknown) {
          if (isFetchBaseQueryErrorWithStatusAndMessage(err)) {
            const { status, data } = err.error;
            const message = data.message;

            if (status === 400 && message) {
              dispatch(setLoginError(message));
            } else {
              dispatch(setLoginError(`Error ${status}: ${message}`));
            }
          } else {
            console.error('Unexpected error: ', err);
          }
        }
      },
    }),
  }),
});

function isFetchBaseQueryErrorWithStatusAndMessage(
  error: unknown
): error is FetchBaseQueryError & { error: { status: number; data: { message: string } } } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    (error as { error: { status: unknown; data: unknown } }).error.status !== undefined &&
    typeof (error as { error: { status: unknown } }).error.status === 'number' &&
    'data' in (error as { error: { data: unknown } }).error &&
    typeof (error as { error: { data: unknown } }).error.data === 'object' &&
    'message' in (error as { error: { data: { message?: unknown } } }).error.data &&
    typeof (error as { error: { data: { message: unknown } } }).error.data.message === 'string'
  );
}

export const { useLoginUserMutation } = userApi;