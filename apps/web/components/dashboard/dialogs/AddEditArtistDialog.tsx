/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@web/components/core/DatePicker";
import { Button } from "@web/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@web/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@web/components/ui/form";
import { Input } from "@web/components/ui/input";
import { extractMessageFromError } from "@web/lib/utils";
import {
  usePostArtistMutation,
  usePutArtistMutation,
} from "@web/redux/artist/artist.api";
import { ArtistData, GenderEnum } from "@web/types/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type IAddEditArtist = {
  isEdit: boolean;
  editData: ArtistData | null;
  handleDialogClose: () => void;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  gender: z.enum([GenderEnum.FEMALE, GenderEnum.MALE, GenderEnum.OTHER]),
  address: z.string(),
  first_release_year: z.coerce.number(),
  no_of_albums_released: z.coerce.number(),
});

export function AddEditArtistDialog({
  isEdit,
  editData,
  handleDialogClose,
}: IAddEditArtist) {
  const [
    postArtist,
    { isLoading: postLoading, isSuccess: postSuccess, error: postError },
  ] = usePostArtistMutation();
  const [
    putArtist,
    { isLoading: putLoading, isSuccess: putSuccess, error: putError },
  ] = usePutArtistMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.reset();
    if (isEdit && editData) {
      form.setValue("name", editData.name);
      form.setValue("dob", new Date(editData.dob));
      form.setValue("gender", editData.gender);
      form.setValue("first_release_year", editData.first_release_year);
      form.setValue("no_of_albums_released", editData.no_of_albums_released);
      form.setValue("address", editData.address);
    }
  }, [isEdit, editData, form]);

  useEffect(() => {
    if (postSuccess || putSuccess) {
      handleDialogClose();
    }
  }, [postSuccess, putSuccess]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isEdit && editData) {
      putArtist({ id: editData.id, artistDetails: values });
    } else {
      postArtist(values);
    }
  };

  return (
    <DialogContent className="overflow-y-scroll max-h-screen">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold tracking-tight">{`${isEdit ? "Modify Artist Information" : "New Artist Entry"}`}</DialogTitle>
        {putError && (
          <DialogDescription className="text-center text-[red]">
            {extractMessageFromError(putError)}
          </DialogDescription>
        )}
        {postError && (
          <DialogDescription className="text-center text-[red]">
            {extractMessageFromError(postError)}
          </DialogDescription>
        )}
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={postLoading || putLoading}
                        className="h-10 text-md border-foreground border-opacity-0 focus-visible:border-none"
                        placeholder="simon brown"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Date of Birth</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onDateChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Gender</FormLabel>
                <FormControl>
                  <Input
                    disabled={postLoading || putLoading}
                    className="h-10 text-md border-foreground border-opacity-0 focus-visible:border-none"
                    placeholder="Male"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Address</FormLabel>
                <FormControl>
                  <Input
                    disabled={postLoading || putLoading}
                    className="h-10 text-md border-foreground focus-visible:border-none"
                    placeholder="Enter address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="first_release_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">First Release Year</FormLabel>
                <FormControl>
                  <Input
                    disabled={postLoading || putLoading}
                    className="h-10 text-md border-foreground focus-visible:border-none"
                    placeholder="Enter first release year"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="no_of_albums_released"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">No of albums released</FormLabel>
                <FormControl>
                  <Input
                    disabled={postLoading || putLoading}
                    className="h-10 text-md border-foreground focus-visible:border-none"
                    placeholder="Enter no of albums released"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={postLoading || putLoading}
            size={"lg"}
            type="submit"
            className="w-full text-md"
          >
            {"Submit"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
