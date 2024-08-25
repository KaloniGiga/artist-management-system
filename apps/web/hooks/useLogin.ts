"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRoute } from "@web/lib/access-routes";
import { extractMessageFromError } from "@web/lib/utils";
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
      .then((data) => {
        dispatch(setAuth());
        const forwardToRouteOrFunction = forwardRoute[data.data.role_type];
        const targetRoute =
          typeof forwardToRouteOrFunction == "string"
            ? forwardToRouteOrFunction
            : forwardToRouteOrFunction(data.data.id);
        router.push(targetRoute);
      })
      .catch((error) => {
        const errMsg = extractMessageFromError(error);
        toast.error(errMsg ? errMsg : "Failed to log in");
      });
  };

  return {
    isLoading,
    onSubmit,
    formSchema,
    form,
  };
}
