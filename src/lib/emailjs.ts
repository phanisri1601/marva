// EmailJS Configuration
export const emailConfig = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
};

// Generate OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP Email
export const sendOTPEmail = async (email: string, otp: string, name: string) => {
  try {
    const templateParams = {
      to_email: email,
      to_name: name,
      otp_code: otp,
      from_name: 'MARVA Natural Foods'
    };

    console.log('Sending EmailJS request:', {
      service_id: emailConfig.serviceId,
      template_id: emailConfig.templateId,
      user_id: emailConfig.publicKey,
      template_params: templateParams,
    });

    // Using EmailJS to send email
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: emailConfig.serviceId,
        template_id: emailConfig.templateId,
        user_id: emailConfig.publicKey,
        template_params: templateParams,
      }),
    });

    const responseText = await response.text();
    console.log('EmailJS response:', response.status, responseText);

    if (response.ok) {
      return { success: true, message: 'OTP sent successfully' };
    } else {
      console.error('EmailJS error response:', response.status, responseText);
      throw new Error(`EmailJS error: ${response.status} - ${responseText}`);
    }
  } catch (error) {
    console.error('EmailJS error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { success: false, message: `Failed to send OTP: ${errorMessage}` };
  }
};

// For development/testing - simulate email sending
export const simulateOTPSend = async (email: string, otp: string, name: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('=== OTP EMAIL ===');
  console.log('To:', email);
  console.log('Name:', name);
  console.log('OTP:', otp);
  console.log('================');
  
  return { success: true, message: 'OTP sent successfully (simulated)' };
};
