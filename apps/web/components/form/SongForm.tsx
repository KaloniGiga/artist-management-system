"use client";
import FormLayout from "./FormLayout";
import InputUI from "../core/input/InputUI";
import SelectUI from "../core/select/SelectUI";
import useAddEditSong from "@web/hooks/useAddEditSong";
import { selectGenreList } from "@web/lib/constant";

export default function SongForm() {
  const { formSchema, postLoading, putLoading, onSubmit, form } =
    useAddEditSong();

  return (
    <FormLayout<typeof formSchema>
      loading={postLoading || putLoading}
      form={form}
      onSubmit={onSubmit}
      buttonLabel="Submit"
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
        placeholder=""
        disabled={postLoading || putLoading}
        selectItem={selectGenreList}
      />
    </FormLayout>
  );
}
