import { UserDropdown } from "./UserDropdown";
import { Music } from "lucide-react";
import { Notification } from "./Notification";

export function Navbar() {
  return (
    <header className="w-full sticky top-0 flex justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="flex justify-center gap-x-4 items-center">
        <Music />
        <span className="font-bold">AMS</span>
      </nav>
      <div className="flex items-center gap-x-4">
        <Notification />
        <UserDropdown />
      </div>
    </header>
  );
}
