'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Star, ShoppingCart, Heart, Check } from 'lucide-react';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const proteinBars = [
  {
    id: 1,
    name: 'Chocolate Protein Power Bar',
    price: 3.99,
    rating: 4.8,
    reviews: 124,
    protein: '20g',
    calories: 200,
    description: 'Rich chocolate flavor with 20g of premium protein to fuel your workout and recovery.',
    ingredients: 'Whey Protein, Almonds, Dark Chocolate, Honey, Natural Flavors',
    features: ['High Protein', 'Gluten-Free', 'No Added Sugar', 'Keto-Friendly'],
    badge: 'Bestseller'
  },
  {
    id: 2,
    name: 'Berry Blast Protein Bar',
    price: 3.79,
    rating: 4.7,
    reviews: 89,
    protein: '18g',
    calories: 180,
    description: 'Antioxidant-rich mixed berries combined with smooth protein for a refreshing taste.',
    ingredients: 'Whey Protein, Mixed Berries, Oats, Honey, Vanilla Extract',
    features: ['Antioxidant', 'Vegan', 'Low Calorie', 'High Fiber'],
    badge: 'New'
  },
  {
    id: 3,
    name: 'Peanut Butter Crunch',
    price: 4.29,
    rating: 4.9,
    reviews: 203,
    protein: '22g',
    calories: 220,
    description: 'Creamy peanut butter with crunchy pieces for the perfect protein-rich snack.',
    ingredients: 'Whey Protein, Peanuts, Peanut Butter, Honey, Sea Salt',
    features: ['Extra Protein', 'Crunchy Texture', 'High Energy', 'No Preservatives'],
    badge: 'Premium'
  },
  {
    id: 4,
    name: 'Vanilla Almond Delight',
    price: 3.99,
    rating: 4.6,
    reviews: 156,
    protein: '19g',
    calories: 190,
    description: 'Smooth vanilla with roasted almonds for a sophisticated protein experience.',
    ingredients: 'Whey Protein, Almonds, Vanilla Extract, Honey, Coconut Oil',
    features: ['Premium Ingredients', 'Smooth Texture', 'Natural Vanilla', 'Healthy Fats'],
    badge: null
  }
];

export default function ProteinBarsPage() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProteinBarsPageContent />
      </CartProvider>
    </AuthProvider>
  );
}

function ProteinBarsPageContent() {
  const { addToCart } = useCart();

  const handleAddToCart = (productId: number, productName: string, productPrice: number) => {
    addToCart(productId, productName, `$${productPrice.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-50 to-amber-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Premium <span className="text-green-600">Protein Bars</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  High-quality protein bars crafted with premium ingredients to fuel your active lifestyle and support your fitness goals.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
              >
                {[
                  { number: '20g', label: 'Protein per bar' },
                  { number: '0', label: 'Artificial flavors' },
                  { number: '4.7★', label: 'Average rating' },
                  { number: '5', label: 'Delicious flavors' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-xl p-6 text-center shadow-lg"
                  >
                    <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {proteinBars.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden group"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <div className="h-64 bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center">
                          <div className="text-8xl text-green-600 opacity-50">🥗</div>
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
                          <span className="ml-2 text-sm text-gray-600">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>

                        <p className="text-gray-600 mb-4">{product.description}</p>
                        
                        <div className="flex gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{product.protein}</div>
                            <div className="text-xs text-gray-500">Protein</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-amber-600">{product.calories}</div>
                            <div className="text-xs text-gray-500">Calories</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {product.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full flex items-center"
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
                              className="p-2 bg-green-100 rounded-full"
                            >
                              <Heart className="w-5 h-5 text-green-600" />
                            </motion.button>
                            <Button variant="primary" size="sm" onClick={() => handleAddToCart(product.id, product.name, product.price)}>
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
  );
}
