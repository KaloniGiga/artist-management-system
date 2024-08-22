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
import { ArrowLeft, Loader2 } from "lucide-react";
import { GenderEnum, RoleEnum } from "@web/types/types";
import validator from "validator";
import { DatePicker } from "../core/DatePicker";
import { useRegisterUserMutation } from "@web/redux/auth/auth.api";
import { useEffect } from "react";

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
  const [registerUser, { isLoading, data, error }] = useRegisterUserMutation();
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

  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [data, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    formContext.updateUser(values);
    if (formContext.user) {
      const { email, password } = formContext.user;
      console.log(formContext.user);
      if (email && password) {
        registerUser({ ...formContext.user, ...values });
      } else {
        router.push("/dashboard/step-1");
      }
    }
  };

  const prevStep = () => {
    router.back();
  };

  return (
    <Card className="w-[80%] lg:max-w-md py-4 border-none">
      <CardHeader>
        <CardTitle className="flex gap-x-2 text-3xl font-bold">
          <Button
            className="rounded-full"
            size={"icon"}
            variant={"ghost"}
            onClick={prevStep}
          >
            <ArrowLeft />
          </Button>
          <span>{"Tell us more about yourself?"}</span>
        </CardTitle>
        {error && (
          <CardDescription className="text-center text-[red]">
            Something went wrong.
          </CardDescription>
        )}
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
            <Button
              disabled={isLoading}
              size={"lg"}
              type="submit"
              className="w-full text-md"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
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
