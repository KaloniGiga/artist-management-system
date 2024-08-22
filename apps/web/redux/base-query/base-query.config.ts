import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_API_SLICE = "baseApi";
export const baseApi = createApi({
  reducerPath: BASE_API_SLICE,
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 10,
  endpoints: () => ({}),
});
