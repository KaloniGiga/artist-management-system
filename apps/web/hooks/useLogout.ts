"use client";
import { useLogoutMutation } from "@web/redux/auth/auth.api";
import { setLogout } from "@web/redux/auth/auth.slice";
import { useAppDispatch } from "@web/redux/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useLogout() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const onLogoutClick = () => {
    logout()
      .unwrap()
      .then(() => {
        dispatch(setLogout());
        router.replace("/");
      })
      .catch(() => {
        toast.error("Failed to logout");
      });
  };

  return { onLogoutClick };
}
