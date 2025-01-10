import { useEffect, useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    full_name: string,
    email: string,
    amount: string,
    user: string
  ) => void;
  loading: boolean;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onSave,
  loading,
}) => {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [cardError, setCardError] = useState("");
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          const userId = session.user.id || "";
          const userEmail = session.user.email || "";
          const userName = session.user.user_metadata.full_name || "";

          setUser(userId);
          setEmail(userEmail);
          setFullName(userName);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, [router, supabase]);

  // Reset amount when modal closes
  useEffect(() => {
    if (!isOpen) {
      setAmount("");
      setErrorMsg("");
      setCardError("");
    }
  }, [isOpen]);

  const handleCardChange = (event: any) => {
    setCardError(event.error ? event.error.message : "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "amount") setAmount(value);
  };

  const handleSaveClick = () => {
    if (!amount) {
      setErrorMsg("Please enter payment amount");
      return;
    }
    if (cardError) {
      setErrorMsg("Please check your card details");
      return;
    }
    onSave(full_name, email, amount, user || "");
    // Clear amount after successful submission
    setAmount("");
  };

  const handleClose = () => {
    setAmount("");
    setErrorMsg("");
    setCardError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-hidden="true">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm"></div>

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Make Payment
            </h3>
            <button
              onClick={handleClose}
              className="rounded-lg p-1 hover:bg-gray-100"
              disabled={loading}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={full_name}
                  disabled
                  className="w-full rounded-lg border bg-gray-50 p-3 text-gray-900"
                  placeholder="Name from session"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full rounded-lg border bg-gray-50 p-3 text-gray-900"
                  placeholder="Email from session"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount ($)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border p-3 text-gray-900"
                  placeholder="Enter payment amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Details
                </label>
                <div className="w-full rounded-lg border p-3">
                  <CardElement
                    onChange={handleCardChange}
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {(errorMsg || cardError) && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500">
                {errorMsg || cardError}
              </div>
            )}

            <button
              onClick={handleSaveClick}
              disabled={loading}
              className="relative w-full rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? <span>Processing...</span> : "Complete Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
