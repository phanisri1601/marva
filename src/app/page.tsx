'use client';

import { Navigation } from '@/components/layout/Navigation';
import { HeroSection } from '@/components/home/HeroSection';
import { IngredientsSection } from '@/components/home/IngredientsSection';
import { ProductShowcase } from '@/components/home/ProductShowcase';
import { ProductInfoSection } from '@/components/home/ProductInfoSection';
import { ClientFeedbacks } from '@/components/home/ClientFeedbacks';
import { GetEveryAnswer } from '@/components/home/GetEveryAnswer';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartModal } from '@/components/ui/CartModal';
import { useCart } from '@/contexts/CartContext';

function AppContent() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="min-h-screen pt-14 sm:pt-16 md:pt-18 lg:pt-20">
      <Navigation />
      <HeroSection />
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
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}

function AppWithProviders() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default function Home() {
  return <AppWithProviders />;
}
