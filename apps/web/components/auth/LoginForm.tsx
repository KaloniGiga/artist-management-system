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
import { useReadLoginMutation } from "@web/redux/auth/auth.api";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { extractMessageFromError } from "@web/lib/utils";

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
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading, data, error }] = useReadLoginMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    login(values);
  };

  useEffect(() => {
    if (data) {
      router.replace("/dashboard");
    }
  }, [data, router]);

  return (
    <Card className="w-[80%] lg:max-w-md py-4 border-none">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          {"Welcome Back! Please Login"}
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
          </CardContent>

          <CardFooter className="w-full flex flex-col space-y-3">
            <Button
              disabled={isLoading}
              size={"lg"}
              type="submit"
              className="w-full text-md"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {"Login"}
            </Button>

            <div className="mt-4 text-center text-sm">
              {"Don't have an account?"}{" "}
              <Link href="/register" className="underline text-ring">
                {"Sign up"}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
