import RegisterForm from "@web/components/form/RegisterForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@web/components/ui/card";

export default function Home() {
  return (
    <main className="w-full flex min-h-screen py-16 items-center justify-center">
      <Card className="w-[80%] lg:max-w-md border-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {"Sign up to get started!"}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <RegisterForm />
        </CardContent>
      </Card>
    </main>
  );
}
