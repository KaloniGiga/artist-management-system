"use client";
import Link from "next/link";
import FormLayout from "./FormLayout";
import InputUI from "../core/input/InputUI";
import useLogin from "@web/hooks/useLogin";

export default function LoginForm() {
  const { formSchema, isLoading, onSubmit, form } = useLogin();

  return (
    <FormLayout<typeof formSchema>
      form={form}
      onSubmit={onSubmit}
      loading={isLoading}
      buttonLabel="Login"
    >
      <InputUI
        control={form.control}
        name="email"
        label={"Enter your email"}
        disabled={isLoading}
        placeholder="simon123@gmail.com"
      />

      <InputUI
        control={form.control}
        name="password"
        label={"Enter Password"}
        disabled={isLoading}
        placeholder="password"
        type={"password"}
      />

      <div className="mt-4 text-center text-sm">
        {"Don't have an account?"}{" "}
        <Link href="/register" className="underline text-ring">
          {"Sign up"}
        </Link>
      </div>
    </FormLayout>
  );
}
