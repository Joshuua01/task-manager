import { Bell } from "lucide-react";
import { Notification } from "../../models";
import { logout } from "~/lib/actions";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import NotificationItem from "./notification-item";
import { cn } from "~/lib/utils";

export default function NotificationDropdown({
  notifications,
}: {
  notifications: Notification[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex items-center justify-center overflow-hidden rounded-full"
          size="icon"
          variant="outline"
        >
          <Bell
            className={cn(
              "h-4 w-4",
              notifications.length > 0 && "animate-pulse",
            )}
            fill="currentColor"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id}>
              <NotificationItem notification={notification} />
            </DropdownMenuItem>
          ))
        ) : (
          <div className="p-2 text-lg">No new notification!</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
