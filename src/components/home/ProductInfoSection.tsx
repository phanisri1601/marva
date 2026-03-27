'use client';

import { motion } from 'framer-motion';
import { BarChart3, ClipboardList, Clock, Coffee } from 'lucide-react';

const details = [
  { icon: Coffee, label: 'Flavor', value: 'Orange, Mango, Banana, Apple.' },
  { icon: BarChart3, label: 'Stock', value: '5000' },
  { icon: Clock, label: 'Expire', value: '04/01/2028' },
  { icon: ClipboardList, label: 'Review', value: '100+' },
];

export function ProductInfoSection() {
  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <img
              src="/peanut_bowl.png"
              alt="Product"
              className="w-full h-auto object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="w-full"
          >
            <p className="text-sm font-semibold tracking-wide text-amber-500">
              Product Info
            </p>

            <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Mixlix Per Capsule
            </h2>

            <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-prose">
              Each Mixlix capsule delivers optimal nutrients for daily wellness.
            </p>

            <div className="mt-8 border-t border-gray-200">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[28px_92px_1fr] sm:grid-cols-[32px_110px_1fr] items-center gap-4 py-4 border-b border-gray-200"
                >
                  <item.icon className="w-6 h-6 text-gray-800" />

                  <span className="text-lg font-semibold text-gray-900">
                    {item.label}
                  </span>

                  <span className="text-gray-400 text-sm sm:text-base truncate">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

