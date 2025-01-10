"use client";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/utils/stripe";
import { CheckoutModal } from "@/components/CheckoutModal";
import { ProductTable } from "@/components/ProductTable";
import { DollarSign, Plus, Loader2 } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Product } from "@/components/types";
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50">
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <DollarSign className="h-8 w-8 text-blue-500" /> */}
        </div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-700">
        Loading payments...
      </p>
    </div>
  </div>
);
export default function ListingProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [getByIdData, setGetByIdData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();
  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          try {
            const response = await fetch(
              `/api/listing-products?user_id=${session.user.id}`
            );
            const data = await response.json();
            setProducts(data.data);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        } else {
          console.error("No session found.");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, [router, supabase, refresh]);
  const handleSaveClick = async (
    full_name: string,
    email: string,
    amount: string,
    user: string
  ) => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe.js failed to load");
      }
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ full_name, email, amount, user }),
      });
      const session = await response.json();
      if (session.error) {
        throw new Error(session.error);
      }
      setIsOpen(false);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error:", error);
      console.log(
        "An error occurred while processing your payment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gray-50">
        {loading && <LoadingSpinner />}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
              Payment Management
            </h1>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <DollarSign className="mr-2 h-4 w-4" />
                )}
                Add Payment
              </button>
              <button
                className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                disabled={loading}
              >
                <Plus className="mr-2 h-4 w-4" />
                Connect eBay
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <ProductTable products={products} onViewProduct={() => {}} />
            </div>
          </div>
        </div>
        <CheckoutModal
          loading={loading}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleSaveClick}
        />
      </div>
    </Elements>
  );
}