'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileModal } from '@/components/ui/ProfileModal';
import { useRouter } from 'next/navigation';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 0}}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
    >
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <img
              src="/logo.png"
              alt="MARVA Logo"
              className="h-10 w-auto sm:h-12 md:h-14 lg:h-16"
            />
          </motion.div>

          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {['Home', 'About Us', 'Products', 'Reviews', 'Blogs'].map((item) => (
              <motion.button
                key={item}
                onClick={() => {
                  if (item === 'Home') {
                    router.push('/');
                    return;
                  }
                  const sectionId = item.toLowerCase().replace(' ', '-');
                  // Check if we're on a product detail page
                  if (window.location.pathname.startsWith('/products/')) {
                    // Scroll to section on current page
                    const element = document.getElementById(sectionId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  } else if (window.location.pathname === '/') {
                    // On homepage, scroll to section
                    const element = document.getElementById(sectionId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  } else {
                    // On other pages, navigate to homepage with hash
                    router.push(`/#${sectionId}`);
                  }
                }}
                className="text-gray-600 hover:text-black transition-colors duration-200 font-medium text-sm sm:text-base lg:text-lg bg-transparent border-none cursor-pointer"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.button>
            ))}
            
            {/* Desktop Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 sm:p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <ShoppingCart className="w-3 h-3 sm:w-4 md:w-5 text-gray-800" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>
            
            {/* Desktop Profile Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-1 lg:space-x-2 xl:space-x-4">
                <motion.button
                  onClick={() => setIsProfileOpen(true)}
                  className="flex items-center space-x-1 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-5 h-5 sm:w-6 md:w-7 lg:w-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <User className="w-2.5 h-2.5 sm:w-3 md:w-4 text-white" />
                  </div>
                  <span className="hidden lg:block text-xs lg:text-sm font-medium text-gray-800">{user?.name}</span>
                </motion.button>
                
                {/* Desktop Logout Button */}
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 p-1.5 sm:p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  title="Logout"
                >
                  <LogOut className="w-2.5 h-2.5 sm:w-3 md:w-4 text-red-600" />
                  <span className="hidden lg:block text-xs lg:text-sm font-medium text-red-600">Logout</span>
                </motion.button>
              </div>
            ) : null}
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <div className="md:hidden flex items-center space-x-1 sm:space-x-2">
            {/* Mobile Profile */}
            {isAuthenticated && (
              <motion.button
                onClick={() => setIsProfileOpen(true)}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-6 h-6 sm:w-7 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 sm:w-4 text-white" />
                </div>
              </motion.button>
            )}
            
            {/* Mobile Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 sm:p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 text-gray-800" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>
            
            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 sm:w-5 text-gray-800" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 text-gray-800" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Navigation Links */}
              {['Home', 'About Us', 'Products', 'Reviews', 'Blogs'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => {
                    if (item === 'Home') {
                      router.push('/');
                      setIsMenuOpen(false);
                      return;
                    }
                    const sectionId = item.toLowerCase().replace(' ', '-');
                    // Check if we're on a product detail page
                    if (window.location.pathname.startsWith('/products/')) {
                      // Scroll to section on current page
                      const element = document.getElementById(sectionId);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    } else if (window.location.pathname === '/') {
                      // On homepage, scroll to section
                      const element = document.getElementById(sectionId);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    } else {
                      // On other pages, navigate to homepage with hash
                      router.push(`/#${sectionId}`);
                    }
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium text-base bg-transparent border-none cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item}
                </motion.button>
              ))}
              
              {/* Mobile Logout Button */}
              {isAuthenticated && (
                <motion.button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium text-base border border-red-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </motion.nav>
  );
}
