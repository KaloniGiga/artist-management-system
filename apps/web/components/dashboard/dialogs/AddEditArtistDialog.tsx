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
import { ArtistData, GenderEnum, RoleEnum } from "@web/types/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type IAddEditArtist = {
  isEdit: boolean;
  editData: ArtistData | null;
};

const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Title is required" }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  gender: z.enum([GenderEnum.FEMALE, GenderEnum.MALE, GenderEnum.OTHER]),
  address: z.string(),
  first_release_year: z.number(),
  no_of_albums_released: z.number(),
});

export function AddEditArtistDialog({ isEdit, editData }: IAddEditArtist) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dob: undefined,
      gender: undefined,
      address: "",
      first_release_year: undefined,
      no_of_albums_released: undefined,
    },
  });

  useEffect(() => {
    if (isEdit && editData) {
      form.setValue("id", editData.id);
      form.setValue("name", editData.name);
      form.setValue("dob", editData.dob);
      form.setValue("gender", editData.gender);
      form.setValue("first_release_year", editData.first_release_year);
      form.setValue("no_of_albums_released", editData.no_of_albums_released);
      form.setValue("address", editData.address);
    }
  }, [isEdit, editData, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {};

  return (
    <DialogContent className="overflow-y-scroll max-h-screen">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold tracking-tight">{`${isEdit ? "Modify Artist Information" : "New Artist Entry"}`}</DialogTitle>
        <DialogDescription></DialogDescription>
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
                    <FormLabel className="text-md">Title</FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 text-md border-foreground border-opacity-0 focus-visible:border-none"
                        placeholder="brown"
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
                    className="h-10 text-md border-foreground border-opacity-0 focus-visible:border-none"
                    placeholder="simon234@gmail.com"
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
                    className="h-10 text-md border-foreground focus-visible:border-none"
                    placeholder="Enter first release year"
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
                    className="h-10 text-md border-foreground focus-visible:border-none"
                    placeholder="Enter no of albums released"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button size={"lg"} type="submit" className="w-full text-md">
            {"Submit"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
