"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Loader2 } from "lucide-react";
import useVerify from "@web/hooks/useVerify";
import { useAppSelector } from "@web/redux/hooks";
import { matchRoutes } from "@web/lib/access-routes";

export default function RequireAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, data: userData } = useVerify();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  /**
   * @description: if user is not authenticated, show login page,
   */
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated]);

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
  if (userData) {
    if (
      matchRoutes(userData.data.role_type, pathname, userData.data?.artistId)
    ) {
      return <div>{children}</div>;
    } else {
      router.push("/404");
    }
  }
}
