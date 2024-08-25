"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractMessageFromError } from "@web/lib/utils";
import { useRegisterUserMutation } from "@web/redux/auth/auth.api";
import { GenderEnum, RoleEnum } from "@web/types/types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import validator from "validator";
import { z } from "zod";

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

export default function useRegister() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterUserMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    register(values)
      .unwrap()
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        const errMsg = extractMessageFromError(error);
        toast.error(errMsg ? errMsg : "Failed to register");
      });
  };

  return {
    isLoading,
    onSubmit,
    formSchema,
    form,
  };
}
