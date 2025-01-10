// import { signInAction } from "@/app/actions";
import { signInAction } from "@/app/actions";
import AnimatedLogo from "@/components/AnimatedLogo";
// import { AnimatedLogo } from "@/components/AnimatedLogo";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInGuard } from "@/utils/auth-guard";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  await signInGuard();
  const searchParams = await props.searchParams;
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <AnimatedLogo />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              className="text-blue-600 font-medium hover:underline transition-colors duration-300"
              href="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </div>

        <form className="space-y-6" action={signInAction}>
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
            <div className="flex justify-between items-center">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              {/* <Link
                className="text-xs text-blue-600 hover:underline transition-colors duration-300"
                href="/forgot-password"
              >
                Forgot Password?
              </Link> */}
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            />
          </div>
          <SubmitButton
            pendingText="Signing In..."
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            formAction={signInAction}
          >
            Sign in
          </SubmitButton>
          <FormMessage message={searchParams} />
        </form>
      </div>
    </div>
  );
}
