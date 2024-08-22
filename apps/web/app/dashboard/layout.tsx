import { Navbar } from "@web/components/dashboard/header/Navbar";
import { ReactNode } from "react";
// import AuthProvider from "../authProvider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    // <AuthProvider>
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <main className="w-[90%] md:w-[80%] mx-auto py-8">{children}</main>
    </div>
    // </AuthProvider>
  );
}
