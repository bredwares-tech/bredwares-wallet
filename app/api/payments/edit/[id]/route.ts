import { createClient as createClientUser } from "@/utils/supabase/server";
import { createClient as createClientAdmin } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(req: NextRequest, context: RouteContext) {
  // Await the `params` promise
  const params = await context.params;
  const paymentId = params.id;

  const supabase = await createClientUser();

  // Check for user session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

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
    const body = await req.json();
    const { status } = body;

    // Validate status
    if (status !== "completed" && status !== "pending") {
      return NextResponse.json(
        { error: "Invalid status. Must be 'completed' or 'pending'" },
        { status: 400 }
      );
    }

    // Update the payment
    const { data, error: updateError } = await supabaseAdmin
      .from("payments")
      .update({ status })
      .eq("id", paymentId)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update payment status" },
      { status: 500 }
    );
  }
}
