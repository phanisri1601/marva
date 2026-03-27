'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Star, Heart, Check, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IngredientsSection } from '@/components/home/IngredientsSection';
import { ProductShowcase } from '@/components/home/ProductShowcase';
import { ProductInfoSection } from '@/components/home/ProductInfoSection';
import { ClientFeedbacks } from '@/components/home/ClientFeedbacks';
import { GetEveryAnswer } from '@/components/home/GetEveryAnswer';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { CartModal } from '@/components/ui/CartModal';

interface Product {
  id: string;
  name: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  hoverImage: string;
  category: string;
  ingredients: string;
  features: string[];
  badge: string | null;
  description: string;
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
}

interface ProductDetailContentProps {
  product: Product;
}

export default function ProductDetailContent({ product }: ProductDetailContentProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(false);
  const { addToCart, updateQuantity: updateCartQuantity, cartItems, isCartOpen, setIsCartOpen, removeFromCart } = useCart();

  const handleAddToCart = () => {
    addToCart(parseInt(product.id), product.name, product.price);
    if (quantity > 1) {
      updateCartQuantity(parseInt(product.id), quantity);
    }
  };

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-14 sm:pt-16 md:pt-18 lg:pt-20">
      <Navigation />
      
      {/* Breadcrumb */}
      <section className="pt-20 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-sm text-gray-600"
          >
            <button 
              onClick={() => router.push('/products')}
              className="flex items-center hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Products
            </button>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </motion.div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl p-8 mb-4">
                  <motion.img
                    src={selectedImage ? product.hoverImage : product.image}
                    alt={product.name}
                    className="w-full h-96 object-contain"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                {/* Image Thumbnails */}
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(false)}
                    className={`flex-1 p-2 rounded-lg border-2 transition-colors ${
                      !selectedImage ? 'border-emerald-600' : 'border-gray-300'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt="Product view 1"
                      className="w-full h-20 object-contain"
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(true)}
                    className={`flex-1 p-2 rounded-lg border-2 transition-colors ${
                      selectedImage ? 'border-emerald-600' : 'border-gray-300'
                    }`}
                  >
                    <img
                      src={product.hoverImage}
                      alt="Product view 2"
                      className="w-full h-20 object-contain"
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge */}
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

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Category */}
              <p className="text-emerald-600 font-medium mb-4">{product.category}</p>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-gray-900 mb-6">
                {product.price}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-8 text-lg">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(quantity - 1)}
                    className="p-3 bg-emerald-100 rounded-lg hover:bg-emerald-200 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-5 h-5 text-emerald-600" />
                  </motion.button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(quantity + 1)}
                    className="p-3 bg-emerald-100 rounded-lg hover:bg-emerald-200 transition-colors"
                    disabled={quantity >= 10}
                  >
                    <Plus className="w-5 h-5 text-emerald-600" />
                  </motion.button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1"
                >
                  Add to Cart
                </Button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-emerald-100 rounded-full hover:bg-emerald-200 transition-colors"
                >
                  <Heart className="w-6 h-6 text-emerald-600" />
                </motion.button>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 bg-emerald-50 text-emerald-700 text-sm rounded-full flex items-center"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingredients</h3>
                <p className="text-gray-600">{product.ingredients}</p>
              </div>

              {/* Nutrition Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Nutrition Facts</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{product.nutrition.calories}</div>
                    <div className="text-xs text-gray-600">Calories</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-emerald-600">{product.nutrition.protein}</div>
                    <div className="text-xs text-gray-600">Protein</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{product.nutrition.carbs}</div>
                    <div className="text-xs text-gray-600">Carbs</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">{product.nutrition.fat}</div>
                    <div className="text-xs text-gray-600">Fat</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{product.nutrition.fiber}</div>
                    <div className="text-xs text-gray-600">Fiber</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section id="about-us">
        <IngredientsSection />
      </section>
      <section id="products">
        <ProductShowcase />
      </section>
      <ProductInfoSection />
      <section id="reviews">
        <ClientFeedbacks />
      </section>
      <GetEveryAnswer />
      <section id="blogs">
        <FeaturesSection />
      </section>

      <Footer />
      
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}
