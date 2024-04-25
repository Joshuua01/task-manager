import LoginForm from "~/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-semibold">Login to your account</h1>
        <h2 className="text-muted-foreground">
          Please enter login and password
        </h2>
      </div>
      <LoginForm />
    </div>
  );
}
