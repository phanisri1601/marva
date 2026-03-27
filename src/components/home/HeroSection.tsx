'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white flex items-center min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4.5rem)] lg:min-h-[calc(100vh-5rem)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Increased Energy With MARVA
            </motion.h1>
            
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Power Your Day With Protein <span className="text-yellow-500">Snack Bars</span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Boost your energy with protein snack bars, made with wholesome ingredients to keep you fueled and satisfied all day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button 
                variant="primary" 
                size="md"
              >
                Shop Now
              </Button>
              <Button 
                variant="secondary" 
                size="md"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full"
          >
            {/* Protein Bars Image Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                transition: { duration: 0.3 }
              }}
              className="relative z-10"
            >
              <img 
                src="/bar fow website png.png" 
                alt="MARVA Protein Bars" 
                className="w-full max-w-md h-auto object-contain"
              />
            </motion.div>

            {/* Snack Text Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 0.3, y: 0 }}
              transition={{ duration: 2, delay: 1, ease: "easeOut" }}
              className="hidden md:block absolute top-1/4 right-0 text-gray-300 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black select-none"
              style={{ transform: 'rotate(-90deg)', writingMode: 'vertical-rl' }}
            >
              Snack
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
