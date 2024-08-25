/* eslint-disabled @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { z, ZodType } from "zod";
import { UseFormReturn } from "react-hook-form";

export interface IFormLayout<T extends ZodType<any, any, any>> {
  form: UseFormReturn<z.infer<T>>;
  onSubmit: (values: z.infer<T>) => Promise<void>;
  loading: boolean;
  children: ReactNode;
  buttonLabel: string;
}
export default function FormLayout<T extends ZodType<any, any, any>>({
  form,
  onSubmit,
  loading,
  children,
  buttonLabel,
}: IFormLayout<T>) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
        {children}
        <Button
          disabled={loading}
          size={"lg"}
          type="submit"
          className="w-full text-md"
        >
          {buttonLabel}
        </Button>
      </form>
    </Form>
  );
}
