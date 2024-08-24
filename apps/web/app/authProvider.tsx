"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useGetUserQuery } from "../redux/auth/auth.api";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, error } = useGetUserQuery();

  useEffect(() => {
    if (error && pathname !== "/" && pathname !== "/register") {
      router.replace("/");
    }
  }, [error, router, pathname]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return <div>{children}</div>;
}
