export interface PaymentRequest {
  memberId: number;
  merchantId: number;
  customerId?: string;
  userCode: string;
  txnType: string;
  installmentCount?: string;
  currency: string;
  okUrl?: string;
  failUrl?: string;
  orderId: string;
  totalAmount: string;
  rnd: string;
  description?: string;
  requestIp?: string;
  merchantVposId?: number;
  extraData?: string;
  orderProductList?: OrderProduct[];
  deliveryInfo?: DeliveryInfo[];
  billingInfo?: BillingInfo[];
  maturityPeriod?: string;
  paymentFrequency?: string;
}

export interface OrderProduct {
  merchantId: number;
  productId: string;
  amount: string;
  productName: string;
  commissionRate: string;
  description?: string;
}

export interface DeliveryInfo {
  taxNo?: string;
  taxOffice?: string;
  firmName?: string;
  identityNumber?: string;
  fullName?: string;
  email?: string;
  address?: string;
  phone?: string;
  city?: string;
  town?: string;
  zipCode?: string;
}

export interface BillingInfo {
  taxNo?: string;
  taxOffice?: string;
  firmName?: string;
  identityNumber?: string;
  fullName?: string;
  email?: string;
  address?: string;
  phone?: string;
  city?: string;
  town?: string;
  zipCode?: string;
}
