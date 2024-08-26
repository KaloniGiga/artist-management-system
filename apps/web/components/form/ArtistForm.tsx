"use client";
import FormLayout from "./FormLayout";
import InputUI from "../core/input/InputUI";
import SelectUI from "../core/select/SelectUI";
import { DatePicker } from "../core/date-picker/DatePicker";
import useAddEditArtist from "@web/hooks/useAddEditArtist";
import { ArtistData } from "@web/types/types";
import { selectGenderList } from "@web/lib/constant";

interface IArtistForm {
  isEdit: boolean;
  editData: ArtistData | null;
  handleDialogClose: () => void;
}
export default function ArtistForm({
  isEdit,
  editData,
  handleDialogClose,
}: IArtistForm) {
  const { formSchema, postLoading, putLoading, onSubmit, form } =
    useAddEditArtist({ isEdit, editData, handleDialogClose });

  return (
    <FormLayout<typeof formSchema>
      loading={postLoading || putLoading}
      form={form}
      onSubmit={onSubmit}
      buttonLabel="Sign up"
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
        placeholder="Male"
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
