// UserDetailPage.tsx
"use client";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserInfo } from "./user-info";
import { PaymentHistory } from "./payment-history";
import { useEffect, useState } from "react";

interface User {
  full_name: string;
  email: string;
  total_amount: number;
}

interface Payment {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  amount: number;
  status: "completed" | "pending";
  payment_date: string;
  stripe_session_id: string | null;
}

export default function UserDetailPage() {
  const [user, setUser] = useState<User | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const userId = params?.id;

  const fetchUserData = async () => {
    try {
      if (!userId) throw new Error("Invalid user ID");

      // Fetch user data
      const userResponse = await fetch(`/api/users/${userId}`);
      if (!userResponse.ok) throw new Error("Failed to fetch user data");
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch payments data for the user
      const paymentResponse = await fetch(
        `/api/payments/get-user-payment?user_id=${userId}`
      );
      if (!paymentResponse.ok) throw new Error("Failed to fetch payments data");
      const paymentData = await paymentResponse.json();
      setPayments(paymentData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const handlePaymentUpdate = (updatedPayment: Payment) => {
    setPayments((currentPayments) =>
      currentPayments.map((payment) =>
        payment.id === updatedPayment.id ? updatedPayment : payment
      )
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">{error}</div>
    );
  if (!user)
    return (
      <div className="flex items-center justify-center h-screen">
        No user found
      </div>
    );

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <UserInfo user={user} />
          <Separator className="my-6" />
          <PaymentHistory
            payments={payments}
            onPaymentUpdate={handlePaymentUpdate}
          />
        </CardContent>
      </Card>
    </div>
  );
}
