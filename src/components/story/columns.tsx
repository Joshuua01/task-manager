"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type Story } from "~/app/models";
import { creationDateString, prioritySort, statusSort } from "~/lib/utils";
import { DataTableOptions } from "./data-table-options";
import DataTableColHeader from "./data-table-col-header";

export const columns: ColumnDef<Story>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <DataTableColHeader title="Id" column={column} />;
    },
    size: 50,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColHeader title="Name" column={column} />;
    },
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
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableOptions row={row.original} />,
    size: 50,
  },
];
