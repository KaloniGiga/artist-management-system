import { Button } from "@web/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@web/components/ui/sheet";
import { Menu, Music } from "lucide-react";
import Link from "next/link";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Music className="h-6 w-6" />
          </Link>
          <Link href="/dashboard" className="hover:text-foreground">
            Users
          </Link>
          <Link
            href="/dashboard/artists"
            className="text-muted-foreground hover:text-foreground"
          >
            Artists
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
