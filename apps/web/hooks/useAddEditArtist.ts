"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractMessageFromError } from "@web/lib/utils";
import {
  usePostArtistMutation,
  usePutArtistMutation,
} from "@web/redux/artist/artist.api";
import { setArtistDialogOpen } from "@web/redux/dialog/artist-dialog.slice";
import { useAppDispatch, useAppSelector } from "@web/redux/hooks";
import { GenderEnum } from "@web/types/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  gender: z.enum([GenderEnum.FEMALE, GenderEnum.MALE, GenderEnum.OTHER]),
  address: z.string(),
  first_release_year: z.coerce.number(),
  no_of_albums_released: z.coerce.number(),
});

export default function useAddEditArtist() {
  const dispatch = useAppDispatch();
  const { isEdit, editData } = useAppSelector((state) => state.artistDialog);
  const [postArtist, { isLoading: postLoading }] = usePostArtistMutation();
  const [putArtist, { isLoading: putLoading }] = usePutArtistMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.reset();
    if (isEdit && editData) {
      form.setValue("name", editData.name);
      form.setValue("dob", editData.dob);
      form.setValue("gender", editData.gender);
      form.setValue("dob", editData.dob);
      form.setValue("first_release_year", editData.first_release_year);
      form.setValue("no_of_albums_released", editData.no_of_albums_released);
      form.setValue("address", editData.address);
    }
  }, [isEdit, editData]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isEdit && editData) {
      putArtist({ id: editData.id, artistDetails: values })
        .unwrap()
        .then(() => {
          dispatch(setArtistDialogOpen(false));
        })
        .catch((error) => {
          const errMsg = extractMessageFromError(error);
          toast.error(errMsg ? errMsg : "Failed to update artist.");
        });
    } else {
      postArtist(values)
        .unwrap()
        .then(() => {
          dispatch(setArtistDialogOpen(false));
        })
        .catch((error) => {
          const errMsg = extractMessageFromError(error);
          toast.error(errMsg ? errMsg : "Failed to add artist.");
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
