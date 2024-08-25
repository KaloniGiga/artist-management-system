import { FormField, FormItem, FormLabel } from "@web/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@web/components/ui/select";
import { Control, FieldValues, Path } from "react-hook-form";

interface ISelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  selectItem: { value: string; label: string }[];
  placeholder: string;
  disabled: boolean;
}
export default function SelectUI<T extends FieldValues>({
  placeholder,
  name,
  control,
  label,
  selectItem,
  disabled,
}: ISelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger className="h-10 text-md border-foreground border-opacity-0 focus-visible:border-none">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {selectItem.map((item) => {
                return (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
