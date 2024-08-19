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

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Email is invalid."),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Card className="w-[80%] lg:max-w-md py-4 border-none">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          {"Welcome Back! Please Login"}
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Enter your email</FormLabel>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Enter Password</FormLabel>
                  <FormControl>
                    <Input
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
          </CardContent>

          <CardFooter className="w-full flex flex-col space-y-3">
            <Button size={"lg"} type="submit" className="w-full text-md">
              {"Login"}
            </Button>

            <div className="mt-4 text-center text-sm">
              {"Don't have an account?"}{" "}
              <Link href="/register/step-1" className="underline text-ring">
                {"Sign up"}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
