"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractMessageFromError } from "@web/lib/utils";
import {
  usePostSongMutation,
  usePutSongMutation,
} from "@web/redux/song/song.api";
import { GenreEnum, SongData } from "@web/types/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  isEdit: boolean;
  editData: SongData | null;
  handleDialogClose: () => void;
}

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

export default function useAddEditSong({
  isEdit,
  editData,
  handleDialogClose,
}: Props) {
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
      putSong({ id: editData.id, songDetails: values })
        .unwrap()
        .then(() => {
          handleDialogClose();
        })
        .catch((error) => {
          const errMsg = extractMessageFromError(error);
          toast.error(errMsg ? errMsg : "Failed to update song.");
        });
    } else {
      postSong(values)
        .unwrap()
        .then(() => {
          handleDialogClose();
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
