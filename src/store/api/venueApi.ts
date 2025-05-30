// services/venueApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../index";
// import type { User } from "./authApi"; // User interfeysini authApi dan olamiz

// Foydalanuvchi (Venue egasi) uchun interfeys
export interface VenueOwner {
  _id: string;
  username: string;
  email: string;
  role: string;
  // Agar User interfeysida qo'shimcha maydonlar bo'lsa, ularni bu yerga qo'shishingiz mumkin
}

// Interface for booked date information within a Venue object
export interface VenueBookingInfo {
  _id: string; // Booking ID
  date: string;
  userId: string;
}

export interface Venue {
  _id: string;
  name: string;
  images: string[];
  district: string;
  address: string;
  capacity: number;
  pricePerSeat: number;
  phone: string;
  owner: VenueOwner; // Keep this as VenueOwner for responses
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isBooked?: boolean;
  bookedDates?: VenueBookingInfo[]; // Updated from string[] to VenueBookingInfo[]
  description?: string; // Added for potential use in cards
}

// DTO for creating a new venue
export interface CreateVenueDto {
  name: string;
  district: string;
  address: string;
  capacity: number;
  pricePerSeat: number;
  phone: string;
  status: "pending" | "confirmed" | "cancelled" | "approved";
  owner: string; // Owner ID
  description?: string; // Added field
  images?: string[]; // Optional images field for initial creation
}

// Booking uchun interfeyslar
export interface CreateBookingDto {
  venue: string; // Venue ID
  date: string; // ISO sana string (YYYY-MM-DD)
  guestCount: number;
}

export interface Booking {
  _id: string;
  venue: string; // Venue ID
  user: string; // User ID
  date: string; // ISO sana string (YYYY-MM-DD)
  guestCount: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

const BASE_URL = "http://localhost:3000/";

export const venueApi = createApi({
  reducerPath: "venueApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Venue", "Venues", "Booking"], // "Booking" tagini qo'shamiz
  endpoints: (builder) => ({
    getVenues: builder.query<
      Venue[],
      {
        query?: string;
        sortBy?: string;
        sortOrder?: string;
        capacity?: number;
        district?: string;
        minPricePerSeat?: number;
        maxPricePerSeat?: number;
        hasImages?: string;
        fromDate?: string;
        toDate?: string;
        limit?: number; // Add limit parameter
      }
    >({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.query) searchParams.append("query", params.query);
        if (params.sortBy) searchParams.append("sortBy", params.sortBy);
        if (params.sortOrder)
          searchParams.append("sortOrder", params.sortOrder);
        if (params.capacity !== undefined)
          searchParams.append("capacity", String(params.capacity));
        if (params.district) searchParams.append("district", params.district);
        if (params.minPricePerSeat !== undefined)
          searchParams.append(
            "minPricePerSeat",
            String(params.minPricePerSeat)
          );
        if (params.maxPricePerSeat !== undefined)
          searchParams.append(
            "maxPricePerSeat",
            String(params.maxPricePerSeat)
          );
        if (params.hasImages)
          searchParams.append("hasImages", params.hasImages);
        if (params.fromDate) searchParams.append("fromDate", params.fromDate);
        if (params.toDate) searchParams.append("toDate", params.toDate);
        if (params.limit !== undefined)
          searchParams.append("limit", String(params.limit)); // Add limit to query params
        const queryString = searchParams.toString();
        return `venues${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Venue" as const, id: _id })),
              { type: "Venues", id: "LIST" },
            ]
          : [{ type: "Venues", id: "LIST" }],
    }),
    getVenueById: builder.query<Venue, string>({
      query: (id) => `venues/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Venue", id }],
    }),
    createBooking: builder.mutation<Booking, CreateBookingDto>({
      query: (bookingDetails) => ({
        url: "bookings",
        method: "POST",
        body: bookingDetails,
      }),
      invalidatesTags: (_result, _error, { venue }) => [
        { type: "Booking", id: "LIST" },
        { type: "Venue", id: venue }, // Venue detailni qayta yuklash uchun
        { type: "Venues", id: "LIST" }, // Venues listini ham yangilash mumkin (agar bookedDates ko'rsatilsa)
      ],
    }),
    deleteBooking: builder.mutation<
      void,
      { bookingId: string; venueId: string }
    >({
      query: ({ bookingId }) => ({
        url: `bookings/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { venueId }) => [
        { type: "Booking", id: "LIST" }, // General booking list
        { type: "Venue", id: venueId }, // Specific venue
        { type: "Venues", id: "LIST" }, // Venues list, as availability might change
      ],
    }),
    createVenue: builder.mutation<Venue, CreateVenueDto>({
      query: (newVenueData) => ({
        url: "venues",
        method: "POST",
        body: newVenueData,
      }),
      invalidatesTags: [{ type: "Venues", id: "LIST" }],
    }),
    updateVenue: builder.mutation<
      Venue,
      { venueId: string } & Partial<Omit<Venue, "owner">> & { owner?: string }
    >({
      query: ({ venueId, ...patch }) => ({
        url: `venues/${venueId}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { venueId }) => [
        { type: "Venue", id: venueId },
        { type: "Venues", id: "LIST" },
      ],
    }),
    uploadVenueImages: builder.mutation<
      string[],
      { venueId: string; formData: FormData }
    >({
      query: ({ venueId, formData }) => ({
        url: `venues/${venueId}/upload-image`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (_result, _error, { venueId }) => [
        { type: "Venue", id: venueId },
        { type: "Venues", id: "LIST" },
      ],
    }),
    deleteVenue: builder.mutation<void, string>({
      query: (id) => ({
        url: `venues/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Venue", id },
        { type: "Venues", id: "LIST" },
      ],
    }),
    getVenueByOwner: builder.query<Venue[], string>({
      query: (ownerId) => `venues/owner/${ownerId}`, // Assuming this endpoint exists or will be created
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Venue" as const, id: _id })),
              { type: "Venues", id: "LIST" },
            ]
          : [{ type: "Venues", id: "LIST" }],
    }),
  }),
});

export const {
  useGetVenuesQuery,
  useGetVenueByIdQuery,
  useCreateBookingMutation,
  useDeleteBookingMutation,
  useCreateVenueMutation, // Export createVenue mutation
  useUpdateVenueMutation,
  useUploadVenueImagesMutation,
  useDeleteVenueMutation, // hook for deleting venues
  useGetVenueByOwnerQuery, // hook for getting venues by owner
} = venueApi;
