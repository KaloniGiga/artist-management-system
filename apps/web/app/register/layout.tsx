import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full flex min-h-screen items-center justify-center p-4">
      {children}
    </main>
  );
}
