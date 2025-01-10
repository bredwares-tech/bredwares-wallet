'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Wallet, CreditCard, PiggyBank } from 'lucide-react'

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('cta-section')
      if (element) {
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0
        setIsVisible(isVisible)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check visibility on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isVisible) {
      controls.start('visible')
    }
  }, [isVisible, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10
      }
    }
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    }
  }

  return (
    <motion.section
      id="cta-section"
      className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 sm:py-20 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to take control of your finances?
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-100">
            Join thousands of satisfied users who have transformed their financial management with Bredwares Wallet .
          </p>
        </motion.div>

        <motion.div 
          variants={buttonVariants}
          whileHover="hover"
          className="inline-block"
        >
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-300"
          >
            <span className="flex items-center">
              Sign up for free
              <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          </Button>
        </motion.div>

        <motion.p variants={itemVariants} className="mt-4 text-sm text-blue-100">
          No credit card required. Start your 30-day free trial today.
        </motion.p>

        <div className="mt-12 flex justify-around">
          {[
            { icon: Wallet, label: 'Secure Wallet' },
            { icon: CreditCard, label: 'Easy Userss' },
            { icon: PiggyBank, label: 'Save Money' }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={iconVariants}
              className="text-center"
            >
              <motion.div
                whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                className="inline-block p-3 bg-white rounded-full text-blue-600 mb-2"
              >
                <item.icon size={24} />
              </motion.div>
              <p className="text-sm text-blue-100">{item.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="absolute -top-16 -left-16 w-32 h-32 bg-blue-500 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-400 rounded-full opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </motion.section>
  )
}

