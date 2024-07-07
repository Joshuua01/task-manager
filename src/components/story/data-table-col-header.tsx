import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from "@radix-ui/react-icons";
import { type Column } from "@tanstack/react-table";

interface DataTableColHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export default function DataTableColHeader<TData, TValue>({
  column,
  title,
}: DataTableColHeaderProps<TData, TValue>) {
  return (
    <div
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="flex items-center justify-start"
    >
      <div className="flex cursor-pointer items-center justify-start gap-1 transition-colors duration-150 hover:text-primary">
        {title}
        {column.getIsSorted() === "desc" ? (
          <CaretUpIcon />
        ) : column.getIsSorted() === "asc" ? (
          <CaretDownIcon />
        ) : (
          <CaretSortIcon />
        )}
      </div>
    </div>
  );
}
