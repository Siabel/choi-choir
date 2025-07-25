import SignupForm from "@/components/Auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-bg p-6">
      <div className="bg-white shadow-lg rounded-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
          회원가입
        </h2>
        <SignupForm />
      </div>
    </div>
  );
}