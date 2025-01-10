"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wallet, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { scroller } from "react-scroll";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    scroller.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: true,
      offset: -100, // Adjusts for navbar height
    });
  };

  const navItems = [
    { name: "Features", sectionId: "features", submenu: [] },
    { name: "Products", sectionId: "products", submenu: [] },
    { name: "Testimonials", sectionId: "testimonials", submenu: [] },
    { name: "FAQ", sectionId: "faq", submenu: [] }, // Assuming FAQ contains pricing
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed   w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div
            className="flex-shrink-0 flex items-center relative w-40 h-16"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center w-full h-full relative">
              <div
                className="w-full h-full relative"
             
              >
                <Image
                  src="/blue-logo.png"
                  alt="Admin Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </motion.div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {navItems.map((item: any) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
                  onClick={() => scrollToSection(item.sectionId)}
                >
                  <span>{item.name}</span>
                  {item.submenu.length > 0 && (
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                        hoveredItem === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Button>

                {item.submenu.length > 0 && hoveredItem === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    {item.submenu.map((subItem: any) => (
                      <motion.button
                        key={subItem}
                        whileHover={{ x: 10 }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      >
                        {subItem}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="border-blue-200 hover:border-blue-400 transition-colors duration-300"
                >
                  Log in
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/sign-up">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all duration-300">
                  Sign up
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="flex items-center sm:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Toggle menu</span>
              <motion.div
                animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 10 }}
                  className="w-full"
                >
                  <Button
                    variant="ghost"
                    className="w-full text-left justify-between"
                  >
                    {item.name}
                    {item.submenu.length > 0 && (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="pt-4 pb-3 border-t border-gray-200 px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Button variant="outline" className="w-full mb-2">
                Log in
              </Button>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-400">
                Sign up
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
