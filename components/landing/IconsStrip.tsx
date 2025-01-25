"use client";

import { motion } from "framer-motion";
import { Zap, Heart, Star, Smile } from "lucide-react";

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

export function IconsStrip() {
  const icons = [
    {
      src: "../../assests/Automated Order Fulfillment.png",
      label: "Automated Order Fulfillment",
    },
    {
      src: "../../assests/Seamless eBay Integration (1).png",
      label: "Seamless eBay Integration",
    },
    { src: "../../assests/Real-Time Updates.png", label: "Real-Time Updates" },
    {
      src: "../../assests/Centralized Dashboard.png",
      label: "Centralized Dashboard",
    },
  ];
  return (
    <motion.div
      className="bg-blue-200 px-4 sm:px-6 lg:px-8 py-14"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
          },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex justify-center space-x-12 sm:space-x-16 md:space-x-24">
        {icons.map((icon, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            variants={iconVariants}
          >
            <div className="bg-white p-4 rounded-full shadow-lg">
              <img src={icon.src} alt={icon.label} className="w-16 h-16" />
            </div>
            <span className="mt-2 text-sm font-extrabold text-gray-600">
              {icon.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
