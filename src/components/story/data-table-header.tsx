import { type Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import DataTableFilter from "./data-table-filter";
import AddStoryButton from "./add-story-button";
import { priorities, statuses } from "~/models";

interface DataTableHeaderProps<TData> {
  table: Table<TData>;
}

export default function DataTableHeader<TData>({
  table,
}: DataTableHeaderProps<TData>) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-5">
        <Input
          placeholder="Fliter stories..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
        />
        <DataTableFilter
          column={table.getColumn("status")}
          title="Status"
          labels={statuses}
        />
        <DataTableFilter
          column={table.getColumn("priority")}
          title="Priority"
          labels={priorities}
        />
      </div>
      <AddStoryButton />
    </div>
  );
}
