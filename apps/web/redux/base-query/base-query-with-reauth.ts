"use client";
import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { isFetchBaseQueryError } from "@web/lib/utils";
import { Mutex } from "async-mutex";

const mutex = new Mutex();
export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  credentials: "include",
});

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && isFetchBaseQueryError(result.error)) {
    if (result.error.status == 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          const refreshResult = await baseQuery(
            { credentials: "include", url: "v1/auth/refresh" },
            api,
            extraOptions,
          );

          if (refreshResult.data) {
            result = await baseQuery(args, api, extraOptions);
          } else {
            window.location.href = "/";
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
  }

  return result;
};
