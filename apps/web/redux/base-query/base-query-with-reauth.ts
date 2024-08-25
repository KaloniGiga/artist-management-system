"use client";
import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { isFetchBaseQueryError } from "@web/lib/utils";
import { setLogout } from "../auth/auth.slice";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  credentials: "include",
});

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && isFetchBaseQueryError(result.error)) {
    if (result.error.status == 401) {
      api.dispatch(setLogout());
    }
  }
  return result;
};
