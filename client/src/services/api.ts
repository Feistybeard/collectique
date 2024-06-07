import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';

export interface User {
  email: string;
  password: string;
  role: string;
  // message: string;
}

interface ReturnResponse {
  success: boolean;
  message: string;
}

// success: boolean;
// exp  ort interface Error {}

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: config.API_BASE_URL }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<ReturnResponse, Partial<User>>({
      query: (formData) => ({
        url: 'user',
        method: 'POST',
        body: formData,
      }),
    }),
    registerUser: builder.mutation<ReturnResponse, Partial<User>>({
      query: (formData) => ({
        url: 'user/register',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = api;
export default api;
