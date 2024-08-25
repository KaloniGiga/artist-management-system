import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@web/components/ui/sonner";
import StoreProvider from "@web/components/utils/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AMS",
  description: "Artist Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
