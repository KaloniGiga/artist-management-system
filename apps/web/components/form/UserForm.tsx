"use client";
import FormLayout from "./FormLayout";
import InputUI from "../core/input/InputUI";
import SelectUI from "../core/select/SelectUI";
import { DatePicker } from "../core/date-picker/DatePicker";
import { RoleEnum } from "@web/types/types";
import useAddEditUser from "@web/hooks/useAddEditUser";
import { selectGenderList, selectUserRoleList } from "@web/lib/constant";

export default function UserForm() {
  const {
    artistsData,
    watchRole,
    formSchema,
    postLoading,
    putLoading,
    onSubmit,
    form,
  } = useAddEditUser();

  return (
    <FormLayout<typeof formSchema>
      loading={postLoading || putLoading}
      form={form}
      onSubmit={onSubmit}
      buttonLabel="Submit"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <InputUI
            control={form.control}
            name="first_name"
            label="First name"
            disabled={putLoading || postLoading}
            placeholder="simon"
          />
        </div>
        <div className="grid gap-2">
          <InputUI
            control={form.control}
            name="last_name"
            label="Last name"
            disabled={putLoading || postLoading}
            placeholder="brown"
          />
        </div>
      </div>

      <InputUI
        control={form.control}
        name="email"
        label="Enter your email"
        disabled={putLoading || postLoading}
        placeholder="simon123@gmail.com"
      />

      <InputUI
        control={form.control}
        name="password"
        label="Enter Password"
        disabled={putLoading || postLoading}
        placeholder="password"
        type="password"
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <InputUI
            control={form.control}
            name="phone"
            label="Phone"
            disabled={putLoading || postLoading}
            placeholder="Enter phone"
          />
        </div>
        <div className="grid gap-2">
          <DatePicker
            control={form.control}
            name="dob"
            label="Date of Birth"
            disabled={putLoading || postLoading}
          />
        </div>
      </div>

      <SelectUI
        control={form.control}
        name="gender"
        label={"Enter Gender"}
        placeholder=""
        disabled={putLoading || postLoading}
        selectItem={selectGenderList}
      />
      <SelectUI
        control={form.control}
        name="role_type"
        label={"Enter Role"}
        placeholder=""
        disabled={putLoading || postLoading}
        selectItem={selectUserRoleList}
      />

      {watchRole == RoleEnum.ARTIST && (
        <SelectUI
          control={form.control}
          name="artistId"
          label="Select Artist"
          placeholder=""
          disabled={putLoading || postLoading}
          selectItem={
            artistsData?.data
              ? artistsData.data.artists.map((item) => {
                  return { value: item.id.toString(), label: item.name };
                })
              : []
          }
        />
      )}

      <InputUI
        control={form.control}
        name="address"
        label="Address"
        disabled={putLoading || postLoading}
        placeholder="Enter address"
      />
    </FormLayout>
  );
}
