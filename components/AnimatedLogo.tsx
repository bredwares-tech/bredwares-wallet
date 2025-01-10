'use client'

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const AnimatedLogo = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("animate");
  }, [controls]);

  const circleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const lockBodyVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const lockShackleVariants = {
    initial: { y: -10, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 1,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const keyholePulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative w-28 h-28">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#blueGradient)"
          variants={circleVariants}
          initial="initial"
          animate={controls}
          filter="url(#glow)"
        />

        <motion.path
           d="M 35 45 L 35 30 Q 50 15 65 30 L 65 45" 
          stroke="white"
          strokeWidth="4"
          fill="none"
          variants={lockShackleVariants}
          initial="initial"
          animate={controls}
        />

        <motion.path
          d="M 30 50 L 30 70 Q 50 90 70 70 L 70 50 Q 50 30 30 50"
          stroke="white"
          strokeWidth="4"
          fill="none"
          variants={lockBodyVariants}
          initial="initial"
          animate={controls}
        />

        <motion.circle
          cx="50"
          cy="60"
          r="5"
          fill="white"
          variants={keyholePulseVariants}
          animate="animate"
        />
      </svg>
    </div>
  );
};

export default AnimatedLogo;

