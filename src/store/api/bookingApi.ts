import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../index";
import type { User } from "./authApi";
import type { Venue } from "./venueApi";

export interface BookingDetails {
  _id: string;
  user: User;
  venue: Venue;
  date: string;
  guestCount: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingDto {
  venue: string;
  date: string;
  guestCount: number;
}

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Booking"],
  endpoints: (builder) => ({
    getBookings: builder.query<BookingDetails[], void>({
      query: () => "bookings",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Booking" as const,
                id: _id,
              })),
              { type: "Booking", id: "LIST" },
            ]
          : [{ type: "Booking", id: "LIST" }],
    }),
    getBookingsByOwner: builder.query<BookingDetails[], string>({
      query: (ownerId) => `bookings/owner/${ownerId}`, // Assuming this endpoint exists or will be created
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Booking" as const,
                id: _id,
              })),
              { type: "Booking", id: "LIST" },
            ]
          : [{ type: "Booking", id: "LIST" }],
    }),
    createBooking: builder.mutation<BookingDetails, CreateBookingDto>({
      query: (body) => ({
        url: "bookings",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Booking", id: "LIST" }],
    }),
    updateBooking: builder.mutation<
      BookingDetails,
      { bookingId: string } & Partial<CreateBookingDto> & {
          status?: string;
          totalPrice?: number;
        }
    >({
      query: ({ bookingId, ...patch }) => ({
        url: `bookings/${bookingId}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { bookingId }) => [
        { type: "Booking", id: bookingId },
        { type: "Booking", id: "LIST" },
      ],
    }),
    deleteBooking: builder.mutation<void, string>({
      query: (id) => ({
        url: `bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Booking", id },
        { type: "Booking", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingsByOwnerQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
