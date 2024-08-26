import {
  Song,
  SongMutationResponse,
  SongQueryResponse,
} from "@web/types/types";
import { baseApi } from "../base-query/base-query.config";

export const songApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postSong: builder.mutation<SongMutationResponse, Song>({
      query: (songData) => ({
        url: `v1/songs`,
        method: "POST",
        body: songData,
      }),
      invalidatesTags: ["Song"],
    }),
    putSong: builder.mutation<
      SongMutationResponse,
      { id: number; songDetails: Song }
    >({
      query: ({ id, songDetails }) => ({
        url: `v1/songs/${id}`,
        method: "PUT",
        body: songDetails,
      }),
      invalidatesTags: ["Song"],
    }),
    deleteSong: builder.mutation<SongMutationResponse, number>({
      query: (id) => ({
        url: `v1/songs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Song"],
    }),
    getSongs: builder.query<
      SongQueryResponse,
      { artistId: number; page: number; limit: number }
    >({
      query: ({ artistId, page, limit }) => ({
        url: `v1/songs/artist/${artistId}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Song"],
    }),
  }),
});

export const {
  useGetSongsQuery,
  usePostSongMutation,
  usePutSongMutation,
  useDeleteSongMutation,
} = songApi;
