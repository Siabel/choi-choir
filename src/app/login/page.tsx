import LoginForm from "@/components/Auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-bg p-6">
      <div className="bg-white shadow-lg rounded-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
          로그인
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}