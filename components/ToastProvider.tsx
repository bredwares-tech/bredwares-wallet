'use client'
import { useToast } from '@/hooks/use-toast'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const ToastProvider = () => {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const status = searchParams.get('status')
    const message = searchParams.get('message')
    
    if (status && message) {
      toast({
        title: status === 'success' ? 'Success' : 'Error',
        description: message,
        variant: status === 'success' ? 'success' : 'destructive',
      })
    }
  }, [searchParams, toast])
  
  return null
}

export default ToastProvider