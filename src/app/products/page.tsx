'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Star, ShoppingCart, Heart, Check } from 'lucide-react';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const allProducts = [
  {
    id: 1,
    name: 'Peanut Butter',
    price: '$12.99',
    rating: 4.7,
    reviews: 156,
    image: '/peanutbutterdrops.png',
    hoverImage: '/peanut_bowl.png',
    category: 'Spreads',
    ingredients: '100% Roasted Peanuts, Sea Salt',
    features: ['100% Natural', 'High Protein', 'No Preservatives', 'Smooth Texture'],
    badge: 'Bestseller',
    description: 'Pure roasted peanuts ground to perfection, creating a smooth, creamy spread without any additives.'
  },
  {
    id: 2,
    name: 'Protein Bar - Normal',
    price: '$24.99',
    rating: 4.8,
    reviews: 203,
    image: '/bg_marvaproteinbar.png',
    hoverImage: '/proteinbar1.png',
    category: 'Protein Bars',
    ingredients: 'Whey Protein, Almonds, Dark Chocolate, Honey, Natural Flavors',
    features: ['High Protein', 'Gluten-Free', 'No Added Sugar', 'Keto-Friendly'],
    badge: 'Bestseller',
    description: 'Rich chocolate flavor with 20g of premium protein to fuel your workout and recovery.'
  },
  {
    id: 3,
    name: 'Biscuits',
    price: '$8.99',
    rating: 4.6,
    reviews: 89,
    image: '/bowl.png',
    hoverImage: '/bowl1.png',
    category: 'Biscuits',
    ingredients: 'Whole Grain Oats, Honey, Wheat Flour, Butter, Sea Salt, Natural Vanilla',
    features: ['Whole Grain', 'Honey Sweetened', 'Baked Fresh', 'No Preservatives'],
    badge: null,
    description: 'Whole grain oats sweetened with pure honey, perfect for a wholesome breakfast or snack.'
  },
  {
    id: 4,
    name: 'Protein Bar - Chocolate',
    price: '$26.99',
    rating: 4.9,
    reviews: 124,
    image: '/bg_marvaproteinbar.png',
    hoverImage: '/proteinbar1.png',
    category: 'Protein Bars',
    ingredients: 'Whey Protein, Almonds, Dark Chocolate, Honey, Natural Flavors',
    features: ['High Protein', 'Gluten-Free', 'No Added Sugar', 'Keto-Friendly'],
    badge: 'Premium',
    description: 'Rich dark chocolate with 20g of premium protein for ultimate indulgence.'
  },
  {
    id: 5,
    name: 'Protein Bar - Peanut Crunch',
    price: '$27.99',
    rating: 4.8,
    reviews: 167,
    image: '/bg_marvaproteinbar.png',
    hoverImage: '/proteinbar1.png',
    category: 'Protein Bars',
    ingredients: 'Whey Protein, Peanuts, Honey, Sea Salt, Natural Flavors',
    features: ['High Protein', 'Crunchy Texture', 'No Added Sugar', 'Keto-Friendly'],
    badge: 'New',
    description: 'Crunchy peanut pieces blended with smooth protein for perfect texture and taste.'
  },
  {
    id: 6,
    name: 'Protein Bar - Katora',
    price: '$25.99',
    rating: 4.7,
    reviews: 145,
    image: '/bg_marvaproteinbar.png',
    hoverImage: '/proteinbar1.png',
    category: 'Protein Bars',
    ingredients: 'Whey Protein, Nuts, Honey, Natural Flavors, Sea Salt',
    features: ['High Protein', 'Mixed Nuts', 'No Added Sugar', 'Keto-Friendly'],
    badge: null,
    description: 'Premium blend of nuts and protein for a satisfying, energy-boosting snack.'
  }
];

export default function ProductsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const categories = ['All', 'Protein Bars', 'Biscuits', 'Spreads'];
  
  const filteredProducts = selectedCategory === 'All' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory);

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  const handleAddToCart = (e: React.MouseEvent, productId: number, productName: string, productPrice: string) => {
    e.stopPropagation(); // Prevent navigation when clicking cart button
    // This will be handled by the ProductsPageContent component
  };

  return (
    <AuthProvider>
      <CartProvider>
        <ProductsPageContent 
          router={router}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          hoveredProduct={hoveredProduct}
          setHoveredProduct={setHoveredProduct}
          filteredProducts={filteredProducts}
          handleProductClick={handleProductClick}
          handleAddToCart={handleAddToCart}
        />
      </CartProvider>
    </AuthProvider>
  );
}

function ProductsPageContent({ 
  router, 
  selectedCategory, 
  setSelectedCategory, 
  hoveredProduct, 
  setHoveredProduct, 
  filteredProducts, 
  handleProductClick, 
  handleAddToCart 
}: {
  router: any;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  hoveredProduct: number | null;
  setHoveredProduct: (product: number | null) => void;
  filteredProducts: any[];
  handleProductClick: (id: number) => void;
  handleAddToCart: (e: React.MouseEvent, id: number, name: string, price: string) => void;
}) {
  const { addToCart } = useCart();
  
  const categories = ['All', 'Protein Bars', 'Biscuits', 'Spreads'];

  const actualHandleAddToCart = (e: React.MouseEvent, productId: number, productName: string, productPrice: string) => {
    e.stopPropagation(); // Prevent navigation when clicking cart button
    addToCart(productId, productName, productPrice);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-14 sm:pt-16 md:pt-18 lg:pt-20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-emerald-600">Premium Products</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our complete range of healthy, natural products designed to fuel your active lifestyle.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => handleProductClick(product.id)}
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-emerald-100 to-green-100">
                  <motion.img
                    src={hoveredProduct === product.id ? product.hoverImage : product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-8"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {product.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                        product.badge === 'Bestseller' ? 'bg-red-500 text-white' :
                        product.badge === 'New' ? 'bg-green-500 text-white' :
                        'bg-purple-500 text-white'
                      }`}
                    >
                      {product.badge}
                    </motion.div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-sm text-emerald-600 font-medium">{product.category}</span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">{product.name}</h3>
                  </div>

                  {/* Rating */}
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

                  {/* Description */}
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-emerald-100 rounded-full"
                        onClick={(e) => actualHandleAddToCart(e, product.id, product.name, product.price)}
                      >
                        <Heart className="w-5 h-5 text-emerald-600" />
                      </motion.button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={(e) => actualHandleAddToCart(e, product.id, product.name, product.price)}
                      >
                        Add to Cart
                      </Button>
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
