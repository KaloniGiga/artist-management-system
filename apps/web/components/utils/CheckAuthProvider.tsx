"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@web/redux/hooks";
import { forwardRoute } from "@web/lib/access-routes";

export default function CheckAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { isLoading, isAuthenticated, userInfo } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    /**
     * @function: If user is authenticated, forward the user to specific route based on the role
     * executes only if the user is logged in and user data is feteched successfully.
     */
    if (isAuthenticated && !isLoading && userInfo) {
      // find out which route the user with given role is forwarded.
      const forwardToRouteOrFunction = forwardRoute[userInfo.role_type];
      // if user role is artist, a function is returned, which returns a constructed route with artistId
      const targetRoute =
        typeof forwardToRouteOrFunction == "string"
          ? forwardToRouteOrFunction
          : forwardToRouteOrFunction(
              userInfo?.artistId ? userInfo.artistId : null,
            );
      console.log("routing to target");
      router.push(targetRoute);
    }
  }, [isAuthenticated, isLoading, userInfo]);

  // if user is loading, show loading screen
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  // if user token has expired or user is not authenticated, fetching user detail return error, therefore show login page.
  if (!isAuthenticated && !isLoading) {
    return children;
  }
}
