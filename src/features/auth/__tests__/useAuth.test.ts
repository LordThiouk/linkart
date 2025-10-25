import { renderHook, act } from '@testing-library/react-native';
import { useAuth } from '../hooks/useAuth';

// Mock Supabase
jest.mock('../../auth/hooks/useAuth', () => ({
  supabase: {
    auth: {
      signInWithOtp: jest.fn(),
      verifyOtp: jest.fn(),
      signOut: jest.fn(),
      getUser: jest.fn(),
    },
  },
}));

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles sign in with phone', async () => {
    const mockSignIn = jest.fn().mockResolvedValue({ data: {}, error: null });
    const { supabase } = require('../../auth/hooks/useAuth');
    supabase.auth.signInWithOtp = mockSignIn;

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signInWithPhone('+221771234567');
    });

    expect(mockSignIn).toHaveBeenCalledWith({
      phone: '+221771234567',
    });
  });

  it('handles sign in with email', async () => {
    const mockSignIn = jest.fn().mockResolvedValue({ data: {}, error: null });
    const { supabase } = require('../../auth/hooks/useAuth');
    supabase.auth.signInWithOtp = mockSignIn;

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signInWithEmail('test@example.com');
    });

    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'test@example.com',
    });
  });

  it('handles OTP verification', async () => {
    const mockVerifyOtp = jest.fn().mockResolvedValue({
      data: { user: { id: '123' } },
      error: null,
    });
    const { supabase } = require('../../auth/hooks/useAuth');
    supabase.auth.verifyOtp = mockVerifyOtp;

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.verifyOTP('123456', 'phone');
    });

    expect(mockVerifyOtp).toHaveBeenCalledWith({
      token: '123456',
      type: 'phone',
    });
  });

  it('handles sign out', async () => {
    const mockSignOut = jest.fn().mockResolvedValue({ error: null });
    const { supabase } = require('../../auth/hooks/useAuth');
    supabase.auth.signOut = mockSignOut;

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signOut();
    });

    expect(mockSignOut).toHaveBeenCalled();
  });

  it('handles errors correctly', async () => {
    const mockSignIn = jest.fn().mockResolvedValue({
      data: null,
      error: { message: 'Invalid phone number' },
    });
    const { supabase } = require('../../auth/hooks/useAuth');
    supabase.auth.signInWithOtp = mockSignIn;

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signInWithPhone('invalid');
    });

    expect(result.current.error).toBe('Invalid phone number');
  });
});
