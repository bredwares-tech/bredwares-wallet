"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center md:items-start justify-between">
        {/* Left Side: Logo */}
        <div className="mb-6 md:mb-0">
          <Image
            src="/assests/logowhite.png" // Replace with your logo's path
            alt="Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>
        {/* Right Side: Description */}
        <div className="text-center md:text-left max-w-2xl">
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            At EcomFill, we’re committed to simplifying your eBay fulfillment process. Our mission is to make order management effortless, reliable, and efficient, so you can focus on growing your business. Whether you’re a new seller or a seasoned entrepreneur, EcomFill is the trusted partner that ensures every order is handled with precision and care.
          </p>
        </div>
      </div>

      {/* Bottom Links */}
      <div className=" p-4 md:p-6  text-center md:text-right text-gray-400 text-sm">
        <Link href="/privacy-policy" className="hover:text-white transition duration-300 mx-2">
          Privacy Policy
        </Link>
        |
        <Link href="/terms-and-conditions" className="hover:text-white transition duration-300 mx-2">
          Terms & Conditions
        </Link>
      </div>
    </footer>
  );
}
