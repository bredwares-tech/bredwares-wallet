import CTA from "@/components/landing/Cta";
import FAQ from "@/components/landing/faq";
import Features from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
// import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import { IconsStrip } from "@/components/landing/IconsStrip";
// import IconsStrip from "@/components/landing/IconsStrip";
import CreativeHero from "@/components/landing/ImageComponent";
import CreativeHero2 from "@/components/landing/ImageComponent2";
import Navbar from "@/components/landing/Navbar";
import Products from "@/components/landing/products";
import ImpactReview from "@/components/landing/Review";
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
        <CreativeHero
        heading="Automate, Simplify, Scale"
        description="EcomFill transforms the way you manage your eBay store by automating tedious processes and simplifying operations. With seamless store integration, automated order fulfillment, and real-time updates, you can stay focused on scaling your business. Our platform ensures your listings, inventory, and orders are always synchronized, giving you the tools to manage multiple stores effortlessly from one unified dashboard. Whether you're just starting or running a large-scale operation, EcomFill is built to adapt and grow with your business."
        imageSrc="/assests/money.webp"
        imageAlt="A futuristic cityscape representing innovation and creativity"
        />
        <IconsStrip/>
   
      <CreativeHero2
        heading="Hassle-Free Fulfillment for eBay Sellers"
        description="EcomFill simplifies every step of your fulfillment process, from inventory syncing to fast, reliable shipping. Our cutting-edge platform automates routine tasks, ensuring accuracy and efficiency with every order. Whether you're managing a handful of items or scaling to thousands of sales, EcomFill guarantees smooth operations that free you up to focus on growing your eBay business and delighting your customers."
        imageSrc="/assests/worker.jpg"
        imageAlt="A futuristic cityscape representing innovation and creativity"
      />
         <ImpactReview/>
        {/* image component */}
        {/* icons strip */}
        {/* review component */}
        {/* another image component */}
        {/* <Products />  this has been removed */}
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

