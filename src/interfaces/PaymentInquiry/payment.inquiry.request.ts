export interface PaymentInquiryRequest {
  memberId: number;
  merchantId: number;
  rnd: string;
  orderNo: string;
  totalAmount: string;
  customerId?: string;
  txnType?: string;
}
