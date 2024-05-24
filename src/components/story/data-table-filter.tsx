import { type Column } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Square, SquareCheck } from "lucide-react";
import { Separator } from "../ui/separator";

interface DataTableFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  labels?: {
    label: string;
    value: string;
  }[];
}

export default function DataTableFilter<TData, TValue>({
  column,
  title,
  labels,
}: DataTableFilterProps<TData, TValue>) {
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="flex items-center gap-2">
          {title}
          <Separator orientation="vertical" />
          {selectedValues.size > 0 ? selectedValues.size : "0"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] border-border p-2">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results</CommandEmpty>
            <CommandGroup>
              {labels?.map((label) => {
                const isSelected = selectedValues.has(label.value);
                return (
                  <CommandItem
                    className="flex items-center gap-2"
                    key={label.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(label.value);
                      } else {
                        selectedValues.add(label.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      );
                    }}
                  >
                    {isSelected ? (
                      <SquareCheck className="h-5 w-5" />
                    ) : (
                      <Square className="h-5 w-5" />
                    )}
                    {label.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
