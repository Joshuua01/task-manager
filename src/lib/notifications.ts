import { Subject } from "rxjs";
import { Task, Notification } from "~/models";
import { addNotification } from "./actions";

const taskAssignmentNotifier = new Subject<Task>();

taskAssignmentNotifier.subscribe((task) => {
  if (!task.assigneeId) return;
  addNotification({
    title: "Task Assignment",
    message: `Task ${task.name} has been assigned to you`,
    priority: task.priority,
    userId: task.assigneeId,
    taskId: task.id,
  } as Notification);
});

export const notifyTaskAssignment = (task: Task) => {
  taskAssignmentNotifier.next(task);
};
