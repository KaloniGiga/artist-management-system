import { UserDropdown } from "./UserDropdown";
import { Notification } from "./Notification";
import Link from "next/link";
import { AudioLines } from "lucide-react";

export function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 flex justify-end lg:justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-8 lg:px-16">
      <nav className="hidden w-1/4 lg:flex justify-between gap-x-4 md:gap-x-8 items-center">
        <div className="flex items-center gap-x-4">
          <AudioLines />
          <span className="font-bold italic">artist-ms</span>
        </div>
        <div className="flex gap-x-4 text-sm font-medium">
          <Link href={"/dashboard"} className="hover:opacity-60">
            Users
          </Link>
          <Link href={"/dashboard/artists"} className="hover:opacity-60">
            Artists
          </Link>
        </div>
      </nav>
      <div className="flex items-center gap-x-4">
        <Notification />
        <UserDropdown />
      </div>
    </header>
  );
}
