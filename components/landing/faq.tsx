'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ChevronDown, Search } from 'lucide-react'

const faqs = [
  {
    question: 'How secure is Bredwares Wallet ?',
    answer: 'Bredwares Wallet  uses state-of-the-art encryption and security measures to protect your financial information. We employ multi-factor authentication, end-to-end encryption, and regular security audits to ensure your data remains safe.',
    icon: '🔒',
  },
  {
    question: 'Can I use Bredwares Wallet  internationally?',
    answer: 'Yes, Bredwares Wallet  is designed for global use. You can access your wallet from anywhere in the world and make transactions across different currencies.',
    icon: '🌍',
  },
  {
    question: 'What types of transactions can I make with Bredwares Wallet ?',
    answer: 'With Bredwares Wallet , you can make a wide range of transactions including peer-to-peer transfers, bill Userss, online purchases, and more. The specific types of transactions available may depend on your account type and location.',
    icon: '💸',
  },
  {
    question: 'Is there a limit to how much money I can store in my Bredwares Wallet  account?',
    answer: 'The storage limit depends on your account type. Basic accounts have a lower limit, while Pro and Business accounts have higher or no limits. Please check your account details or contact our support team for specific information.',
    icon: '💰',
  },
  {
    question: 'How quickly are transactions processed?',
    answer: 'Most transactions on Bredwares Wallet  are processed instantly. However, some transactions, especially those involving different currencies or external bank accounts, may take up to 1-3 business days to complete.',
    icon: '⚡',
  },
]

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
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base text-blue-600 font-semibold tracking-wide uppercase"
          >
            FAQ
          </motion.h2>
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

