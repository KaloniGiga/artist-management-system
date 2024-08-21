/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
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
import { GenreEnum, SongData } from "@web/types/types";
import { useForm } from "react-hook-form";
import { z } from "zod";

type IAddEditSong = {
  isEdit: boolean;
  editData: SongData | null;
};

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  album_name: z.string().min(1, { message: "Album name is required" }),
  genre: z.enum([
    GenreEnum.CLASSIC,
    GenreEnum.COUNTRY,
    GenreEnum.JAZZ,
    GenreEnum.RNB,
    GenreEnum.ROCK,
  ]),
});

export function AddEditSongDialog({ isEdit, editData }: IAddEditSong) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      album_name: "",
      genre: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {};

  return (
    <DialogContent className="overflow-y-scroll max-h-screen">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold tracking-tight">{`${isEdit ? "Modify Song Information" : "New Song Entry"}`}</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="title"
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
                name="album_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Album name</FormLabel>
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
          </div>
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Genre</FormLabel>
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

          <Button size={"lg"} type="submit" className="w-full text-md">
            {"Submit"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
