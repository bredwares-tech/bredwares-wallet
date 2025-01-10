'use client'

import { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/utils/stripe';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ProductTable } from '@/components/ProductTable';
import { Plus } from 'lucide-react';
import { Product } from './../../components/types';

import { Forklift } from 'lucide-react';

//  import { createClient } from '@supabase/supabase-js'
import type { User } from '@supabase/supabase-js'



import AdminDashboard from "@/components/admin/dasboard";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ListingProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [getByIdData, setGetByIdData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [user, setUser] = useState<string | null>(null)


  // Combined auth check and listener setup
  useEffect(() => {
    const checkSession = async () => {
      setLoading(true); // Ensure loading is set to true initially
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
  
        if (session) {
          // Proceed only if session exists
          try {
            const response = await fetch(`http://localhost:3000/api/listing-products?user_id=${session.user.id}`);
            const data = await response.json();
            setProducts(data.data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
  
          const isAdmin = session.user.user_metadata?.is_admin; // Use optional chaining
          if (isAdmin) {
            setLoading(false); // Allow access to the admin dashboard
          } else {
            // router.replace("/sign-in"); // Redirect non-admin users
          }
        } else {
          console.error("No session found.");
          // router.replace("/sign-in"); // Redirect unauthenticated users
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        // router.replace("/sign-in"); // Redirect on error
      } finally {
        setLoading(false);
      }
    };
  
    checkSession();
  }, [router, supabase,refresh]);
  


  const handleSaveClickGetById = async (asin: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/get-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ asin }),
      });

      // if (!response.ok) {
      //   throw new Error('Failed to fetch product');
      // }
      setRefresh(!refresh)

      const data = await response.json();
      setGetByIdData(data.data);
      setIsOpen(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSaveClick = async (full_name: string, email: string, amount: string, user: string) => {
    try {
      setLoading(true); // Ensure loading is set to true initially

      const stripe = await stripePromise;
  
      if (!stripe) {
        throw new Error('Stripe.js failed to load');
      }
  
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ full_name, email, amount, user }),
      });
  
      const session = await response.json();
  
      if (session.error) {
        throw new Error(session.error);
      }
  
      // if (!session.id) {
      //   throw new Error('Failed to create checkout session. Please try again.');
      // }
      setIsOpen(false)
      setRefresh(!refresh)
      setLoading(false); // Allow access to the admin dashboard

      // const result = await stripe.redirectToCheckout({ sessionId: session.id });
  
      // if (result.error) {
      //   throw new Error(result.error.message);
      // }
    } catch (error) {
      console.error('Error:', error);
      setIsOpen(false)
      setRefresh(!refresh)
      setLoading(false); // Allow access to the admin dashboard

      console.log('An error occurred while processing your payment. Please try again.');
    }
  };
  

  const handleEbayLogin = () => {
    const clientId = "Shahmeer-Salefeak-SBX-a8e4387bb-31036abc";
    const redirectUri = encodeURIComponent("https://your-app.com/ebay-auth-callback"); // Replace with your actual redirect URI
    const scope = encodeURIComponent("https://api.ebay.com/oauth/api_scope");

    const authUrl = `https://auth.sandbox.ebay.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    window.location.href = authUrl; // Redirect the user to eBay authentication page
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            <Plus className="mr-2 h-[1rem]" />
            Add
          </button>
          <button
            onClick={handleEbayLogin}

            className="flex items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            <Forklift className="mr-2 fw-bold h-[1rem]" />
            Continue with Ebay
          </button>
        </div>


        <h1 className="text-3xl font-bold mb-6 text-center">Listing Stripe Payment</h1>

        {loading ? (
          <div role="status" className="flex items-center justify-center min-h-screen">
            <svg
              aria-hidden="true"
              className="w-40 h-40 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 max-w-lg text-3xl font-semibold"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="main1 flex flex-col justify-center">
            <ProductTable products={products as Product[]} onViewProduct={handleSaveClickGetById} />


          </div>
        )}

        <CheckoutModal loading={loading}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleSaveClick}
        />
      </div>
    </Elements>
  );
}

