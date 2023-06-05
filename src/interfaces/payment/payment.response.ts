export interface PaymentResponse {
  orderId: string;
  rnd: string;
  hostReference: string;
  authCode: string;
  totalAmount: string;
  responseHash: string;
  responseCode: string;
  responseMessage: string;
  customerId: string;
  extraData: string;
  installmentCount: string;
  cardNumber: string;
  saleDate: string;
  vPosName: string;
  paymentSystem: string;
}
