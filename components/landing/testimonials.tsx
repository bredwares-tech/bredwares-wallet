'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Small Business Owner',
    content: 'Bredwares Wallet  has revolutionized how I manage my business finances. It\'s intuitive, secure, and saves me so much time!',
    avatar: '/icons/woman (1).png',
  },
  {
    name: 'Michael Chen',
    role: 'Freelance Developer',
    content: 'As a freelancer, keeping track of Userss was always a hassle. Bredwares Wallet  made it simple and stress-free.',
    avatar: '/icons/man.png',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Student',
    content: 'Bredwares Wallet  helped me budget my expenses and save money. It\'s a must-have app for every student!',
    avatar: '/icons/woman (2).png',
  },
  {
    name: 'David Thompson',
    role: 'E-commerce Entrepreneur',
    content: 'The multi-currency support in Bredwares Wallet  has been a game-changer for my international business. Highly recommended!',
    avatar: '/icons/gamer.png',
  },
  {
    name: 'Sophia Lee',
    role: 'Financial Advisor',
    content: 'I recommend Bredwares Wallet  to all my clients. Its robust features and user-friendly interface make financial management a breeze.',
    avatar: '/icons/woman.png',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(timer)
  }, [currentIndex])

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  return (
    <div id="testimonials" className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            What our customers say
          </p>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Don't just take our word for it. Here's what some of our satisfied users have to say about Bredwares Wallet .
          </p>
        </div>

        <div className="mt-20 relative">
          <div className="flex justify-center items-center">
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 transition-all hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div className="w-full max-w-3xl overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Card className="mx-4 bg-white shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                      <CardHeader className="relative">
                        <div className="absolute top-4 left-4">
                          <Quote className="h-8 w-8 text-blue-500 opacity-50" />
                        </div>
                      </CardHeader>
                      <CardContent className="px-10 pb-10">
                        <p className="text-gray-700 text-lg italic mb-8">{testimonial.content}</p>
                        <div className="flex items-center">
                          <Avatar className="h-12 w-12 border-2 border-blue-500">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 transition-all hover:scale-110"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full mx-1 transition-all ${
                  index === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

