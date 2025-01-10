import { CheckCircle, AlertCircle, Info } from "lucide-react";

export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function SignupMessage({ message }: { message: Message }) {
  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md px-6 py-4 rounded-lg shadow-lg bg-white">
        {"success" in message && (
          <div className="flex items-center gap-3 text-green-600 bg-green-100 border border-green-300 px-4 py-3 rounded-md shadow-sm">
            <CheckCircle className="w-5 h-5" />
            <span>{message.success}</span>
          </div>
        )}
        {"error" in message && (
          <div className="flex items-center gap-3 text-red-600 bg-red-100 border border-red-300 px-4 py-3 rounded-md shadow-sm">
            <AlertCircle className="w-5 h-5" />
            <span>{message.error}</span>
          </div>
        )}
        {"message" in message && (
          <div className="flex items-center gap-3 text-blue-600 bg-blue-100 border border-blue-300 px-4 py-3 rounded-md shadow-sm">
            <Info className="w-5 h-5" />
            <span>{message.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
