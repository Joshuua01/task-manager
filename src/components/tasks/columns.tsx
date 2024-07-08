/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Task, type Story } from "~/models";
import { creationDateString, prioritySort, statusSort } from "~/lib/utils";
// import { DataTableOptions } from "./data-table-options";
import DataTableColHeader from "../story/data-table-col-header";
import Link from "next/link";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <DataTableColHeader title="Id" column={column} />;
    },
    size: 75,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColHeader title="Name" column={column} />;
    },
    cell: ({ row }) => {
      return (
        <span className={"cursor-pointer"}>
          <Link href={`/task/${row.original.id}`}>{row.getValue("name")}</Link>
        </span>
      );
    },
    size: 250,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return <DataTableColHeader title="Priority" column={column} />;
    },
    sortingFn: prioritySort,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    size: 150,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColHeader title="Status" column={column} />;
    },
    sortingFn: statusSort,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    size: 150,
  },
  {
    accessorKey: "creationDate",
    header: ({ column }) => {
      return <DataTableColHeader title="Created" column={column} />;
    },
    cell: ({ row }) => {
      return creationDateString(row.getValue("creationDate"));
    },
    sortingFn: "datetime",
    size: 150,
  },
  //   {
  //     id: "actions",
  //     cell: ({ row }) => <DataTableOptions row={row.original} />,
  //     size: 50,
  //   },
];
