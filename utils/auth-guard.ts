// utils/auth-guards.ts
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function signInGuard() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    // If already logged in, redirect based on admin status
    const { data: userData } = await supabase
      .from('users')
      .select('is_Admin')
      .eq('id', session.user.id)
      .single();
      
    if (userData?.is_Admin) {
      redirect('/admin');
    } else {
      redirect('/user');
    }
  }
  // If not logged in, allow access to signin page
  return null;
}

export async function signUpGuard() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    // If already logged in, redirect based on admin status
    const { data: userData } = await supabase
      .from('users')
      .select('is_Admin')
      .eq('id', session.user.id)
      .single();
      
    if (userData?.is_Admin) {
      redirect('/admin');
    } else {
      redirect('/user');
    }
  }
  // If not logged in, allow access to signup page
  return null;
}

export async function userPageGuard() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/sign-in');
  }
  
  // Check if user is admin (admins shouldn't access user page)
  const { data: userData } = await supabase
    .from('users')
    .select('is_Admin')
    .eq('id', session.user.id)
    .single();
    
  if (userData?.is_Admin) {
    redirect('/admin');
  }
  
  return session;
}

export async function adminPageGuard() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/sign-in');
  }
  
  // Check if user is admin
  const { data: userData } = await supabase
    .from('users')
    .select('is_Admin')
    .eq('id', session.user.id)
    .single();
    
  if (!userData?.is_Admin) {
    redirect('/user');
  }
  
  return session;
}