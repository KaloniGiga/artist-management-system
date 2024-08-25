"use client";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { cn } from "@web/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@web/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

interface IDatePicker<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
}
export function DatePicker<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
}: IDatePicker<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-md">{label}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={disabled}
                  variant={"outline"}
                  className={cn(
                    "w-full h-10 justify-start text-left font-normal border-foreground border-opacity-0 focus-visible:border-none",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
