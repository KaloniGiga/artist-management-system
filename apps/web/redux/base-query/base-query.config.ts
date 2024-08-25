import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base-query-with-reauth";

export const BASE_API_SLICE = "baseApi";
export const baseApi = createApi({
  reducerPath: BASE_API_SLICE,
  tagTypes: ["Auth", "User", "Artist", "Song"],
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 10,
  endpoints: () => ({}),
});
