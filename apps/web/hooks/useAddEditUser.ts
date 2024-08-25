"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  usePostUserMutation,
  usePutUserMutation,
} from "@web/redux/user/user.api";
import { GenderEnum, RoleEnum, UserData } from "@web/types/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import validator from "validator";
import { z } from "zod";

interface Props {
  isEdit: boolean;
  editData: UserData | null;
  handleDialogClose: () => void;
}

const formSchema = z.object({
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
  address: z.string(),
});

export default function useAddEditUser({
  isEdit,
  editData,
  handleDialogClose,
}: Props) {
  const [postUser, { isLoading: postLoading }] = usePostUserMutation();
  const [putUser, { isLoading: putLoading }] = usePutUserMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (isEdit && editData) {
      form.setValue("first_name", editData.first_name);
      form.setValue("last_name", editData.last_name);
      form.setValue("email", editData.email);
      form.setValue("dob", editData.dob);
      form.setValue("gender", editData.gender);
      form.setValue("phone", editData.phone);
      form.setValue("role_type", editData.role_type);
      form.setValue("address", editData.address);
    }
  }, [isEdit, editData]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isEdit && editData) {
      putUser({ id: editData.id, userDetails: values })
        .unwrap()
        .then(() => {
          handleDialogClose();
        })
        .catch((error) => {
          toast.error(error.message ? error.message : "Failed to update user.");
        });
    } else {
      postUser(values)
        .unwrap()
        .then(() => {
          handleDialogClose();
        })
        .catch((error) => {
          toast.error(error.message ? error.message : "Failed to add user.");
        });
    }
  };

  return {
    putLoading,
    postLoading,
    onSubmit,
    formSchema,
    form,
  };
}
