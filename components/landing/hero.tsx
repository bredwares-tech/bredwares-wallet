"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView, useAnimation } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 lg:py-20"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.h1 className="text-4xl mt-5 lg:mt-0 tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Your Trusted Partner for Seamless <span className="text-blue-600">eBay Fulfillment</span>
            </motion.h1>
            <motion.p className="mt-3 text-xl text-gray-500 max-w-2xl">
              Streamline your eBay business with fast, reliable, and hassle-free fulfillment. From inventory management
              to speedy shipping, EcomFill got you covered every step of the way.
            </motion.p>
            <motion.div>
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all duration-300"
                // whileHover={{ scale: 1.05 }}
                // whileTap={{ scale: 0.95 }}
              >
                Get started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
          <motion.div className="relative h-[200px] sm:h-[300px] lg:h-[300px]" variants={itemVariants}>
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Image
                src="/assests/Banner.webp"
                alt="eBay Fulfillment illustration"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

