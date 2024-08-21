/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import Link from "next/link";
import { useState } from "react";

export function TabsMenu() {
  const pathname = usePathname();
  const [tabValue, setTabValue] = useState(
    pathname == "/dashboard/artists" ? "artists" : "users",
  );

  return (
    <Tabs defaultValue={tabValue} className="w-[400px] my-4">
      <TabsList>
        <Link href={"/dashboard"}>
          <TabsTrigger value={"users"}>Users</TabsTrigger>
        </Link>

        <Link href={"/dashboard/artists"}>
          <TabsTrigger value={"artists"}>Artists</TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
