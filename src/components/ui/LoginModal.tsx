'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, Mail, User, Phone, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { generateOTP, sendOTPEmail, simulateOTPSend } from '@/lib/emailjs';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate OTP
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);

      // Send OTP email (use real EmailJS)
      const emailResult = await sendOTPEmail(formData.email, newOtp, formData.name);
      
      if (emailResult.success) {
        setStep('otp');
      } else {
        alert(emailResult.message);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (otp === generatedOtp) {
        const userData = {
          id: Date.now().toString(),
          ...formData
        };

        login(userData);
        onLoginSuccess();
        onClose();
        
        // Reset form
        setFormData({ name: '', email: '', phone: '' });
        setOtp('');
        setGeneratedOtp('');
        setStep('details');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);
      
      const emailResult = await sendOTPEmail(formData.email, newOtp, formData.name);
      
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
              {step === 'details' ? 'Login to Checkout' : 'Verify OTP'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step === 'details' ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 ${step === 'otp' ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step === 'otp' ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              2
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {step === 'details' ? 'Enter your details' : 'Verify your email'}
          </p>
        </div>

        {/* Forms */}
        <form onSubmit={step === 'details' ? handleSendOTP : handleVerifyOTP} className="p-6">
          {step === 'details' ? (
            // Details Form
            <div className="space-y-4">
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
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>

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
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

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
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>
          ) : (
            // OTP Form
            <div className="space-y-4">
              <div className="text-center py-4">
                <Lock className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">
                  We've sent a 6-digit OTP to:
                </p>
                <p className="font-semibold text-gray-800">{formData.email}</p>
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
                ? (step === 'details' ? 'Sending OTP...' : 'Verifying...')
                : (step === 'details' ? 'Send OTP' : 'Verify & Login')
              }
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            By logging in, you agree to our terms and privacy policy
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}
