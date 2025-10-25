import { api } from './api';
import { Transaction, PaymentRequest, PaymentResponse } from '../types';

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'wave' | 'orange_money';
  icon: string;
  fee?: number;
}

export class PaymentService {
  static async getPaymentMethods(): Promise<PaymentMethod[]> {
    const { data } = await api.get('/payment-methods');
    return data;
  }

  static async initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
    const { data } = await api.post('/pay', request);
    return data;
  }

  static async getTransaction(transactionId: string): Promise<Transaction> {
    const { data } = await api.get(`/transactions/${transactionId}`);
    return data;
  }

  static async getUserTransactions(): Promise<Transaction[]> {
    const { data } = await api.get('/transactions');
    return data;
  }

  static async downloadProduct(transactionId: string): Promise<string> {
    const { data } = await api.post('/generate-download', { transactionId });
    return data.downloadUrl;
  }

  static async rateProduct(transactionId: string, rating: number, comment?: string): Promise<void> {
    await api.post('/ratings', {
      transactionId,
      rating,
      comment,
    });
  }
}
