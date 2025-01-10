import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '100');
    const status = searchParams.get('status');
    const user_id = searchParams.get('user_id'); // Get user_id from query parameters

    let query = supabase
      .from('payments')
      .select('*, totalAmount:amount', { count: 'exact' });

    // Filter by status if provided
    if (status) {
      query = query.eq('status', status);
    }

    // Filter by user_id if provided
    if (user_id) {
      query = query.eq('user_id', user_id);
    }

    // Fetch data and sum the amounts for the same user_id
    const { data, error, count } = await query
      .range((page - 1) * limit, page * limit - 1);

    if (error) {
      throw error;
    }

    // Calculate the totalAmount for the user
    const totalAmount = data.reduce((acc, record) => acc + record.amount, 0);

    // Add the totalAmount to each record
    const dataWithTotal = data.map(record => ({
      ...record,
      totalAmount,
    }));

    const totalPages = Math.ceil((count || 0) / limit);

    const response = NextResponse.json({
      data: dataWithTotal,
      page,
      limit,
      totalPages,
      totalCount: count,
    });

    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  } catch (err: any) {
    console.error('Error fetching listing products:', err);
    return NextResponse.json({ statusCode: 500, message: err.message }, { status: 500 });
  }
}


export async function OPTIONS(request: NextRequest) {
  const response = NextResponse.json({});
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

