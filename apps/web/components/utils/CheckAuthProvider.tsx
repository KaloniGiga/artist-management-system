"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@web/redux/hooks";
import useVerify from "@web/hooks/useVerify";

export default function CheckAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { isLoading, error, isFetching } = useVerify();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && !isFetching && !isLoading) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isFetching, isLoading]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return children;
  }
}
