"use client";
import FormLayout from "./FormLayout";
import InputUI from "../core/input/InputUI";
import SelectUI from "../core/select/SelectUI";
import { SongData } from "@web/types/types";
import useAddEditSong from "@web/hooks/useAddEditSong";

interface ISongForm {
  isEdit: boolean;
  editData: SongData | null;
  handleDialogClose: () => void;
}

export default function SongForm({
  isEdit,
  editData,
  handleDialogClose,
}: ISongForm) {
  const { formSchema, postLoading, putLoading, onSubmit, form } =
    useAddEditSong({ isEdit, editData, handleDialogClose });

  return (
    <FormLayout<typeof formSchema>
      loading={postLoading || putLoading}
      form={form}
      onSubmit={onSubmit}
      buttonLabel="Sign up"
    >
      <InputUI
        control={form.control}
        name="title"
        label="Title"
        disabled={postLoading || putLoading}
        placeholder="Enter song name"
      />

      <InputUI
        control={form.control}
        name="album_name"
        label="Album name"
        disabled={postLoading || putLoading}
        placeholder="Enter album name"
      />

      <SelectUI
        control={form.control}
        name="genre"
        label={"Enter Genre"}
        placeholder="RNB"
        disabled={postLoading || putLoading}
        selectItem={[]}
      />
    </FormLayout>
  );
}
