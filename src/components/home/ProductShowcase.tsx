'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

export function ProductShowcase() {
  const { cartItems, updateQuantity, addToCart } = useCart();
  const router = useRouter();

  const products = [
    {
      id: 1,
      name: 'Peanut Butter',
      price: '$12.99',
      image: '/bg_marvaproteinbar.png',
      hoverImage: '/proteinbar1.png',
    },
    {
      id: 2,
      name: 'Protein Bar - Normal',
      price: '$24.99',
      image: '/bg_marvaproteinbar.png',
      hoverImage: '/proteinbar1.png',
    },
    {
      id: 3,
      name: 'Biscuits',
      price: '$8.99',
      image: '/bowl.png',
      hoverImage: '/bowl1.png',
    },
    {
      id: 4,
      name: 'Protein Bar - Chocolate',
      price: '$26.99',
      image: '/bg_marvaproteinbar.png',
      hoverImage: '/proteinbar1.png',
    },
    {
      id: 5,
      name: 'Protein Bar - Peanut Crunch',
      price: '$27.99',
      image: '/bg_marvaproteinbar.png',
      hoverImage: '/proteinbar1.png',
    },
    {
      id: 6,
      name: 'Protein Bar - Katora',
      price: '$25.99',
      image: '/bg_marvaproteinbar.png',
      hoverImage: '/proteinbar1.png',
    },
  ];

  const getProductQuantity = (productId: number) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (productId: number, productName: string, productPrice: string) => {
    addToCart(productId, productName, productPrice);
  };

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Product Showcase
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our best sellers, featuring top-rated products loved by customers
            for their quality, performance, and unbeatable value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => {
            const quantity = getProductQuantity(product.id);
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden group relative cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                {/* Product Image with Hover Effect */}
                <div className="relative h-64 flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                  />
                  {product.hoverImage && product.image !== product.hoverImage && (
                    <img
                      src={product.hoverImage}
                      alt={`${product.name} hover`}
                      className="absolute inset-0 max-h-full max-w-full object-contain m-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      {product.price}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  {quantity > 0 ? (
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <button
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          updateQuantity(product.id, quantity - 1);
                        }}
                        className="p-2 bg-emerald-100 rounded-lg hover:bg-emerald-200 transition-colors duration-200"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4 text-emerald-600" />
                      </button>
                      <span className="text-lg font-semibold text-gray-800 min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          updateQuantity(product.id, quantity + 1);
                        }}
                        className="p-2 bg-emerald-100 rounded-lg hover:bg-emerald-200 transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4 text-emerald-600" />
                      </button>
                    </div>
                  ) : (
                    <Button 
                      variant="primary" 
                      size="sm"
                      className="w-full"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleAddToCart(product.id, product.name, product.price);
                      }}
                    >
                      Buy Now
                    </Button>
                  )}

                  {/* Added Badge */}
                  {quantity > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                    >
                      {quantity} in cart
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
