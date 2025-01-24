'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ChevronDown, Search } from 'lucide-react'

const faqs = [
  {
    question: 'What is EcomFill?',
    answer: 'EcomFill is a powerful platform designed to help eBay store owners automate their operations. It integrates your eBay store, manages your orders, and ensures seamless fulfillment, so you can focus on growing your business.',
    icon: '🛒',
  },
  {
    question: 'How does EcomFill work?',
    answer: 'EcomFill connects with your eBay store to synchronize your listings and orders. It automates order fulfillment by processing and shipping customer orders through your suppliers, keeping your inventory and listings updated in real-time.',
    icon: '⚙️',
  },
  {
    question: 'Is EcomFill easy to set up?',
    answer: 'Yes! EcomFill offers a user-friendly setup process. Simply connect your eBay store, customize your preferences, and let EcomFill handle the rest. Our support team is available to guide you if needed.',
    icon: '✅',
  },
  {
    question: 'Does EcomFill handle inventory management?',
    answer: 'Yes, EcomFill continuously monitors your supplier’s inventory and updates your eBay listings accordingly. This ensures you never oversell or list out-of-stock products.',
    icon: '📦',
  },
  {
    question: 'How does EcomFill handle order fulfillment?',
    answer: 'When a customer places an order, EcomFill processes it automatically by coordinating with your supplier to ship the product directly to the customer. You won’t have to lift a finger.',
    icon: '🚚',
  },
  {
    question: 'Is my data secure on EcomFill?',
    answer: 'EcomFill prioritizes data security with advanced encryption and secure protocols. Your store data, customer information, and transactions are safe with us.',
    icon: '🔒',
  },
  {
    question: 'What kind of support does EcomFill offer?',
    answer: 'We provide 24/7 support to assist you with any questions or issues. Whether you need help setting up your store or troubleshooting, our team is always ready to assist.',
    icon: '💬',
  },
  {
    question: 'Can I track my order statuses on EcomFill?',
    answer: 'Yes, EcomFill provides real-time updates on all orders, including shipment statuses, so you’re always informed about your store\'s operations.',
    icon: '📊',
  },
  {
    question: 'How do I get started with EcomFill?',
    answer: 'Getting started is easy! Sign up on our website, connect your eBay store, and follow the setup guide. If you need help, our support team is just a click away.',
    icon: '🚀',
  },
];


export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div id="faq" className="py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base text-blue-600 font-semibold tracking-wide uppercase"
          >
            FAQ
          </motion.h2> */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl"
          >
            Frequently Asked Questions
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto"
          >
            Can't find the answer you're looking for? Feel free to contact our support team.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 max-w-lg mx-auto"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AnimatePresence>
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-blue-200 rounded-lg overflow-hidden"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <AccordionTrigger className="px-4 py-4 hover:bg-blue-50 transition-colors duration-200">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{faq.icon}</span>
                        <span>{faq.question}</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 shrink-0 text-blue-500 transition-transform duration-200 ${
                        hoveredIndex === index ? 'rotate-180' : ''
                      }`} />
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-4 bg-white">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {faq.answer}
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </Accordion>
        </motion.div>
      </div>
    </div>
  )
}

