"use client";
import { Button } from "@web/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@web/components/ui/dropdown-menu";
import { useLogoutMutation } from "@web/redux/auth/auth.api";
import { CircleUser } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function UserDropdown() {
  const router = useRouter();
  const [logout, { isSuccess }] = useLogoutMutation();
  const onLogoutClick = () => {
    console.log("logout clicked");
    logout();
  };

  useEffect(() => {
    if (isSuccess) {
      router.replace("/");
    }
  }, [isSuccess, router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogoutClick}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
