// Firestore Configuration
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';

// Firebase configuration with fallback values
const getFirebaseConfig = () => {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "marva-e860f.firebaseapp.com",
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://marva-e860f-default-rtdb.firebaseio.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "marva-e860f",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "marva-e860f.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "101961184149013835348",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:101961184149013835348:web:a1b2c3d4e5f6789012345",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX"
  };

  // Log warning if API key is missing
  if (!config.apiKey) {
    console.warn('Firebase API key not found in environment variables. Using fallback configuration.');
  }

  return config;
};

const firebaseConfig = getFirebaseConfig();

// Initialize Firebase
let app: any;
let db: any;

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  db = getFirestore(app);
} catch (error: any) {
  console.error('Firebase initialization error:', error);
  // Create a mock db for build time to prevent crashes
  db = null;
}

// Collections
const USERS_COLLECTION = 'users';
const ORDERS_COLLECTION = 'orders';

// User interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password: string; // In production, this should be hashed
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// User Services
export const userService = {
  // Create new user
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    if (!db) throw new Error('Firebase not initialized');
    const userRef = doc(collection(db, USERS_COLLECTION));
    const newUser: User = {
      id: userRef.id,
      ...userData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    await setDoc(userRef, newUser);
    return newUser;
  },

  // Get user by email
  async getUserByEmail(email: string): Promise<User | null> {
    if (!db) {
      console.warn('Firebase not initialized, returning null');
      return null;
    }
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where('email', '==', email), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() } as User;
  },

  // Get user by ID
  async getUserById(userId: string): Promise<User | null> {
    if (!db) {
      console.warn('Firebase not initialized, returning null');
      return null;
    }
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, userId));
    
    if (!userDoc.exists()) {
      return null;
    }
    
    return { id: userDoc.id, ...userDoc.data() } as User;
  },

  // Update user
  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    if (!db) throw new Error('Firebase not initialized');
    const userRef = doc(db, USERS_COLLECTION, userId);
    const updateData = {
      ...updates,
      updatedAt: Timestamp.now()
    };
    
    await setDoc(userRef, updateData, { merge: true });
    
    const updatedUser = await this.getUserById(userId);
    return updatedUser!;
  }
};

// Order Services
export const orderService = {
  // Create new order
  async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const orderRef = doc(collection(db, ORDERS_COLLECTION));
    const newOrder: Order = {
      id: orderRef.id,
      ...orderData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    await setDoc(orderRef, newOrder);
    return newOrder;
  },

  // Get orders by user ID (optimized without requiring index)
  async getUserOrders(userId: string): Promise<Order[]> {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    
    try {
      // First try with simple query (no ordering to avoid index requirement)
      const q = query(ordersRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      // Sort orders on the client side instead of Firestore
      const orders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      
      // Sort by createdAt descending (newest first)
      return orders.sort((a, b) => 
        b.createdAt.toMillis() - a.createdAt.toMillis()
      );
    } catch (error: any) {
      console.error('Error fetching user orders:', error);
      return [];
    }
  },

  // Get order by ID
  async getOrderById(orderId: string): Promise<Order | null> {
    const orderDoc = await getDoc(doc(db, ORDERS_COLLECTION, orderId));
    
    if (!orderDoc.exists()) {
      return null;
    }
    
    return { id: orderDoc.id, ...orderDoc.data() } as Order;
  },

  // Update order status
  async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    const updateData = {
      status,
      updatedAt: Timestamp.now()
    };
    
    await setDoc(orderRef, updateData, { merge: true });
    
    const updatedOrder = await this.getOrderById(orderId);
    return updatedOrder!;
  }
};

// Authentication helper
export const authService = {
  // Login user
  async login(email: string, password: string): Promise<User | null> {
    const user = await userService.getUserByEmail(email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // In production, you should hash the password and compare
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
    
    return user;
  },

  // Register user
  async register(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    // Check if user already exists
    const existingUser = await userService.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('An account with this email already exists. Please use a different email or try logging in.');
    }
    
    return await userService.createUser(userData);
  }
};

export { db };
