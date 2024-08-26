import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@web/components/ui/form";
import { Input } from "@web/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface ISelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder: string;
  disabled: boolean;
  type?: string;
}
export default function InputUI<T extends FieldValues>({
  placeholder,
  name,
  control,
  label,
  disabled,
  type,
}: ISelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md">{label}</FormLabel>
          <FormControl>
            <Input
              type={type ? type : "text"}
              disabled={disabled}
              className="h-10 text-md border-foreground border-opacity-0 focus-visible:border-none"
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
