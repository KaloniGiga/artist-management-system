"use client";
import { ReactNode } from "react";
import useVerify from "@web/hooks/useVerify";

export default function AuthenticationLayoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  useVerify();
  return children;
}
