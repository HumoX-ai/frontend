// services/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "..";

export interface User {
  id?: string;
  _id?: string;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface AuthResponse {
  access_token: string;
  user: User;
}

const BASE_URL = "http://localhost:3000/";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["User"], // Add User tag type
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
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      AuthResponse,
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    registerUser: builder.mutation<
      AuthResponse,
      Omit<User, "id" | "_id" | "role"> & { password: string }
    >({
      query: (userInfo) => ({
        url: "auth/register",
        method: "POST",
        body: { ...userInfo, role: "user" },
      }),
    }),

    // New mutation for creating a user (e.g., by an admin)
    createUser: builder.mutation<
      User, // Assuming the backend returns the created user
      Omit<User, "id" | "_id"> & { password: string } // Role will be part of User input
    >({
      query: (newUserInfo) => ({
        url: "users", // Assuming a POST request to /users creates a new user
        method: "POST",
        body: newUserInfo,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }], // Refetch the list of users
    }),

    getProfile: builder.query<User, void>({
      query: () => "auth/profile",
    }),
    getUsersByRole: builder.query<User[], { role: string }>({
      query: ({ role }) => `users?role=${role}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "User" as const, id: _id! })),
              { type: "User" as const, id: "LIST" },
            ]
          : [{ type: "User" as const, id: "LIST" }],
    }),
    updateUser: builder.mutation<User, Partial<User> & { userId: string }>({
      query: ({ userId, ...patch }) => ({
        url: `users/${userId}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
      ],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useCreateUserMutation, // Export the new mutation
  useGetProfileQuery,
  useGetUsersByRoleQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = authApi;
