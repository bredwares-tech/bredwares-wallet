"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useAnimation,
  useScroll,
  useTransform,
} from "framer-motion";
import { Zap, Heart, Star, Smile, ArrowRight } from "lucide-react";

interface CreativeHeroProps {
  heading: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export default function CreativeHero({
  heading,
  description,
  imageSrc,
  imageAlt,
}: CreativeHeroProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <div
      className=" flex flex-col justify-center bg-gradient-to-br from-purple-50 to-indigo-100 overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div className="space-y-10" variants={itemVariants}>
              <motion.h1
                className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl"
                variants={itemVariants}
              >
                {heading}
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 max-w-2xl"
                variants={itemVariants}
              >
                {description}
              </motion.p>
              <motion.div variants={itemVariants}>
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white rounded-md text-lg font-semibold transition-all duration-300 ease-in-out flex items-center group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative h-[400px] sm:h-[500px] lg:h-[600px]"
              style={{ y: imageY }}
            >
              <motion.div
                className="absolute inset-0 overflow-hidden rounded-2xl"
                initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Image
                  src={imageSrc || "/placeholder.svg"}
                  alt={imageAlt}
                  width={500}
                  height={600}
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
