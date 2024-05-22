import { Column } from "@tanstack/react-table";
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
  const selectedValue = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"}> {title} </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results</CommandEmpty>
            <CommandGroup>
              {labels?.map((label) => {
                const isSelected = selectedValue.has(label.value);
                return (
                  <CommandItem
                    key={label.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValue.delete(label.value);
                      } else {
                        selectedValue.add(label.value);
                      }
                      column?.setFilterValue(Array.from(selectedValue));
                    }}
                  >
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
