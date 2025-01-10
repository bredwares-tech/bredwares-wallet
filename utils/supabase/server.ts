import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Create Supabase client
export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);                             
            });
          } catch (error) {
            console.error("Error setting cookies:", error);
          }
        },    
      },
    },
  );
};
                      
// Store user in the database
export const storeUser = async () => {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (user && !error) {
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!existingUser) {
      // Insert user if not found
      const { error: insertError } = await supabase.from("users").insert([ 
        {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata.full_name,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) {
        console.error("Error inserting user:", insertError);
      }
    }
  } else {
    console.error("User not authenticated:", error);
  }
};

