'use client';

import { motion } from 'framer-motion';

export function IngredientsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Ingredients in Supplement
          </h2>
          <p className="text-lg text-gray-600">
            Key ingredients included in the supplement.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Ingredients */}
          <div className="space-y-12">
            <div className="text-right pr-8">
              <p className="text-gray-600 text-base leading-relaxed mb-2">
                Made with high-quality, all-natural, wholesome ingredients.
              </p>
              <div className="flex items-center justify-end space-x-2">
                <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1">
                  Natural Ingredients
                </h3>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>

            <div className="text-right pr-8">
              <p className="text-gray-600 text-base leading-relaxed mb-2">
                High-quality protein jar for your fitness goals.
              </p>
              <div className="flex items-center justify-end space-x-2">
                <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1">
                  Protein Jar
                </h3>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          </div>

          {/* Center Bowl Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.05,
              rotate: 3,
              transition: { duration: 0.4 }
            }}
            className="relative"
          >
            <img
              src="/bowl1.png"
              alt="Ingredients Bowl"
              className="w-full h-auto object-contain max-w-md"
            />
          </motion.div>

          {/* Right Ingredients */}
          <div className="space-y-12">
            <div className="text-left pl-8">
              <p className="text-gray-600 text-base leading-relaxed mb-2">
                A vibrant mix of colors brings life and energy to every design.
              </p>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1">
                  Multi Color
                </h3>
              </div>
            </div>

            <div className="text-left pl-8">
              <p className="text-gray-600 text-base leading-relaxed mb-2">
                Boost energy and strength with Power Pill.
              </p>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1">
                  Power Pill
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
