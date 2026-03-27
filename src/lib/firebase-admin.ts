// Firebase Admin SDK for server-side operations
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Service account configuration
const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  clientEmail: "firebase-adminsdk-fbsvc@marva-e860f.iam.gserviceaccount.com",
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  clientId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID!,
  authUri: "https://accounts.google.com/o/oauth2/auth",
  tokenUri: "https://oauth2.googleapis.com/token",
  authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
  clientX509CertUrl: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40marva-e860f.iam.gserviceaccount.com"
};

// Initialize Firebase Admin SDK
let adminApp: any;
let adminDb: any;

try {
  if (!getApps().length) {
    adminApp = initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.projectId
    });
    adminDb = getFirestore(adminApp);
  }
} catch (error) {
  console.warn('Firebase Admin SDK initialization failed:', error);
  // Fallback to client SDK for development
}

// Admin services for server-side operations
export const adminService = {
  // Create user with admin privileges
  async createUserAdmin(userData: any) {
    if (!adminDb) {
      throw new Error('Admin SDK not initialized');
    }
    
    const userRef = adminDb.collection('users').doc();
    const newUser = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await userRef.set(newUser);
    return { id: userRef.id, ...newUser };
  },

  // Get all users (admin only)
  async getAllUsers() {
    if (!adminDb) {
      throw new Error('Admin SDK not initialized');
    }
    
    const snapshot = await adminDb.collection('users').get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  },

  // Create order with admin privileges
  async createOrderAdmin(orderData: any) {
    if (!adminDb) {
      throw new Error('Admin SDK not initialized');
    }
    
    const orderRef = adminDb.collection('orders').doc();
    const newOrder = {
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await orderRef.set(newOrder);
    return { id: orderRef.id, ...newOrder };
  },

  // Update order status (admin only)
  async updateOrderStatusAdmin(orderId: string, status: string) {
    if (!adminDb) {
      throw new Error('Admin SDK not initialized');
    }
    
    await adminDb.collection('orders').doc(orderId).update({
      status,
      updatedAt: new Date()
    });
    
    const orderDoc = await adminDb.collection('orders').doc(orderId).get();
    return { id: orderDoc.id, ...orderDoc.data() };
  }
};

export { adminDb };
