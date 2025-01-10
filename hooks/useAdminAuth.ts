// hooks/useAdminAuth.ts
"use client";
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useAdminAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
 const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/sign-in');
          return;
        }

        // Check if user is admin
        const { data: userData } = await supabase
          .from('users')
          .select('is_Admin')
          .eq('id', session.user.id)
          .single();
          
        if (!userData?.is_Admin) {
          router.push('/user');
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Auth error:', error);
        router.push('/sign-in');
      }
    };

    checkAuth();
  }, [router, supabase]);

  return { isLoading };
}