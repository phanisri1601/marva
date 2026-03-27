'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Star, ShoppingCart, Heart, Check } from 'lucide-react';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';

const biscuits = [
  {
    id: 1,
    name: 'Natural Oat & Honey Biscuits',
    price: 4.49,
    rating: 4.6,
    reviews: 89,
    calories: 120,
    description: 'Whole grain oats sweetened with pure honey, perfect for a wholesome breakfast or snack.',
    ingredients: 'Whole Grain Oats, Honey, Wheat Flour, Butter, Sea Salt, Natural Vanilla',
    features: ['Whole Grain', 'Honey Sweetened', 'Baked Fresh', 'No Preservatives'],
    badge: 'Bestseller'
  },
  {
    id: 2,
    name: 'Dark Chocolate Chip Cookies',
    price: 4.99,
    rating: 4.5,
    reviews: 78,
    calories: 150,
    description: 'Rich dark chocolate chips in a soft, chewy cookie made with oat flour and natural sweeteners.',
    ingredients: 'Oat Flour, Dark Chocolate Chips, Coconut Oil, Maple Syrup, Almonds',
    features: ['Dark Chocolate', 'Oat Flour', 'Natural Sweetener', 'Dairy-Free Option'],
    badge: 'New'
  },
  {
    id: 3,
    name: 'Almond & Cranberry Biscotti',
    price: 5.49,
    rating: 4.8,
    reviews: 145,
    calories: 110,
    description: 'Traditional Italian biscotti with roasted almonds and dried cranberries, perfect with coffee.',
    ingredients: 'Almonds, Cranberries, Whole Wheat Flour, Eggs, Olive Oil, Orange Zest',
    features: ['Premium Almonds', 'Dried Cranberries', 'Traditional Recipe', 'Low Sugar'],
    badge: 'Premium'
  },
  {
    id: 4,
    name: 'Coconut & Macadamia Bites',
    price: 4.79,
    rating: 4.4,
    reviews: 67,
    calories: 130,
    description: 'Tropical delight with coconut and macadamia nuts, naturally sweetened and gluten-free.',
    ingredients: 'Coconut, Macadamia Nuts, Almond Flour, Coconut Oil, Natural Stevia',
    features: ['Gluten-Free', 'Tropical Flavor', 'Healthy Fats', 'Low Carb'],
    badge: null
  }
];

export default function BiscuitsPage() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          
          <section className="pt-32 pb-20 bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                  >
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                      Artisan <span className="text-amber-600">Biscuits</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      Handcrafted biscuits made with love, using only the finest natural ingredients and traditional baking methods.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                  >
                    {[
                      { number: '100%', label: 'Natural ingredients' },
                      { number: '0', label: 'Artificial preservatives' },
                      { number: 'Daily', label: 'Fresh baked' },
                      { number: '4.6★', label: 'Customer rating' },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-xl p-6 text-center shadow-lg"
                      >
                        <div className="text-3xl font-bold text-amber-600 mb-2">{stat.number}</div>
                        <div className="text-gray-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {biscuits.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden group"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                          <div className="text-8xl text-amber-600 opacity-50">🍪</div>
                        </div>
                      </div>
                      
                      <div className="md:w-1/2 p-8">
                        {product.badge && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                              product.badge === 'Bestseller' ? 'bg-red-500 text-white' :
                              product.badge === 'New' ? 'bg-green-500 text-white' :
                              'bg-purple-500 text-white'
                            }`}
                          >
                            {product.badge}
                          </motion.div>
                        )}
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
                        
                        <div className="flex items-center mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{product.description}</p>
                        
                        <div className="flex gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-amber-600">{product.calories}</div>
                            <div className="text-xs text-gray-500">Calories</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">Fresh</div>
                            <div className="text-xs text-gray-500">Daily</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {product.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full flex items-center"
                            >
                              <Check className="w-3 h-3 mr-1" />
                              {feature}
                            </span>
                          ))}
                        </div>

                        <div className="text-sm text-gray-500 mb-6">
                          <strong>Ingredients:</strong> {product.ingredients}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                          
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 bg-amber-100 rounded-full"
                            >
                              <Heart className="w-5 h-5 text-amber-600" />
                            </motion.button>
                            <Button variant="primary" size="sm">
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
