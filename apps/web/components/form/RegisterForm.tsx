"use client";
import Link from "next/link";
import FormLayout from "./FormLayout";
import InputUI from "../core/input/InputUI";
import SelectUI from "../core/select/SelectUI";
import useRegister from "@web/hooks/useRegister";
import { DatePicker } from "../core/date-picker/DatePicker";
import { selectGenderList, selectUserRoleList } from "@web/lib/constant";

export default function RegisterForm() {
  const { formSchema, isLoading, onSubmit, form } = useRegister();

  return (
    <FormLayout<typeof formSchema>
      loading={isLoading}
      form={form}
      onSubmit={onSubmit}
      buttonLabel="Sign up"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <InputUI
            control={form.control}
            name="first_name"
            label="First name"
            disabled={isLoading}
            placeholder="simon"
          />
        </div>
        <div className="grid gap-2">
          <InputUI
            control={form.control}
            name="last_name"
            label="Last name"
            disabled={isLoading}
            placeholder="brown"
          />
        </div>
      </div>

      <InputUI
        control={form.control}
        name="email"
        label="Enter your email"
        disabled={isLoading}
        placeholder="simon123@gmail.com"
      />

      <InputUI
        control={form.control}
        name="password"
        label="Enter Password"
        disabled={isLoading}
        placeholder="password"
      />

      <InputUI
        control={form.control}
        name="phone"
        label="Phone"
        disabled={isLoading}
        placeholder="9848123456"
      />

      <DatePicker
        control={form.control}
        name="dob"
        label="Date of Birth"
        disabled={isLoading}
      />

      <SelectUI
        control={form.control}
        name="gender"
        label={"Enter Gender"}
        placeholder="Male"
        disabled={isLoading}
        selectItem={selectGenderList}
      />
      <SelectUI
        control={form.control}
        name="role_type"
        label={"Enter Role"}
        placeholder="Super admin"
        disabled={isLoading}
        selectItem={selectUserRoleList}
      />

      <InputUI
        control={form.control}
        name="address"
        label="Address"
        disabled={isLoading}
        placeholder="Enter address"
      />

      <div className="mt-4 text-center text-sm">
        {"Already have an account?"}
        <Link href={"/"} className="underline text-ring">
          {"Login"}
        </Link>
      </div>
    </FormLayout>
  );
}
