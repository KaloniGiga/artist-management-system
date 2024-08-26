"use client";
import FormLayout from "./FormLayout";
import { useCSVImport } from "@web/hooks/useCSVImport";
import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export default function ImportCSVForm() {
  const { formSchema, onSubmit, form } = useCSVImport();

  return (
    <FormLayout<typeof formSchema>
      loading={false}
      form={form}
      onSubmit={onSubmit}
      buttonLabel="Submit"
    >
      <FormField
        control={form.control}
        name={"file"}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-md">{"choose File"}</FormLabel>
            <FormControl>
              <Input
                type={"file"}
                accept=".csv"
                className="h-10 text-md border-foreground border-opacity-0 focus-visible:border-none"
                onChange={(e) => {
                  if (e.target.files) {
                    field.onChange(e.target.files[0]);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormLayout>
  );
}
