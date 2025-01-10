import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const {
        full_name,
        email,
        amount,
        user,
        status = 'pending', // Default status
      } = await req.json();

      // Validate input
      if (!email || !amount || isNaN(amount)) {
        throw new Error('Invalid input: email and amount are required, and amount must be a number.');
      }

      // Validate status
      const validStatuses = ['pending', 'completed', 'failed'];
      if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status value: ${status}`);
      }

      // Check if user exists in the users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user)
        .single();

      if (userError || !userData) {
        throw new Error('User does not exist in the users table. Please register the user first.');
      }

      console.log('User found:', userData);

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Custom Amount',
              },
              unit_amount: Math.round(parseFloat(amount) * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('origin')}/cancel`,
      });
if(!session.id){
  return NextResponse.json({ savedData: 'Payment Failed' });

}
      // Insert the payment into the `payments` table
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .insert([
          {
            user_id: user, // Use the user's UUID
            email,
            full_name: full_name || null, // Default to null if not provided
            amount: parseFloat(amount),
            status, // Explicitly set status
            stripe_session_id: session.id,
          },
        ])
        .select(); // Ensure the inserted data is returned

      if (paymentError) {
        console.error('Error inserting payment:', paymentError);
        throw new Error('Failed to save payment to the database.');
      }

      console.log('Payment saved:', paymentData);

      // Update the total amount in the `users` table
      const { data: totalData, error: totalError } = await supabase
        .from('payments')
        .select('amount')
        .eq('user_id', user);

      if (totalError) {
        console.error('Error fetching total amount:', totalError);
        throw new Error('Failed to fetch total amount from payments table.');
      }

      const totalAmount = totalData.reduce((sum, payment) => sum + payment.amount, 0);

      const { error: updateError } = await supabase
        .from('users')
        .update({ total_amount: totalAmount })
        .eq('id', user);

      if (updateError) {
        console.error('Error updating total amount in users table:', updateError);
        throw new Error('Failed to update total amount in users table.');
      }

      console.log(`Total amount for user ${user} updated to ${totalAmount}`);

      return NextResponse.json({ savedData: paymentData });
    } catch (err: any) {
      console.error('Error in POST /api/endpoint:', err.message);
      return NextResponse.json({ statusCode: 500, message: err.message });
    }
  } else {
    return NextResponse.json({ statusCode: 405, message: 'Method Not Allowed' });
  }
}
