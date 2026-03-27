// Checkout Service for creating orders in Firestore
import { orderService, Order, OrderItem } from './firestore';
import { useCart } from '@/contexts/CartContext';

export interface CheckoutData {
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
}

export const checkoutService = {
  // Create order from cart
  async createOrderFromCart(checkoutData: CheckoutData): Promise<Order> {
    try {
      const orderData = {
        userId: checkoutData.userId,
        items: checkoutData.items,
        totalAmount: checkoutData.totalAmount,
        status: 'pending' as const,
        shippingAddress: checkoutData.shippingAddress,
        paymentMethod: checkoutData.paymentMethod
      };

      const newOrder = await orderService.createOrder(orderData);
      console.log('Order created successfully:', newOrder);
      
      return newOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  },

  // Convert cart items to order items
  convertCartToOrderItems(cartItems: any[]): OrderItem[] {
    return cartItems.map(item => ({
      id: item.id.toString(),
      name: item.name,
      price: parseFloat(item.price.replace('$', '')),
      quantity: item.quantity,
      image: item.image || ''
    }));
  },

  // Calculate total amount from cart items
  calculateTotalAmount(cartItems: any[]): number {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  },

  // Validate checkout data
  validateCheckoutData(checkoutData: CheckoutData): string[] {
    const errors: string[] = [];

    if (!checkoutData.userId) {
      errors.push('User ID is required');
    }

    if (!checkoutData.items || checkoutData.items.length === 0) {
      errors.push('Cart items are required');
    }

    if (checkoutData.totalAmount <= 0) {
      errors.push('Total amount must be greater than 0');
    }

    if (!checkoutData.shippingAddress.name) {
      errors.push('Shipping name is required');
    }

    if (!checkoutData.shippingAddress.phone) {
      errors.push('Shipping phone is required');
    }

    if (!checkoutData.shippingAddress.address) {
      errors.push('Shipping address is required');
    }

    if (!checkoutData.shippingAddress.city) {
      errors.push('Shipping city is required');
    }

    if (!checkoutData.shippingAddress.state) {
      errors.push('Shipping state is required');
    }

    if (!checkoutData.shippingAddress.zipCode) {
      errors.push('Shipping zip code is required');
    }

    if (!checkoutData.paymentMethod) {
      errors.push('Payment method is required');
    }

    return errors;
  }
};
