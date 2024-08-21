import { Navbar } from "@web/components/dashboard/header/Navbar";
// import { TabsMenu } from "@web/components/dashboard/tabs/TabsMenu";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <main className="w-[90%] md:w-[80%] mx-auto py-8">
        {/* <TabsMenu /> */}
        {children}
      </main>
    </div>
  );
}
