// File: app/api/dashboard/recent-sales/route.js
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
    // Fetch the 5 most recent payments
    const { data: recentSales, error: recentSalesError } = await supabaseAdmin
      .from("payments")
      .select("id, user_id, email, full_name, amount, status, payment_date")
      .order("payment_date", { ascending: false })
      .limit(5);

    if (recentSalesError) {
      return NextResponse.json({ error: recentSalesError.message }, { status: 500 });
    }

    return NextResponse.json(recentSales);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch recent sales" },
      { status: 500 }
    );
  }
}