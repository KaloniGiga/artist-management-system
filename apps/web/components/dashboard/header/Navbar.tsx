import { MobileMenu } from "./MobileMenu";
import { UserDropdown } from "./UserDropdown";

export function Navbar() {
  return (
    <header className="w-full sticky top-0 flex justify-between lg:justify-end h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <MobileMenu />
      <UserDropdown />
    </header>
  );
}
