"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@web/redux/hooks";
import { matchRoutes } from "@web/lib/access-routes";

export default function RequireAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, userInfo, isLoading } = useAppSelector(
    (state) => state.auth,
  );

  /**
   * @description: if user is not authenticated, show login page,
   */
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      console.log("routing to login");
      router.replace("/");
    }
  }, [isAuthenticated, isLoading]);
  // show loading screen, while verifying the auth state from server.
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  /**
   * @description: if user is logged in, check if user has permission to access the route
   */
  if (userInfo) {
    if (matchRoutes(userInfo.role_type, pathname, userInfo?.artistId)) {
      return <div>{children}</div>;
    } else {
      router.push("/404");
    }
  }
}
