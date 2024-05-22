"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type Story } from "~/app/models";
import { creationDateString, prioritySort, statusSort } from "~/lib/utils";
import { Button } from "../ui/button";
import { DataTableOptions } from "./data-table-options";

export const columns: ColumnDef<Story>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
        </Button>
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
        </Button>
      );
    },
    sortingFn: prioritySort,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
        </Button>
      );
    },
    sortingFn: statusSort,
  },
  {
    accessorKey: "creationDate",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
        </Button>
      );
    },
    cell: ({ row }) => {
      return creationDateString(row.getValue("creationDate"));
    },
    sortingFn: "datetime",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableOptions row={row.original} />,
  },
];
