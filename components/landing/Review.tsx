"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface StatProps {
  endValue: number
  label: string
  prefix?: string
  suffix?: string
}

const AnimatedStat: React.FC<StatProps> = ({ endValue, label, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.5 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
      const duration = 1500 // Animation duration in milliseconds
      const steps = 60 // Number of steps in the animation
      const increment = endValue / steps
      let currentCount = 0

      const timer = setInterval(() => {
        currentCount += increment
        if (currentCount >= endValue) {
          clearInterval(timer)
          setCount(endValue)
        } else {
          setCount(Math.floor(currentCount))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    } else {
      controls.start("hidden")
      setCount(0)
    }
  }, [controls, inView, endValue])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      className="flex flex-col items-center"
    >
      <motion.span className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-600">
        {prefix}
        {count}
        {suffix}
      </motion.span>
      <motion.span
        className="text-xl md:text-xl text-gray-600 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {label}
      </motion.span>
    </motion.div>
  )
}

export default function ImpactReview() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <section className=" flex items-center justify-center bg-gradient-to-b from-white to-indigo-50 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="text-center"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900  text-center lg:leading-[80px] leading-relaxed mt-10 mx-auto max-w-3xl"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Our Impact for Million of Dropshippers
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-5xl mx-auto pt-10  md:pt-24"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            <AnimatedStat endValue={1.8} label="Dropshippers use EcomFill" suffix="M+" />
            <AnimatedStat endValue={1} label="Earned by our Dropshippers" prefix="$" suffix="B+" />
            <AnimatedStat endValue={800} label="Orders Fulfilled" suffix="M+" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

