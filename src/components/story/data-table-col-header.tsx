import { type Column } from "@tanstack/react-table";
import {
  CaretUpIcon,
  CaretDownIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";

interface DataTableColHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export default function DataTableColHeader<TData, TValue>({
  column,
  title,
}: DataTableColHeaderProps<TData, TValue>) {
  return (
    <div className="w-[50px]">
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 text-sm"
      >
        {title}
        {column.getIsSorted() === "desc" ? (
          <CaretUpIcon />
        ) : column.getIsSorted() === "asc" ? (
          <CaretDownIcon />
        ) : (
          <CaretSortIcon />
        )}
      </Button>
    </div>
  );
}
