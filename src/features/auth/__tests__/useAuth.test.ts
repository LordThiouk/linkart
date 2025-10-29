import { renderHook, act } from '@testing-library/react-native';
import { useAuth } from '../hooks/useAuth';

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithOtp: jest.fn(),
      verifyOtp: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
    },
    from: jest.fn(() => ({
      select: jest.fn(),
      upsert: jest.fn(),
      update: jest.fn(),
      eq: jest.fn(),
      single: jest.fn(),
    })),
  })),
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
    const { createClient } = require('@supabase/supabase-js');
    const mockSupabase = createClient();
    mockSupabase.auth.signInWithOtp = mockSignIn;

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signInWithPhone('+221771234567');
    });

    expect(mockSignIn).toHaveBeenCalledWith({
      phone: '+221771234567',
      options: {
        channel: 'sms',
      },
    });
  });

  it('handles sign in with email', async () => {
    const mockSignIn = jest.fn().mockResolvedValue({ data: {}, error: null });
    const { createClient } = require('@supabase/supabase-js');
    const mockSupabase = createClient();
    mockSupabase.auth.signInWithOtp = mockSignIn;

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signInWithEmail('test@example.com');
    });

    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      options: {
        emailRedirectTo: undefined,
      },
    });
  });

  it('handles OTP verification', async () => {
    const mockVerifyOtp = jest.fn().mockResolvedValue({
      data: { user: { id: '123' } },
      error: null,
    });
    const { createClient } = require('@supabase/supabase-js');
    const mockSupabase = createClient();
    mockSupabase.auth.verifyOtp = mockVerifyOtp;

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.verifyOTP('123456', 'phone');
    });

    expect(mockVerifyOtp).toHaveBeenCalledWith({
      phone: '+221000000000',
      token: '123456',
      type: 'sms',
    });
  });

  it('handles sign out', async () => {
    const mockSignOut = jest.fn().mockResolvedValue({ error: null });
    const { createClient } = require('@supabase/supabase-js');
    const mockSupabase = createClient();
    mockSupabase.auth.signOut = mockSignOut;

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
    const { createClient } = require('@supabase/supabase-js');
    const mockSupabase = createClient();
    mockSupabase.auth.signInWithOtp = mockSignIn;

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signInWithPhone('invalid');
    });

    expect(result.current.error).toBe('Invalid phone number');
  });
});
