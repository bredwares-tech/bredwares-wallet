'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, ChevronRight } from 'lucide-react'

const products = [
  {
    name: 'Basic Wallet',
    description: 'Perfect for personal use',
    price: 'Free',
    features: ['Secure storage', 'Basic transactions', 'Mobile app access'],
    color: 'from-blue-400 to-blue-600',
  },
  {
    name: 'Pro Wallet',
    description: 'Ideal for frequent users',
    price: '$9.99/month',
    features: ['All Basic features', 'Instant transfers', 'Multi-currency support', '24/7 customer support'],
    color: 'from-purple-400 to-purple-600',
  },
  {
    name: 'Business Wallet',
    description: 'For companies and organizations',
    price: '$29.99/month',
    features: ['All Pro features', 'Multiple user accounts', 'Advanced analytics', 'API access'],
    color: 'from-green-400 to-green-600',
  },
]

export default function Products() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div id="products" className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Products</h2>
          <p className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Choose the perfect wallet for you
          </p>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            We offer a range of wallet options to suit your needs, whether you're an individual or a business.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
            {products.map((product, index) => (
              <div 
                key={product.name}
                className={`flex flex-col ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex-1 relative">
                  <Card className="h-full flex flex-col justify-between border-2 border-gray-200 p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className={`rounded-full bg-gradient-to-r ${product.color} text-white p-5 shadow-lg`}>
                        <span className="sr-only">{product.name}</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-gray-900">{product.name}</CardTitle>
                      <CardDescription className="mt-4 text-lg text-gray-500">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mt-8">
                        <span className="text-4xl font-extrabold text-gray-900">{product.price}</span>
                        {product.price !== 'Free' && <span className="text-base font-medium text-gray-500">/month</span>}
                      </p>
                      <ul className="mt-8 space-y-4">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <div className="flex-shrink-0">
                              <Check className="h-6 w-6 text-green-500" />
                            </div>
                            <p className="ml-3 text-base text-gray-700">{feature}</p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white group">
                        Get started
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

