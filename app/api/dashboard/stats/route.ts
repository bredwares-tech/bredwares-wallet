// File: app/api/dashboard/stats/route.js
import { createClient as createClientUser } from "@/utils/supabase/server";
import { createClient as createClientAdmin } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClientUser();

  // Check for user session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  // Create admin client for privileged operations
  const supabaseAdmin = createClientAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // If session not found or there's an error, return 401 Unauthorized
  if (sessionError || !session) {
    return NextResponse.json(
      { error: "No session found. Unauthorized." },
      { status: 401 }
    );
  }

  try {
    // Fetch users count
    const { count: userCount, error: userCountError } = await supabaseAdmin
      .from("users")
      .select("id", { count: "exact", head: true });

    if (userCountError) {
      return NextResponse.json({ error: userCountError.message }, { status: 500 });
    }

    // Fetch payment statistics
    const { data: paymentStats, error: paymentStatsError } = await supabaseAdmin
      .from("payments")
      .select("id, amount, status");

    if (paymentStatsError) {
      return NextResponse.json({ error: paymentStatsError.message }, { status: 500 });
    }

    // Calculate total payments and payment count for completed payments
    const completedPayments = paymentStats.filter(
      (payment) => payment.status === "completed"
    );
    const completedTotalAmount = completedPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    const completedCount = completedPayments.length;

    // Calculate total payments and payment count for pending payments
    const pendingPayments = paymentStats.filter(
      (payment) => payment.status === "pending"
    );
    const pendingTotalAmount = pendingPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    const pendingCount = pendingPayments.length;

    // Calculate overall totals
    const totalAmount = completedTotalAmount + pendingTotalAmount;
    const totalCount = completedCount + pendingCount;

    // Combine all statistics
    const dashboardStats = {
      userCount: userCount || 0,
      totalAmount,
      totalCount,
      completedTotalAmount,
      completedCount,
      pendingTotalAmount,
      pendingCount,
    };

    return NextResponse.json(dashboardStats);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}