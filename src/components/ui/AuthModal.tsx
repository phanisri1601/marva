'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, Mail, User, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { generateOTP, sendOTPEmail, simulateOTPSend } from '@/lib/emailjs';
import { authService } from '@/lib/firestore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

type AuthMode = 'login' | 'register' | 'otp-verification';
type AuthStep = 'form' | 'otp';

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [step, setStep] = useState<AuthStep>('form');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userData, setUserData] = useState<any>({});

  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Login with Firestore
      const user = await authService.login(formData.email, formData.password);
      
      if (user) {
        login({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone || ''
        });
        onAuthSuccess();
        onClose();
        resetForm();
      } else {
        throw new Error('Login failed');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      alert(error.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
      }

      // Generate OTP
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);
      setUserData(formData);

      // Send OTP email
      const emailResult = await sendOTPEmail(formData.email, newOtp, formData.name);
      
      if (emailResult.success) {
        setStep('otp');
      } else {
        alert(emailResult.message);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (otp === generatedOtp) {
        // Create user account in Firestore
        const newUserData = await authService.register({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          password: userData.password // In production, hash this password
        });

        console.log('User registered:', newUserData);

        // Login the user
        login({
          id: newUserData.id,
          name: newUserData.name,
          email: newUserData.email,
          phone: newUserData.phone || ''
        });

        onAuthSuccess();
        onClose();
        resetForm();
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error: any) {
      console.error('Registration failed:', error);
      if (error.message.includes('already exists')) {
        alert(error.message);
      } else {
        alert('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);
      
      const emailResult = await sendOTPEmail(userData.email, newOtp, userData.name);
      
      if (emailResult.success) {
        alert('OTP resent successfully!');
      } else {
        alert(emailResult.message);
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setOtp('');
    setGeneratedOtp('');
    setUserData({});
    setStep('form');
    setMode('login');
  };

  const switchMode = (newMode: AuthMode) => {
    resetForm();
    setMode(newMode);
  };

  if (!isOpen) return null;

  return (
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
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <User className="w-6 h-6 text-gray-800" />
            <h2 className="text-xl font-bold text-gray-800">
              {mode === 'login' ? 'Welcome Back' : 
               mode === 'register' ? 'Create Account' : 
               'Verify Email'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Mode Toggle */}
        {step === 'form' && (
          <div className="flex bg-gradient-to-r from-emerald-50 to-teal-50 p-1 m-6 rounded-xl border border-emerald-200">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                mode === 'login' 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-white/50'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => switchMode('register')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                mode === 'register' 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-white/50'
              }`}
            >
              Register
            </button>
          </div>
        )}

        {/* Forms */}
        <form onSubmit={
          mode === 'login' ? handleLogin : 
          step === 'form' ? handleRegister : 
          handleVerifyOTP
        } className="p-6">
          {step === 'form' ? (
            // Login/Register Form
            <div className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={mode === 'register'}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required={mode === 'register'}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // OTP Verification Form
            <div className="space-y-4">
              <div className="text-center py-4">
                <Lock className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">
                  We've sent a 6-digit OTP to:
                </p>
                <p className="font-semibold text-gray-800">{userData.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <div className="flex justify-center space-x-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={otp[index] || ''}
                      onChange={(e) => {
                        const newOtp = otp.split('');
                        newOtp[index] = e.target.value;
                        setOtp(newOtp.join(''));
                      }}
                      className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg font-semibold"
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleResendOTP}
                className="w-full text-center text-sm text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Resend OTP'}
              </button>
            </div>
          )}

          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
              disabled={isLoading}
            >
              {isLoading 
                ? (mode === 'login' ? 'Logging in...' : 
                   step === 'form' ? 'Creating Account...' : 
                   'Verifying...')
                : (mode === 'login' ? 'Login' : 
                   step === 'form' ? 'Create Account' : 
                   'Verify & Complete')
              }
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            By continuing, you agree to our terms and privacy policy
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}
