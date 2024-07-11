"use client";

import { handleEnd } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import Link from "next/link";
import { editTask } from "~/lib/actions";
import { capitalizeFirstLetter } from "~/lib/utils";
import { statusEnum, Task } from "~/models";

export default function Kanban({ tasks }: { tasks: Task[] }) {
  const todoItems = tasks.filter((task) => task.status === "to do") || [];
  const inProgressItems =
    tasks.filter((task) => task.status === "in progress") || [];
  const doneItems = tasks.filter((task) => task.status === "done") || [];

  const updateTask = async (task: Task, newStatus: string | null) => {
    if (!newStatus) return;
    if (task.status === newStatus) return;
    const newTask = {
      ...task,
      status: newStatus as "to do" | "in progress" | "done",
    };
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
    <div className="flex h-[700px] w-full justify-center gap-24  p-10">
      <ul
        ref={todoList}
        className="relative w-[350px] overflow-y-auto rounded-xl border-2 border-border bg-background px-4 pt-8 before:absolute before:left-0 before:top-0.5 before:flex before:h-6 before:w-full before:items-center before:justify-center before:text-xl before:font-semibold before:uppercase before:content-[attr(aria-label)]"
        aria-label={statusEnum[0]}
      >
        {todos.map((todo) => (
          <li
            className="mt-3 flex h-32 flex-col items-start gap-2 rounded-xl border-2 border-border bg-background p-3 transition-colors duration-100 ease-in-out first:mt-0 hover:bg-border"
            key={todo.id}
          >
            <Link href={`/task/${todo.id}`} className="hover:underline">
              <div className="font-semibold">TASK-{todo.id}</div>
            </Link>
            <div>{todo.name}</div>
            <div>{capitalizeFirstLetter(todo.priority)}</div>
          </li>
        ))}
      </ul>
      <ul
        ref={inProgressList}
        className="relative w-[350px] overflow-y-auto rounded-xl border-2 border-border bg-background px-4 pt-8 before:absolute before:left-0 before:top-0.5 before:flex before:h-6 before:w-full before:items-center before:justify-center before:text-xl before:font-semibold before:uppercase  before:content-[attr(aria-label)]"
        aria-label={statusEnum[1]}
      >
        {inProgress.map((inProgres) => (
          <li
            className="mt-3 flex h-32 flex-col items-start gap-2 rounded-xl border-2 border-border bg-background p-3 transition-colors duration-100 ease-in-out first:mt-0 hover:bg-border"
            key={inProgres.id}
          >
            <Link href={`/task/${inProgres.id}`} className="hover:underline">
              <div className="font-semibold">TASK-{inProgres.id}</div>
            </Link>
            <div>{inProgres.name}</div>
            <div>{capitalizeFirstLetter(inProgres.priority)}</div>
          </li>
        ))}
      </ul>
      <ul
        ref={doneList}
        className="relative w-[350px] overflow-y-auto rounded-xl border-2 border-border bg-background px-4 pt-8 before:absolute before:left-0 before:top-0.5 before:flex before:h-6 before:w-full before:items-center before:justify-center before:text-xl before:font-semibold before:uppercase  before:content-[attr(aria-label)]"
        aria-label={statusEnum[2]}
      >
        {dones.map((done) => (
          <li
            className="mt-3 flex h-32 flex-col items-start gap-2 rounded-xl border-2 border-border bg-background p-3 transition-colors duration-100 ease-in-out first:mt-0 hover:bg-border"
            key={done.id}
          >
            <Link href={`/task/${done.id}`} className="hover:underline">
              <div className="font-semibold">TASK-{done.id}</div>
            </Link>
            <div>{done.name}</div>
            <div>{capitalizeFirstLetter(done.priority)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
