export interface Payment3dRequest {
  memberId: number;
  cardNumber: string;
  cvv: string;
  expiryDateYear: string;
  expiryDateMonth: string;
  use3D: boolean;
  merchantId: number;
  customerId?: string;
  userCode: string;
  txnType: string;
  installmentCount: string;
  currency: string;
  okUrl: string;
  failUrl: string;
  orderId: string;
  totalAmount: string;
  rnd: string;
  description?: string;
  requestIp?: string;
  insertCard?: boolean;
  cardHolderName?: string;
  cardAlias?: string;
  secureDataId?: number;
  extraData?: string;
  orderProductList?: OrderProduct3d[];
  deliveryInfo?: DeliveryInfo3d;
  billingInfo?: BillingInfo3d;
}

export interface OrderProduct3d {
  merchantId: number;
  productId: string;
  amount: string;
  productName: string;
  commissionRate: string;
  description: string;
  extraData: string;
}

export interface DeliveryInfo3d {
  taxNo: string;
  taxOffice: string;
  firmName: string;
  identityNumber: string;
  fullName: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  town: string;
  zipCode: string;
  maturityPeriod: string;
  paymentFrequency: string;
}

export interface BillingInfo3d {
  taxNo: string;
  taxOffice: string;
  firmName: string;
  identityNumber: string;
  fullName: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  town: string;
  zipCode: string;
}
