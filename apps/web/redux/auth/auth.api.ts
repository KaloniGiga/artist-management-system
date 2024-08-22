import {
  AuthenticateResponse,
  LoginData,
  LogoutResponse,
  User,
} from "@web/types/types";
import { baseApi } from "../base-query/base-query.config";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    readLogin: builder.mutation<AuthenticateResponse, LoginData>({
      query: (userData) => ({
        url: `v1/auth/log-in`,
        method: "POST",
        body: userData,
      }),
    }),
    registerUser: builder.mutation<AuthenticateResponse, User>({
      query: (userDetails) => ({
        url: "v1/auth/register",
        method: "POST",
        body: userDetails,
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "v1/auth/log-out",
        method: "POST",
      }),
    }),
    getUser: builder.query<AuthenticateResponse, void>({
      query: () => ({
        url: "v1/auth",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useReadLoginMutation,
  useRegisterUserMutation,
  useLogoutMutation,
  useGetUserQuery,
} = authApi;
