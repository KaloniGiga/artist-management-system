"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRegisterUserFormContext } from "@web/context/register-form.context";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { GenderEnum, RoleEnum } from "@web/types/types";
import validator from "validator";
import { DatePicker } from "../core/DatePicker";

const formSchema = z.object({
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

export default function RegisterFormStep2() {
  const router = useRouter();
  const formContext = useRegisterUserFormContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      dob: undefined,
      gender: undefined,
      role_type: undefined,
      address: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    formContext.updateUser(values);
    // todo: logic to sent data to server
  };

  const prevStep = () => {
    router.back();
  };

  return (
    <Card className="w-[80%] lg:max-w-md py-4 border-none">
      <CardHeader>
        <CardTitle className="flex gap-x-4 text-3xl font-bold">
          <Button variant={"link"} onClick={prevStep}>
            <ArrowLeft />
          </Button>
          <span>{"Tell us more about yourself?"}</span>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Phone</FormLabel>
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
                      className="h-10 text-md border-foreground focus-visible:border-none"
                      placeholder="Enter address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="w-full flex flex-col space-y-3">
            <Button size={"lg"} type="submit" className="w-full text-md">
              {"Sign up"}
            </Button>

            <div className="mt-4 text-center text-sm">
              {"Already have an account?"}
              <Link href={"/"} className="underline text-ring">
                {"Login"}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
