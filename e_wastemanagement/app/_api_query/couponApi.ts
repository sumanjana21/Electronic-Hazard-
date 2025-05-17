import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Coupon {
  _id?: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchaseAmount: number;
  maxDiscountAmount?: number;
  startDate: Date;
  expirationDate: Date;
  usageLimit: number;
  currentUsageCount: number;
  status: 'active' | 'expired' | 'disabled';
  createdBy?: {
    _id: string;
    name: string;
    email: string;
  };
}

interface CouponsResponse {
  success: boolean;
  coupons: Coupon[];
}

export const couponApi = createApi({
  reducerPath: 'couponApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/coupon', // Note the singular 'coupon'
    prepareHeaders: (headers) => {
      return headers;
    },
    credentials: 'include'
  }),
  tagTypes: ['Coupons'],
  endpoints: (builder) => ({
    getCoupons: builder.query<Coupon[], void>({
      query: () => '/',
      transformResponse: (response: CouponsResponse) => {
        return response.success ? response.coupons : [];
      },
      providesTags: ['Coupons']
    }),
    createCoupon: builder.mutation<Coupon, Partial<Coupon>>({
      query: (newCoupon) => ({
        url: '/',
        method: 'POST',
        body: newCoupon
      }),
      invalidatesTags: ['Coupons']
    }),
    updateCoupon: builder.mutation<Coupon, { id: string, updatedCoupon: Partial<Coupon> }>({
      query: ({ id, updatedCoupon }) => ({
        url: '/',
        method: 'PUT',
        body: { id, ...updatedCoupon }
      }),
      invalidatesTags: ['Coupons']
    }),
    deleteCoupon: builder.mutation<void, string>({
      query: (id) => ({
        url: '/',
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: ['Coupons']
    })
  })
});

export const {
  useGetCouponsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation
} = couponApi;