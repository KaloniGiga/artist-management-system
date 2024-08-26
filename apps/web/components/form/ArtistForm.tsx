"use client";
import FormLayout from "./FormLayout";
import InputUI from "../core/input/InputUI";
import SelectUI from "../core/select/SelectUI";
import { DatePicker } from "../core/date-picker/DatePicker";
import useAddEditArtist from "@web/hooks/useAddEditArtist";
import { selectGenderList } from "@web/lib/constant";

export default function ArtistForm() {
  const { formSchema, postLoading, putLoading, onSubmit, form } =
    useAddEditArtist();

  return (
    <FormLayout<typeof formSchema>
      loading={postLoading || putLoading}
      form={form}
      onSubmit={onSubmit}
      buttonLabel="Submit"
    >
      <InputUI
        control={form.control}
        name="name"
        label="Name"
        disabled={postLoading || putLoading}
        placeholder="simon brown"
      />

      <DatePicker
        control={form.control}
        name="dob"
        label="Date of Birth"
        disabled={postLoading || putLoading}
      />

      <SelectUI
        control={form.control}
        name="gender"
        label={"Enter Gender"}
        placeholder=""
        disabled={postLoading || putLoading}
        selectItem={selectGenderList}
      />

      <InputUI
        control={form.control}
        name="address"
        label="Address"
        disabled={putLoading || postLoading}
        placeholder="Enter address"
      />

      <InputUI
        control={form.control}
        name="first_release_year"
        label="Enter First Release year"
        disabled={putLoading || postLoading}
        placeholder="Enter First Release Year"
      />

      <InputUI
        control={form.control}
        name="no_of_albums_released"
        label="Enter no of albums released"
        disabled={putLoading || postLoading}
        placeholder="Enter no of albums released"
      />
    </FormLayout>
  );
}
