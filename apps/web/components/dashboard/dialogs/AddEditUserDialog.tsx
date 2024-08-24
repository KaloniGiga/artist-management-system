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
  usePostUserMutation,
  usePutUserMutation,
} from "@web/redux/user/user.api";
import { GenderEnum, RoleEnum, UserData } from "@web/types/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { z } from "zod";

type IAddEditUser = {
  isEdit: boolean;
  editData: UserData | null;
  handleDialogClose: () => void;
};

const formSchema = z.object({
  id: z.number().optional(),
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Email is invalid."),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  phone: z.string().refine(validator.isMobilePhone),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  gender: z.enum([GenderEnum.FEMALE, GenderEnum.MALE, GenderEnum.OTHER]),
  role_type: z.enum([
    RoleEnum.SUPERADMIN,
    RoleEnum.ARTISTMANAGER,
    RoleEnum.ARTIST,
  ]),
  address: z.string(),
});

export function AddEditUserDialog({
  isEdit,
  editData,
  handleDialogClose,
}: IAddEditUser) {
  const [
    postUser,
    { isLoading: postLoading, isSuccess: postSuccess, error: postError },
  ] = usePostUserMutation();
  const [
    putUser,
    { isLoading: putLoading, isSuccess: putSuccess, error: putError },
  ] = usePutUserMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.reset();
    if (isEdit && editData) {
      form.setValue("first_name", editData.first_name);
      form.setValue("last_name", editData.last_name);
      form.setValue("email", editData.email);
      form.setValue("phone", editData.phone);
      form.setValue("dob", new Date(editData.dob));
      form.setValue("gender", editData.gender);
      form.setValue("role_type", editData.role_type);
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
      putUser({ id: editData.id, userDetails: values });
    } else {
      postUser(values);
    }
  };

  return (
    <DialogContent className="overflow-y-scroll max-h-screen">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold tracking-tight">{`${isEdit ? "Modify User Information" : "New User Entry"}`}</DialogTitle>
        {putError && (
          <DialogDescription className="text-center text-md text-[red]">
            {extractMessageFromError(putError)}
          </DialogDescription>
        )}

        {postError && (
          <DialogDescription className="text-center text-md text-[red]">
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
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">First name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={putLoading || postLoading}
                        className="h-10 text-md border-foreground border-opacity-0 focus-visible:border-none"
                        placeholder="simon"
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
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Last name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={putLoading || postLoading}
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Enter your email</FormLabel>
                <FormControl>
                  <Input
                    disabled={putLoading || postLoading}
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Enter Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={putLoading || postLoading}
                    className="h-10 text-md border-foreground focus-visible:border-none"
                    type="password"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Phone</FormLabel>
                <FormControl>
                  <Input
                    disabled={putLoading || postLoading}
                    className="h-10 text-md border-foreground border-opacity-0 focus-visible:border-none"
                    placeholder="e.g. 9868810345"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
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
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Enter Gender</FormLabel>
                <FormControl>
                  <Input
                    disabled={putLoading || postLoading}
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
            name="role_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Enter Role</FormLabel>
                <FormControl>
                  <Input
                    disabled={putLoading || postLoading}
                    className="h-10 text-md border-foreground focus-visible:border-none"
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
                    disabled={putLoading || postLoading}
                    className="h-10 text-md border-foreground focus-visible:border-none"
                    placeholder="Enter address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={putLoading || postLoading}
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
