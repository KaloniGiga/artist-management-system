"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReadLoginMutation } from "@web/redux/auth/auth.api";
import { setAuth } from "@web/redux/auth/auth.slice";
import { useAppDispatch } from "@web/redux/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Email is invalid."),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
export default function useLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useReadLoginMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    login(values)
      .unwrap()
      .then(() => {
        dispatch(setAuth());
        router.push("/dashboard");
      })
      .catch(() => {
        toast.error("Failed to log in");
      });
  };

  return {
    isLoading,
    onSubmit,
    formSchema,
    form,
  };
}
