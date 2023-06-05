export interface PaymentInquiryResponse {
  orderId: string;
  cardNo: string;
  amount: number;
  rnd: string;
  hostReferenceNumber: string;
  installmentCount: string;
  totalAmount: string;
  responseHash: string;
  vposId: string;
  vposName: string;
  authCode: string;
  tranDate: string;
  txnType: string;
  txnStatus: string;
  currencyCode: string;
  responseCode: string;
  responseMessage: string;
  extraData: string;
  transId: string;
  customerId: string;
  merchantId: string;
  description: string;
  maturityPeriod: string;
  paymentFrequency: string;
  cardHolderName: string;
}
