"use client";
import AuthProvider from "@web/components/utils/AuthProvider";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
