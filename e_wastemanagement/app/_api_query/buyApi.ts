import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface EWasteItem {
  _id?: string;
  deviceType: string;
  condition: string;
  brand: string;
  model: string;
  weight: number;
  images: string[];
  estimatedPrice: number;
  status: string;
  userId?: string;
  buyerId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BuyItemFilters {
  deviceType?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export interface BuyItemResponse {
  items: EWasteItem[];
  total: number;
  page: number;
  totalPages: number;
}

export const buyApi = createApi({
  reducerPath: 'buyApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/buy',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['BuyItems'],
  endpoints: (builder) => ({
    // Enhanced get buy items query with comprehensive filtering and pagination
    getBuyItems: builder.query<BuyItemResponse, BuyItemFilters>({
      query: (filters) => ({
        url: '',
        params: {
          deviceType: filters.deviceType,
          condition: filters.condition,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          search: filters.search,
          page: filters.page || 1,
          limit: filters.limit || 12
        }
      }),
      providesTags: ['BuyItems']
    }),

    // Fetch single buy item
    getBuyItem: builder.query<EWasteItem, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'BuyItems', id }]
    }),

    // Reserve or buy an item
    updateBuyItem: builder.mutation<EWasteItem, { id: string, updates: Partial<EWasteItem> }>({
      query: ({ id, updates }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: updates
      }),
      invalidatesTags: ['BuyItems']
    })
  })
});

export const { 
  useGetBuyItemsQuery, 
  useGetBuyItemQuery, 
  useUpdateBuyItemMutation 
} = buyApi;