// import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { signUpAction } from "@/app/actions";
import { signUpGuard } from "@/utils/auth-guard";
import AnimatedLogo from "@/components/AnimatedLogo";
import { SignupMessage } from "@/components/signup-message";
import { ToastProvider } from "@radix-ui/react-toast";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  await signUpGuard();
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full">
        <SignupMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
    <ToastProvider/>
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <AnimatedLogo />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create an Account
          </h1>
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              className="text-blue-600 font-medium hover:underline transition-colors duration-300"
              href="/sign-in"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form className="space-y-6" action={signUpAction}>
          <div className="space-y-2">
            <Label
              htmlFor="full_name"
              className="text-sm font-medium text-gray-700"
            >
              Full Name
            </Label>
            <Input
              name="full_name"
              placeholder="John Doe"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              name="email"
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              minLength={6}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            />
          </div>
          <SubmitButton
            formAction={signUpAction}
            pendingText="Signing up..."
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </form>
      </div>
      {/* <SmtpMessage /> */}
    </div>
    </>
  );
}
