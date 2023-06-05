export interface NoneSecurePaymentResponse {
  fail: boolean;
  statusCode: number;
  result: {
    responseCode: string;
    responseMessage: string;
    orderId: string;
    txnType: string;
    txnStatus: string;
    vposId: number;
    vposName: string;
    authCode: string;
    hostReference?: string;
    totalAmount: string;
  };
}
