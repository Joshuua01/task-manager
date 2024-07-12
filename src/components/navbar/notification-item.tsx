"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { deleteNotification } from "~/lib/actions";
import { capitalizeFirstLetter } from "~/lib/utils";
import { Notification } from "~/models";

export default function NotificationItem({
  notification,
}: {
  notification: Notification;
}) {
  const router = useRouter();
  const handleNotificationClick = () => {
    startTransition(async () => {
      await deleteNotification(notification.id);
    });

    router.push(`/task/${notification.taskId}`);
  };

  return (
    <div
      className="flex cursor-pointer flex-col gap-2 p-3"
      onClick={handleNotificationClick}
    >
      <div className="text-lg font-semibold">{notification.title}</div>
      <div className="text-sm text-white/85">{notification.message}</div>
      <div className="text-sm text-white/85">
        {capitalizeFirstLetter(notification.priority)}
      </div>
      <div className="text-sm text-white/85">
        {notification.creationDate.toDateString()}
      </div>
    </div>
  );
}
