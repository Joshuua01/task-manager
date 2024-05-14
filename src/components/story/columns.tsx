"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type Story } from "~/app/models";
import { creationDateString } from "~/lib/utils";
import { Button } from "../ui/button";
import { DataTableActions } from "./data-table-action";

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
    header: "Priority",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "creationDate",
    header: "Created",
    cell: ({ row }) => {
      return creationDateString(row.getValue("creationDate"));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableActions row={row} />,
  },
];
