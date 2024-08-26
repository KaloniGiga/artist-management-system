"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@web/redux/hooks";
import useVerify from "@web/hooks/useVerify";
import { forwardRoute } from "@web/lib/access-routes";

export default function CheckAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { isLoading, error, isFetching, data: userData } = useVerify();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    /**
     * @function: If user is authenticated, forward the user to specific route based on the role
     * executes only if the user is logged in and user data is feteched successfully.
     */
    if (isAuthenticated && !isFetching && !isLoading && userData) {
      // find out which route the user with given role is forwarded.
      const forwardToRouteOrFunction = forwardRoute[userData.data.role_type];
      // if user role is artist, a function is returned, which returns a constructed route with artistId
      const targetRoute =
        typeof forwardToRouteOrFunction == "string"
          ? forwardToRouteOrFunction
          : forwardToRouteOrFunction(
              userData.data.artistId ? userData.data.artistId : null,
            );
      router.push(targetRoute);
    }
  }, [isAuthenticated, isFetching, isLoading, userData]);

  // if user is loading, show loading screen
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  // if user token has expired or user is not authenticated, fetching user detail return error, therefore show login page.
  if (error) {
    return children;
  }
}
