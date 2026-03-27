'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function GetEveryAnswer() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What makes MARVA products different?',
      answer: 'MARVA products are made with 100% natural ingredients, no added preservatives, and focus on providing clean nutrition for your active lifestyle.'
    },
    {
      question: 'Are your products suitable for vegetarians?',
      answer: 'Yes, most of our products including our protein bars and peanut butter are vegetarian-friendly. Check individual product labels for specific dietary information.'
    },
    {
      
      question: 'How long do your products stay fresh?',
      answer: 'Our products typically stay fresh for 6-12 months when stored in a cool, dry place. Always check the expiration date on the packaging.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently we ship within the domestic market, but we\'re working on expanding our international shipping options soon.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 border-b-4 border-emerald-500 pb-2 inline-block">
            Get Every Answer
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to commonly asked questions about MARVA products
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto mb-12">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-4"
            >
              <div
                className="bg-gray-50 rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => toggleFAQ(index)}
              >
                {/* Question */}
                <div className="p-6 flex items-center justify-between hover:bg-gray-100 transition-colors duration-200">
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:bg-emerald-600 transition-colors duration-200">
                    {activeIndex === index ? '-' : '+'}
                  </div>
                </div>

                {/* Answer */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeIndex === index ? 'auto' : 0,
                    opacity: activeIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center bg-gray-50 rounded-2xl p-12"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Still have questions?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our customer support team is here to help you with any questions about our products or services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
              Contact Support
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
