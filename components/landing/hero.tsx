'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Zap, RefreshCw } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 lg:w-full">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mt-20 md:mt-0">
                <span className={`block xl:inline ${isVisible ? 'animate-fade-in-down' : 'opacity-0'}`}>
                Your Trusted Partner for Seamless  <span className={`block text-blue-600 xl:inline ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>eBay</span>  Fulfillment
                </span>{' '}
                {/* <span className={`block text-blue-600 xl:inline ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                  with Our Wallet 
                </span> */}
              </h1>
              <p className={`mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              Streamline your eBay business with fast, reliable, and hassle-free fulfillment. From inventory management to speedy shipping, EcomFill got you covered every step of the way. </p>
              <div className={`mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <div className="rounded-md shadow">
                  <Button size="lg" className="w-full flex items-center justify-center group">
                    Get started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                {/* <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button variant="outline" size="lg" className="w-full">Learn more</Button>
                </div> */}
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full">
          <Image
            className="absolute inset-0 w-full h-full object-cover"
            src="/assests/Banner.webp"
            alt="Wallet illustration"
            layout="fill"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent"></div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 ${isVisible ? 'animate-bounce' : 'opacity-0'}`}>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
          <Shield className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
          <Zap className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
          <RefreshCw className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
  )
}

