import {
  Artist,
  ArtistMutationResponse,
  ArtistQueryResponse,
} from "@web/types/types";
import { baseApi } from "../base-query/base-query.config";

export const artistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postArtist: builder.mutation<ArtistMutationResponse, Artist>({
      query: (artistData) => ({
        url: `v1/artists`,
        method: "POST",
        body: artistData,
      }),
      invalidatesTags: ["Artist"],
    }),
    putArtist: builder.mutation<
      ArtistMutationResponse,
      { id: number; artistDetails: Artist }
    >({
      query: ({ id, artistDetails }) => ({
        url: `v1/artists/${id}`,
        method: "PUT",
        body: artistDetails,
      }),
      invalidatesTags: ["Artist"],
    }),
    deleteArtist: builder.mutation<ArtistMutationResponse, number>({
      query: (id) => ({
        url: `v1/artists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Artist"],
    }),
    getArtists: builder.query<
      ArtistQueryResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `v1/artists?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Artist"],
    }),
  }),
});

export const {
  usePostArtistMutation,
  usePutArtistMutation,
  useDeleteArtistMutation,
  useGetArtistsQuery,
} = artistApi;
