import { Button } from "@web/components/ui/button";
import { Bell } from "lucide-react";

export function Notification() {
  return (
    <Button variant={"outline"} size={"icon"}>
      <Bell size={18} />
    </Button>
  );
}
