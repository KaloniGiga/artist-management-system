"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useGetUserQuery } from "@web/redux/auth/auth.api";

export default function CheckAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { isLoading, isSuccess, isError } = useGetUserQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess);
      router.replace("/dashboard");
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return children;
  }
}
