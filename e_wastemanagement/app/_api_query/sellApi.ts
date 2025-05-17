import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export interface EWasteItem {
  _id?: string;
  userId: string;
  deviceType: 'smartphone' | 'laptop' | 'tablet' | 'desktop' | 'other';
  brand: string;
  model: string;
  condition: 'new' | 'good' | 'fair' | 'poor';
  estimatedPrice: number;
  weight: number;
  images: string[];
  status: 'pending' | 'listed' | 'sold' | 'removed';
  createdAt?: Date;
  updatedAt?: Date;
}


export const sellApi = createApi({
  reducerPath: 'sellApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/sell',
    prepareHeaders: (headers) => {
      // The browser will automatically include the cookie, no need to set it here
      return headers;
    },
    credentials: 'include' // Ensure credentials are included in requests
  }),
  tagTypes: ['SellItems'],
  endpoints: (builder) => ({
    getUserSellItems: builder.query<EWasteItem[], void>({
      query: () => '/',
      providesTags: ['SellItems']
    }),
    createSellItem: builder.mutation<EWasteItem, Partial<EWasteItem>>({
      query: (newItem) => ({
        url: '/',
        method: 'POST',
        body: newItem
      }),
      invalidatesTags: ['SellItems']
    }),
    updateSellItem: builder.mutation<EWasteItem, { id: string, updatedItem: Partial<EWasteItem> }>({
      query: ({ id, updatedItem }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: updatedItem
      }),
      invalidatesTags: ['SellItems']
    }),
    deleteSellItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['SellItems']
    })
  })
});

export const {
  useGetUserSellItemsQuery,
  useCreateSellItemMutation,
  useUpdateSellItemMutation,
  useDeleteSellItemMutation
} = sellApi;