'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Zap, RefreshCw, Globe } from 'lucide-react'

const features = [
  {
    name: 'Secure Transactions',
    description: 'Your transactions are protected with state-of-the-art encryption.',
    icon: Shield,
    color: 'bg-blue-500',
  },
  {
    name: 'Lightning Fast',
    description: 'Experience instant transfers and quick Users processing.',
    icon: Zap,
    color: 'bg-yellow-500',
  },
  {
    name: 'Real-time Updates',
    description: 'Get notified instantly about your account activity.',
    icon: RefreshCw,
    color: 'bg-green-500',
  },
  {
    name: 'Global Accessibility',
    description: 'Access your wallet from anywhere in the world, anytime.',
    icon: Globe,
    color: 'bg-purple-500',
  },
]

export default function Features() {
  const [isVisible, setIsVisible] = useState(false)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    )

    if (featuresRef.current) {
      observer.observe(featuresRef.current)
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current)
      }
    }
  }, [])

  return (
    <div id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to manage your money
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Bredwares Wallet  offers a range of features designed to make your financial life easier and more secure.
          </p>
        </div>

        <div className="mt-20" ref={featuresRef}>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card 
                key={feature.name} 
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`absolute inset-0 ${feature.color} opacity-50 transition-opacity group-hover:opacity-70`} />
                <CardHeader className="relative">
                  <div className={`p-3 rounded-full ${feature.color} text-white inline-block transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4 text-2xl font-bold transition-colors group-hover:text-blue-600">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-20 lg:mt-32 relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-white text-lg font-medium text-gray-900">
            Trusted by thousands of users worldwide
          </span>
        </div>
      </div>
    </div>
  )
}

