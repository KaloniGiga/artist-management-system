"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractMessageFromError } from "@web/lib/utils";
import { useGetArtistsQuery } from "@web/redux/artist/artist.api";
import { setUserDialogOpen } from "@web/redux/dialog/user-dialog.slice";
import { useAppDispatch, useAppSelector } from "@web/redux/hooks";
import {
  usePostUserMutation,
  usePutUserMutation,
} from "@web/redux/user/user.api";
import { GenderEnum, RoleEnum } from "@web/types/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import validator from "validator";
import { z } from "zod";

const formSchema = z
  .object({
    first_name: z.string().min(1, { message: "First name is required" }),
    last_name: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Email is invalid."),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    phone: z.string().refine(validator.isMobilePhone),
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
    gender: z.enum([GenderEnum.FEMALE, GenderEnum.MALE, GenderEnum.OTHER]),
    role_type: z.enum([
      RoleEnum.SUPERADMIN,
      RoleEnum.ARTISTMANAGER,
      RoleEnum.ARTIST,
    ]),
    artistId: z.coerce.number().optional(),
    address: z.string(),
  })
  .refine((data) => !(data.role_type == RoleEnum.ARTIST && !data.artistId), {
    message: "ArtistId is required for Role Artist",
    path: ["artistId"],
  });

export default function useAddEditUser() {
  // todo: make the artist query able to fetch all the data without pagination
  const dispatch = useAppDispatch();
  const { isEdit, editData } = useAppSelector((state) => state.userDialog);
  const { data: artistsData } = useGetArtistsQuery({ page: 0, limit: 10 });
  const [postUser, { isLoading: postLoading }] = usePostUserMutation();
  const [putUser, { isLoading: putLoading }] = usePutUserMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const watchRole = form.watch("role_type");

  useEffect(() => {
    form.reset();
    if (isEdit && editData) {
      form.setValue("first_name", editData.first_name);
      form.setValue("last_name", editData.last_name);
      form.setValue("email", editData.email);
      form.setValue("dob", new Date(editData.dob));
      form.setValue("gender", editData.gender);
      form.setValue("phone", editData.phone);
      form.setValue("role_type", editData.role_type);
      form.setValue("artistId", editData.artistId);
      form.setValue("address", editData.address);
    }
  }, [isEdit, editData]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (isEdit && editData) {
      putUser({ id: editData.id, userDetails: values })
        .unwrap()
        .then(() => {
          dispatch(setUserDialogOpen(false));
        })
        .catch((error) => {
          const errMsg = extractMessageFromError(error);
          toast.error(errMsg ? errMsg : "Failed to update user.");
        });
    } else {
      postUser(values)
        .unwrap()
        .then(() => {
          dispatch(setUserDialogOpen(false));
        })
        .catch((error) => {
          const errMsg = extractMessageFromError(error);
          toast.error(errMsg ? errMsg : "Failed to add user.");
        });
    }
  };

  return {
    putLoading,
    postLoading,
    onSubmit,
    formSchema,
    form,
    watchRole,
    artistsData,
  };
}
