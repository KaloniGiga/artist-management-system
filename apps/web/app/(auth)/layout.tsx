import CheckAuthProvider from "@web/components/utils/CheckAuthProvider";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <CheckAuthProvider>{children}</CheckAuthProvider>;
}
