export interface OrderProduct {
  merchantId: number;
  productId: string;
  amount: string;
  productName: string;
  commissionRate: string;
  description?: string;
}

export interface CustomerInfo {
  taxNo?: string;
  taxOffice?: string;
  firmName?: string;
  identityNumber?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  town?: string;
  zipCode?: string;
}

export interface NoneSecurePaymentRequest {
  memberId: number;
  merchantId: number;
  customerId?: string;
  cardNumber?: string;
  expiryDateMonth: string;
  expiryDateYear: string;
  cvv?: string;
  userCode: string;
  txnType: string;
  installmentCount: string;
  currency: string;
  orderId: string;
  totalAmount: string;
  pointAmount?: string;
  rnd: string;
  description?: string;
  requestIp?: string;
  cardHolderName?: string;
  cardAlias?: string;
  secureDataId?: number;
  orderProductList?: OrderProduct[];
  deliveryInfo?: CustomerInfo;
  billingInfo?: CustomerInfo;
}
