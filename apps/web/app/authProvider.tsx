"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useGetUserQuery } from "../redux/auth/auth.api";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isLoading, error, isSuccess } = useGetUserQuery();

  useEffect(() => {
    if (error) {
      router.replace("/");
    }
  }, [error, router]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (isSuccess) {
    return <div>{children}</div>;
  }
}
