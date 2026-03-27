// Firestore Configuration
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app: any;
let db: any;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error: any) {
  if (error.code === 'app/duplicate-app') {
    app = getApp();
    db = getFirestore(app);
  } else {
    throw error;
  }
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
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, userId));
    
    if (!userDoc.exists()) {
      return null;
    }
    
    return { id: userDoc.id, ...userDoc.data() } as User;
  },

  // Update user
  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
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
