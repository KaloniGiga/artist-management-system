"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractMessageFromError } from "@web/lib/utils";
import { setSongDialogOpen } from "@web/redux/dialog/song-dialog.slice";
import { useAppDispatch, useAppSelector } from "@web/redux/hooks";
import {
  usePostSongMutation,
  usePutSongMutation,
} from "@web/redux/song/song.api";
import { GenreEnum } from "@web/types/types";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  album_name: z.string().min(1, { message: "Album name is required" }),
  genre: z.enum([
    GenreEnum.CLASSIC,
    GenreEnum.COUNTRY,
    GenreEnum.JAZZ,
    GenreEnum.RNB,
    GenreEnum.ROCK,
  ]),
});

export default function useAddEditSong() {
  const dispatch = useAppDispatch();
  const { isEdit, editData } = useAppSelector((state) => state.songDialog);
  const params = useParams();
  const artistId = Number(params.artistId);
  const [postSong, { isLoading: postLoading }] = usePostSongMutation();
  const [putSong, { isLoading: putLoading }] = usePutSongMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.reset();
    if (isEdit && editData) {
      form.setValue("title", editData.title);
      form.setValue("album_name", editData.album_name);
      form.setValue("genre", editData.genre);
    }
  }, [isEdit, editData]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isEdit && editData) {
      putSong({
        id: editData.id,
        songDetails: { ...values, artistId: editData.artistId },
      })
        .unwrap()
        .then(() => {
          dispatch(setSongDialogOpen(false));
        })
        .catch((error) => {
          const errMsg = extractMessageFromError(error);
          toast.error(errMsg ? errMsg : "Failed to update song.");
        });
    } else {
      // check if artistId is valid number.
      if (!artistId || isNaN(artistId)) {
        toast.error("Song is invalid.");
        return;
      }
      postSong({ ...values, artistId: artistId })
        .unwrap()
        .then(() => {
          dispatch(setSongDialogOpen(false));
        })
        .catch((error) => {
          const errMsg = extractMessageFromError(error);
          toast.error(errMsg ? errMsg : "Failed to add song.");
        });
    }
  };

  return {
    postLoading,
    putLoading,
    onSubmit,
    formSchema,
    form,
  };
}
