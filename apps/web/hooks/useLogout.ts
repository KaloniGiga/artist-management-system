"use client";
import { useLogoutMutation } from "@web/redux/auth/auth.api";

export default function useLogout() {
  const [logout] = useLogoutMutation();
  const onLogoutClick = () => {
    logout()
      .unwrap()
      .then(() => {
        console.log("logged out");
      });
  };

  return { onLogoutClick };
}
