import {
  User,
  UserDeleteResponse,
  UserMutationResponse,
  UserQueryResponse,
} from "@web/types/types";
import { baseApi } from "../base-query/base-query.config";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postUser: builder.mutation<UserMutationResponse, User>({
      query: (userData) => ({
        url: `v1/users`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    putUser: builder.mutation<
      UserMutationResponse,
      { id: number; userDetails: User }
    >({
      query: ({ id, userDetails }) => ({
        url: `v1/users/${id}`,
        method: "PUT",
        body: userDetails,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<UserDeleteResponse, number>({
      query: (id) => ({
        url: `v1/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query<UserQueryResponse, { page: number; limit: number }>(
      {
        query: ({ page, limit }) => ({
          url: `v1/users?page=${page}&limit=${limit}`,
          method: "GET",
        }),
        providesTags: ["User"],
      },
    ),
  }),
});

export const {
  usePostUserMutation,
  usePutUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} = userApi;
