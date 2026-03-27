'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { AuthModal } from './AuthModal';
import { checkoutService } from '@/lib/checkout';

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export function CartModal({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartModalProps) {
  const { isAuthenticated, user } = useAuth();
  const { clearCart } = useCart();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const totalAmount = items.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return total + (price * item.quantity);
  }, 0);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    } else {
      try {
        // Convert cart items to order items
        const orderItems = checkoutService.convertCartToOrderItems(items);
        
        // Create mock shipping address (in production, this would come from a form)
        const shippingAddress = {
          name: user?.name || '',
          phone: user?.phone || '',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345'
        };

        // Create checkout data
        const checkoutData = {
          userId: user?.id || '',
          items: orderItems,
          totalAmount: totalAmount,
          shippingAddress,
          paymentMethod: 'Credit Card'
        };

        // Validate checkout data
        const errors = checkoutService.validateCheckoutData(checkoutData);
        if (errors.length > 0) {
          alert('Please fix the following errors:\n' + errors.join('\n'));
          return;
        }

        // Create order in Firestore
        const newOrder = await checkoutService.createOrderFromCart(checkoutData);
        
        console.log('Order created successfully:', newOrder);
        alert('Order placed successfully! Order ID: ' + newOrder.id);
        
        // Clear cart and close modal
        clearCart();
        onClose();
        
      } catch (error: any) {
        console.error('Checkout error:', error);
        alert(error.message || 'Failed to place order. Please try again.');
      }
    }
  };

  const handleLoginSuccess = () => {
    // User is now logged in, can proceed with checkout
    console.log('Login successful, proceeding to checkout...');
    // Add your checkout logic here
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 text-gray-800" />
              <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* User Info */}
          {isAuthenticated && user && (
            <div className="px-6 py-3 bg-emerald-50 border-b border-emerald-100">
              <p className="text-sm text-emerald-800">
                Welcome, <span className="font-semibold">{user.name}</span>
              </p>
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-gray-600">{item.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 bg-white rounded-lg px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded hover:bg-gray-100 transition-colors duration-200"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded hover:bg-gray-100 transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors duration-200"
              >
                {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
              </button>
              {!isAuthenticated && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  Please login to complete your purchase
                </p>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onAuthSuccess={handleLoginSuccess}
      />
    </>
  );
}
