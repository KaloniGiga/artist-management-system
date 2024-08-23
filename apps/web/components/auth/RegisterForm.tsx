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
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRegisterUserMutation } from "@web/redux/auth/auth.api";
import { GenderEnum, RoleEnum } from "@web/types/types";
import validator from "validator";
import { DatePicker } from "../core/DatePicker";
import { extractMessageFromError } from "@web/lib/utils";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
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

export default function RegisterForm() {
  const router = useRouter();
  const [registerUser, { isLoading, data, error }] = useRegisterUserMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [data, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    registerUser(values);
  };

  return (
    <Card className="w-[80%] lg:max-w-md py-4 border-none">
      <CardHeader>
        <CardTitle className="text-3xl text-center font-bold">
          {"Sign Up to Get Started"}
        </CardTitle>
        {error && (
          <CardDescription className="text-center text-md text-[red]">
            {extractMessageFromError(error)}
          </CardDescription>
        )}
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
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
                          disabled={isLoading}
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
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
                          placeholder="e.g. 9868810345"
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
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-md">Date of Birth</FormLabel>
                      <FormControl>
                        <DatePicker
                          disabled={isLoading}
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
              size={"lg"}
              disabled={isLoading}
              type="submit"
              className="w-full text-md"
            >
              {isLoading && <Loader2 className="h-4 w-5 animate-spin" />}
              {"Submit"}
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
