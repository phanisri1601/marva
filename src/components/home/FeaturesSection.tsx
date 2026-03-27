'use client';

import { motion } from 'framer-motion';
import { Leaf, Heart, Award, Truck } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'All our products are made with pure, natural ingredients without any artificial additives or preservatives.',
    color: 'text-green-600'
  },
  {
    icon: Heart,
    title: 'Heart Healthy',
    description: 'Packed with proteins, fibers, and essential nutrients to support your active and healthy lifestyle.',
    color: 'text-red-500'
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Every product undergoes strict quality control to ensure you get the best nutrition and taste.',
    color: 'text-amber-500'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Fresh products delivered to your doorstep within 2-3 business days with secure packaging.',
    color: 'text-blue-600'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-green-600">Natural Foods</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to bringing you the highest quality natural foods that taste great and nourish your body.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 bg-opacity-10 group-hover:bg-opacity-20 transition-all`}
              >
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </motion.div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-green-600 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Healthy Journey?
          </h3>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of satisfied customers who've made the switch to natural, healthy eating.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
