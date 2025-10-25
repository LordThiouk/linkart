import { Database } from './supabase';

// Re-export Supabase types
export type { Database } from './supabase';

// User types
export type User = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];

// Product types
export type Product = Database['public']['Tables']['products']['Row'];
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type ProductUpdate = Database['public']['Tables']['products']['Update'];

// Transaction types
export type Transaction = Database['public']['Tables']['transactions']['Row'];
export type TransactionInsert = Database['public']['Tables']['transactions']['Insert'];
export type TransactionUpdate = Database['public']['Tables']['transactions']['Update'];

// Boost types
export type Boost = Database['public']['Tables']['boosts']['Row'];
export type BoostInsert = Database['public']['Tables']['boosts']['Insert'];
export type BoostUpdate = Database['public']['Tables']['boosts']['Update'];

// Rating types
export type Rating = Database['public']['Tables']['ratings']['Row'];
export type RatingInsert = Database['public']['Tables']['ratings']['Insert'];
export type RatingUpdate = Database['public']['Tables']['ratings']['Update'];

// Withdrawal types
export type Withdrawal = Database['public']['Tables']['withdrawals']['Row'];
export type WithdrawalInsert = Database['public']['Tables']['withdrawals']['Insert'];
export type WithdrawalUpdate = Database['public']['Tables']['withdrawals']['Update'];

// Download token types
export type DownloadToken = Database['public']['Tables']['download_tokens']['Row'];
export type DownloadTokenInsert = Database['public']['Tables']['download_tokens']['Insert'];
export type DownloadTokenUpdate = Database['public']['Tables']['download_tokens']['Update'];

// Download log types
export type DownloadLog = Database['public']['Tables']['download_logs']['Row'];
export type DownloadLogInsert = Database['public']['Tables']['download_logs']['Insert'];
export type DownloadLogUpdate = Database['public']['Tables']['download_logs']['Update'];

// Platform earnings types
export type PlatformEarning = Database['public']['Tables']['platform_earnings']['Row'];
export type PlatformEarningInsert = Database['public']['Tables']['platform_earnings']['Insert'];
export type PlatformEarningUpdate = Database['public']['Tables']['platform_earnings']['Update'];

// User capabilities interface
export interface UserCapabilities {
  can_buy: boolean;
  can_sell: boolean;
  can_withdraw: boolean;
  can_boost: boolean;
}

// API Response types
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    timestamp: string;
  };
}

// Presigned URL types
export interface PresignedURL {
  url: string;
  expiresAt: Date;
  ttl: number;
}

// Payment types
export interface PaymentRequest {
  productId: string;
  paymentMethod: 'wave' | 'orange_money';
}

export interface PaymentResponse {
  paymentUrl: string;
  transactionId: string;
  expiresAt: Date;
}

// Upload types
export interface UploadRequest {
  filename: string;
  size: number;
  contentType: string;
  isPreview: boolean;
}

export interface UploadResponse {
  uploadUrl: string;
  key: string;
  expiresAt: Date;
}

// Search and filter types
export interface ProductFilters {
  type?: 'beat' | 'sample' | 'kit' | 'service';
  genre?: string;
  minPrice?: number;
  maxPrice?: number;
  bpm?: number;
  license?: string;
  search?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  cursor?: string;
}

// Error types
export enum ErrorCodes {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  RATE_LIMITED = 'RATE_LIMITED',
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  TRANSACTION_EXPIRED = 'TRANSACTION_EXPIRED',
}

// Transaction status types
export type TransactionStatus = 'pending' | 'paid_held' | 'released' | 'failed' | 'refunded';

// Product status types
export type ProductStatus = 'draft' | 'pending' | 'active' | 'rejected';

// Boost status types
export type BoostStatus = 'active' | 'expired' | 'cancelled';

// Rating status types
export type RatingStatus = 'visible' | 'hidden' | 'flagged';

// Withdrawal status types
export type WithdrawalStatus = 'pending' | 'paid' | 'rejected';

// Extended types for components
export interface ProductWithCreator extends Product {
  creator: {
    id: string;
    name: string;
    avatar_url?: string;
    rating?: number;
    is_verified: boolean;
  };
}

export interface ProductPreviewData {
  id: string;
  title: string;
  type?: 'beat' | 'kit' | 'sample' | 'service';
  price: number;
  currency?: string;
  creator: {
    name: string;
    avatarUri?: string;
    rating?: number;
    isVerified?: boolean;
  };
  tags?: string[];
  genre?: string;
  bpm?: number;
  license?: string;
  previewUri?: string;
  isBoosted?: boolean;
  rating?: number;
}

// Auth types
export interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
  capabilities: UserCapabilities;
}

// Component prop types
export interface BaseComponentProps {
  testID?: string;
  style?: Record<string, unknown>;
}

// Form types
export interface FormFieldProps extends BaseComponentProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
}
