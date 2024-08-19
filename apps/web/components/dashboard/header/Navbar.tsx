import { Package2 } from "lucide-react";
import Link from "next/link";
import { UserDropdown } from "./UserDropdown";

export function Navbar() {
  return (
    <header className="sticky top-0 flex justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="flex gap-6 text-lg font-medium">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>

        <Link
          href="#"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
      </nav>
      <UserDropdown />
    </header>
  );
}
