"use client";
import FormLayout from "./FormLayout";
import InputUI from "../core/input/InputUI";
import { useCSVImport } from "@web/hooks/useCSVImport";

export default function ImportCSVForm() {
  const { formSchema, onSubmit, form } = useCSVImport();

  return (
    <FormLayout<typeof formSchema>
      loading={false}
      form={form}
      onSubmit={onSubmit}
      buttonLabel="Sign up"
    >
      <InputUI
        control={form.control}
        name="file"
        label="File"
        disabled={false}
        type="file"
        placeholder="Import CSV file"
      />
    </FormLayout>
  );
}
