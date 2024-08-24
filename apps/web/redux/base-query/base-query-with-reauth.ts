"use client";
import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { isFetchBaseQueryError } from "@web/lib/utils";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  credentials: "include",
});

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && isFetchBaseQueryError(result.error)) {
    if (result.error.status == 401) {
      window.location.href = "/";
    } else {
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
