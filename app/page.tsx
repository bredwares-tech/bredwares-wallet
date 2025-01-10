import CTA from "@/components/landing/Cta";
import FAQ from "@/components/landing/faq";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/Navbar";
import Products from "@/components/landing/products";
import Testimonials from "@/components/landing/testimonials";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const supabase = await createClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    // Get user's admin status
    const { data: userData } = await supabase
      .from('users')
      .select('is_Admin')
      .eq('id', session.user.id)
      .single();
      
    // Redirect based on admin status
    if (userData?.is_Admin) {
      redirect('/admin');
    } else {
      redirect('/user');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Products />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

