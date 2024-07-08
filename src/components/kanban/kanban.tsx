"use client";

import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { handleDragstart, handleEnd } from "@formkit/drag-and-drop";
import { statusEnum, Task } from "~/models";
import { editTask } from "~/lib/actions";

export default function Kanban({ tasks }: { tasks: Task[] }) {
  const todoItems = tasks.filter((task) => task.status === "to do") || [];
  const inProgressItems =
    tasks.filter((task) => task.status === "in progress") || [];
  const doneItems = tasks.filter((task) => task.status === "done") || [];

  const updateTask = async (task: Task, newStatus: string | null) => {
    if (!newStatus) return;
    if (task.status === newStatus) return;
    const newTask = { ...task, status: newStatus };
    await editTask(newTask);
  };

  const [todoList, todos] = useDragAndDrop<HTMLUListElement, Task>(todoItems, {
    group: "kanban",
    handleEnd(data) {
      updateTask(
        data.targetData.node.data.value,
        data.targetData.parent.el.ariaLabel,
      );
      handleEnd(data);
    },
  });

  const [inProgressList, inProgress] = useDragAndDrop<HTMLUListElement, Task>(
    inProgressItems,
    {
      group: "kanban",
      handleEnd(data) {
        updateTask(
          data.targetData.node.data.value,
          data.targetData.parent.el.ariaLabel,
        );
        handleEnd(data);
      },
    },
  );
  const [doneList, dones] = useDragAndDrop<HTMLUListElement, Task>(doneItems, {
    group: "kanban",
    handleEnd(data) {
      updateTask(
        data.targetData.node.data.value,
        data.targetData.parent.el.ariaLabel,
      );
      handleEnd(data);
    },
  });
  return (
    <div className="flex">
      <ul
        ref={todoList}
        className="w-[150px] bg-red-300"
        aria-label={statusEnum[0]}
      >
        {todos.map((todo) => (
          <li className="kanban-item" key={todo.id}>
            {todo.name}
          </li>
        ))}
      </ul>
      <ul
        ref={inProgressList}
        className="w-[150px] bg-red-500"
        aria-label={statusEnum[1]}
      >
        {inProgress.map((inProgres) => (
          <li className="kanban-item" key={inProgres.id}>
            {inProgres.name}
          </li>
        ))}
      </ul>
      <ul
        ref={doneList}
        className="w-[150px] bg-red-800"
        aria-label={statusEnum[2]}
      >
        {dones.map((done) => (
          <li className="kanban-item" key={done.id}>
            {done.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
