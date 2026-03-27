'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export function ClientFeedbacks() {
  const feedbacks = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      content: 'MARVA products have completely transformed my fitness journey. The protein bars are delicious and keep me energized throughout my workouts.',
      rating: 5,
      avatar: '/avatar1.png'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Health Coach',
      content: 'I recommend MARVA to all my clients. The natural ingredients and great taste make it the perfect choice for anyone serious about their health.',
      rating: 5,
      avatar: '/avatar2.png'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Yoga Instructor',
      content: 'The peanut butter is absolutely amazing! It\'s become a staple in my morning routine. Clean, natural, and incredibly tasty.',
      rating: 5,
      avatar: '/avatar3.png'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 border-b-4 border-emerald-500 pb-2 inline-block">
            Client Feedbacks
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear what our customers have to say about their experience with MARVA products
          </p>
        </motion.div>

        {/* Feedback Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feedbacks.map((feedback, index) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 relative group hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-emerald-500 opacity-20">
                <Quote className="w-10 h-10" />
              </div>

              {/* Rating */}
              <div className="flex mb-6">
                {[...Array(feedback.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-emerald-500 fill-current mr-1"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                "{feedback.content}"
              </p>

              {/* Client Info */}
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
                  <span className="text-gray-600 font-semibold text-lg">
                    {feedback.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">{feedback.name}</h4>
                  <p className="text-sm text-gray-600">{feedback.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
