import {
  LoginData,
  User,
  UserMutationResponse,
  UserQueryResponse,
} from "@web/types/types";
import { baseApi } from "../base-query/base-query.config";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postUser: builder.mutation<UserMutationResponse, LoginData>({
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
        method: "POST",
        body: userDetails,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<UserMutationResponse, number>({
      query: (id) => ({
        url: `v1/users/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query<UserQueryResponse, void>({
      query: () => ({
        url: "v1/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  usePostUserMutation,
  usePutUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} = userApi;
