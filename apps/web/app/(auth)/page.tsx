"use client";
import LoginForm from "@web/components/form/LoginForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@web/components/ui/card";

export default function LoginHome() {
  return (
    <main className="w-full flex min-h-screen items-center justify-center">
      <Card className="w-[80%] lg:max-w-md py-4 border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {"Welcome Back! Please Login"}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
