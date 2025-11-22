import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState, useEffect } from 'react';
import { OTPVerificationForm } from './OTPVerificationForm';

const meta: Meta<typeof OTPVerificationForm> = {
  title: 'features/auth/OTPVerificationForm',
  component: OTPVerificationForm,
};

export default meta;
type Story = StoryObj<typeof OTPVerificationForm>;

export const Default: Story = {
  render: () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
      if (resendTimer > 0) {
        const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setCanResend(true);
      }
    }, [resendTimer]);

    return (
      <OTPVerificationForm
        otp={otp}
        error={error}
        resendTimer={resendTimer}
        canResend={canResend}
        onOtpChange={setOtp}
        onVerify={() => {
          if (otp.length !== 6) {
            setError(true);
            setTimeout(() => setError(false), 2000);
          } else {
            console.log('Verify:', otp);
          }
        }}
        onResend={() => {
          setResendTimer(30);
          setCanResend(false);
          setOtp('');
          setError(false);
        }}
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [otp, setOtp] = useState('123456');
    return (
      <OTPVerificationForm
        otp={otp}
        error={true}
        resendTimer={15}
        canResend={false}
        onOtpChange={setOtp}
        onVerify={() => console.log('Verify')}
        onResend={() => console.log('Resend')}
      />
    );
  },
};

export const CanResend: Story = {
  render: () => {
    const [otp, setOtp] = useState('');
    return (
      <OTPVerificationForm
        otp={otp}
        resendTimer={0}
        canResend={true}
        onOtpChange={setOtp}
        onVerify={() => console.log('Verify')}
        onResend={() => console.log('Resend')}
      />
    );
  },
};
