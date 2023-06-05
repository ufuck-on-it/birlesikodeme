import axios, { AxiosInstance } from 'axios';
import { createHash } from 'crypto';
import { PaymentRequest } from './interfaces/payment/payment.request';
import { PaymentResponse } from './interfaces/payment/payment.response';
import { Payment3dRequest } from './interfaces/payment3d/payment.request';
import { NoneSecurePaymentRequest } from './interfaces/NoneSecurePayment/none.secure.payment.request';
import { NoneSecurePaymentResponse } from './interfaces/NoneSecurePayment/none.secure.payment.response';
import { Payment3dResponse } from './interfaces/payment3d/payment.response';

export class UnitedPayment {
  private httpClient: AxiosInstance;
  private hashPassword: unknown;
  constructor(baseUrl: string, token: string, hashPassword: string) {
    this.httpClient = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    this.hashPassword = hashPassword;
  }

  private calculateHash(data: string): string {
    const hash = createHash('sha512');
    hash.update(data, 'utf16le');
    return hash.digest('hex');
  }

  public async processPaymentWithIFrame(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    try {
      const hash = this.calculateHash(
        `${this.hashPassword}${paymentRequest.userCode}${paymentRequest.rnd}${paymentRequest.txnType}${paymentRequest.totalAmount}${paymentRequest.customerId}${paymentRequest.orderId}${paymentRequest.okUrl}${paymentRequest.failUrl}`
      );
      const response = await this.httpClient.post<PaymentResponse>(`/api/ppg/Payment/Payment`, {
        ...paymentRequest,
        hash,
      });
      return response.data;
    } catch (error: any) {
      throw new Error('Payment request failed: ' + error.message);
    }
  }

  public async payment3d(paymentRequest: Payment3dRequest): Promise<Payment3dResponse> {
    try {
      const hash = this.calculateHash(
        `${this.hashPassword}${paymentRequest.userCode}${paymentRequest.rnd}${paymentRequest.txnType}${paymentRequest.totalAmount}${paymentRequest.customerId}${paymentRequest.orderId}${paymentRequest.okUrl}${paymentRequest.failUrl}`
      );
      const response = await this.httpClient.post<PaymentResponse>(`/api/ppg/Payment/Payment`, {
        ...paymentRequest,
        hash,
      });
      return response.data;
    } catch (error: any) {
      throw new Error('Payment3d request failed: ' + error.message);
    }
  }

  public async noneSecurePayment(request: NoneSecurePaymentRequest): Promise<NoneSecurePaymentResponse> {
    try {
      const hash = this.calculateHash(
        `${this.hashPassword}+${request.userCode}+${request.rnd}+${request.txnType}+${request.totalAmount}+${request.customerId}+${request.orderId}`
      );
      const response = await this.httpClient.post<NoneSecurePaymentResponse>(`/api/ppg/Payment/NoneSecurePayment`, {
        ...request,
        hash,
      });
      return response.data;
    } catch (error: any) {
      throw new Error('NoneSecurePayment request failed: ' + error.message);
    }
  }
}
