"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Loader2 } from "lucide-react";
import useVerify from "@web/hooks/useVerify";
import { useAppSelector } from "@web/redux/hooks";

export default function RequireAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { isLoading, data } = useVerify();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (data) {
    return <div>{children}</div>;
  }
}
