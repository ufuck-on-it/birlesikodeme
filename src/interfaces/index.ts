export interface OrderProduct {
  merchantId: number;
  productId: string;
  amount: string;
  productName: string;
  commissionRate: string;
  description: string;
}

export interface BillingOrDeliveryInfo {
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

export interface PaymentAuthorizationRequest {
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
  hash: string;
  description?: string;
  requestIp?: string;
  orderProductList?: OrderProduct[];
  billingInfo?: BillingOrDeliveryInfo;
  deliveryInfo?: BillingOrDeliveryInfo;
  maturityPeriod?: string;
  paymentFrequency?: string;
}

export interface PaymentAuthorizationResponse {
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
export interface Payment3dRequest {
  insertCard: boolean;
  use3D: boolean;
  merchantId: number;
  customerId: string;
  cardNumber: string;
  expiryDateMonth: string;
  expiryDateYear: string;
  cvv: string;
  secureDataId: number;
  cardAlias: string;
  userCode: string;
  txnType: string;
  installmentCount: string;
  currency: string;
  okUrl: string;
  failUrl: string;
  orderId: string;
  totalAmount: string;
  pointAmount: string;
  rnd: string;
  hash: string;
  description: string;
  requestIp: string;
  cardHolderName: string;
  extraData: string;
  campaign?: {
    text: string;
    value: string;
  };
  billingInfo?: CustomerInfo;
  deliveryInfo?: CustomerInfo;
  orderProductList: Product[];
  maturityPeriod: string;
  paymentFrequency: string;
}

export interface CustomerInfo {
  taxNo: string;
  taxOffice: string;
  firmName: string;
  identityNumber: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  town: string;
  zipCode: string;
}

export interface Product {
  merchantId: number;
  productId: string;
  amount: string;
  productName: string;
  commissionRate: string;
  description: string;
}

export interface Payment3dResponse {
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

export interface PaymentInquiryRequest {
  memberId: number;
  merchantId: number;
  customerId?: string;
  hash: string;
  txnType?: string;
  rnd: string;
  orderNo: string;
  totalAmount: string;
}

export interface PaymentInquiryResponse {
  orderId: string;
  cardNumber: string;
  amount: string;
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
  transId: number;
  customerId: string;
  merchantId: number;
}

export interface CommissionResponse {
  bank: string;
  bankName: string;
  blockDay: number;
  blockPeriod: string;
  blockRate: number;
  cardSource: string;
  cardType: string;
  currency: string;
  trnGroup: string;
}

export interface CommissionInstallResponse extends CommissionResponse {
  installmentCount: number;
  installmentReleaseType: string;
}

export interface BinListResponse {
  isBusinessCard: boolean;
  cardType: string;
  bankName: string;
  prefixNo: number;
  eftCode: string;
  brand: string;
  avoidPreauthInstall: boolean;
  avoidAuthInstall: boolean;
  network: string;
  brandName: string;
}

export interface SaveCardWithoutTransactionRequest {
  memberId: number;
  merchantId: number;
  customerId?: string;
  cardHolderName: string;
  cardNumber: string;
  expiryDateMonth: string;
  expiryDateYear: string;
  cvv?: string;
  secureDataId?: number;
  cardAlias?: string;
  okUrl?: string;
  failUrl?: string;
  use3D: boolean;
  insertCard: boolean;
}

export interface SaveCardWithoutTransactionResponse {
  responseHtml: string;
}

export interface TransactionData {
  orderNo: string;
  requestIp: string | null;
  txnType: string;
  txnSubType: string | null;
  merchantVposId: number;
  cardMask: string | null;
  saleDate: number;
  bankOrderNo: string;
  responseCode: string | null;
  cardId: number;
  vposId: number;
  hostReference: string | null;
  amount: number;
  discountRate: number;
  originalAmount: number;
  usedPoint: number;
  txnStatus: string;
  currencyCode: number;
  authCode: string | null;
  description: string;
  responseMessage: string | null;
  rnd: string;
  installmentCount: string | null;
  totalAmount: string;
  customerId: string;
  theedSecure: boolean;
  userCode: string;
  campaignType: string | null;
  campaignDescription: string | null;
  campaignValue: string | null;
  extraData: string | null;
  commissionRate: number;
}

export interface TransactionListResponse {
  fail: boolean;
  statusCode: number;
  result: {
    page: number;
    pageSize: number;
    totalPage: number;
    totalCount: number;
    data: TransactionData[];
  };
}

export interface MerchantData {
  merchantStatus: string;
  name: string;
  forceNonsecureAddCard: boolean;
  onusActive: boolean;
  useApi: boolean;
  merchantNumber: string;
  bkmMerchantId: number;
  mcc: string;
  namePlate: string;
  identityNumber: string;
  taxNumber: string;
  address: string;
  town: string;
  city: string;
  postCode: string;
  phoneNumber: string;
  email: string | null;
  webAddress: string;
  contractDate: number;
  startDate: number;
  finishDate: number;
  ownerName: string;
  parentMerchantId: number;
  firmId: string;
  nonesecureMaxAmount: number;
  channel: string;
  merchantPassword: string | null;
  avoidAddCard: boolean;
}

export interface MerchantListResponse {
  fail: boolean;
  statusCode: number;
  result: {
    page: number;
    pageSize: number;
    totalPage: number;
    totalCount: number;
    data: MerchantData[];
  };
}

export interface BinData {
  isBusinessCard: boolean;
  cardType: string;
  bankName: string;
  prefixNo: number;
  eftCode: string;
  brand: string;
  brandName: string;
  network: string;
  avoidPreauthInstall: boolean;
  avoidAuthInstall: boolean;
}

export interface CardCheckPointsRequest {
  cardHolderName: string;
  cardNo: string;
  expiryDateYear: string;
  expiryDateMonth: string;
  cvv: string;
  currency: string;
  secureDataId?: number;
  cardAlias?: string;
  memberId: number;
  customerId?: string;
}

export interface CardCheckPointsResponse {
  pointAmount: string;
  responseCode: string;
  responseMessage: string;
}

export interface IptalIadeServisiRequest {
  memberId: number;
  merchantId: number;
  customerId?: string;
  userCode: string;
  txnType: string;
  okUrl: string;
  failUrl: string;
  orderId: string;
  totalAmount: string;
  rnd: string;
  hash: string;
  description?: string;
  requestIp?: string;
  extraData?: string;
  orderProductList?: {
    merchantId: number;
    productId: string;
    amount: string;
    productName: string;
    commissionRate: string;
  }[];
}

export interface IptalIadeServisiResponse {
  url: string;
  responseCode: string;
  responseMessage: string;
  orderId: string;
  txnType: string;
  txnStatus: string;
  vposId: number;
  vposName: string;
}

export interface PaymentRequest {
  name: string;
  cardNo: string;
  orderNo: string;
  amount: number;
  year: string;
  month: string;
  cvv: string;
  txnType: string;
  txnSubType: string;
  address: string;
  point: number;
  installment: string;
  merchantVposId: number;
}

export interface PaymentResponse {
  url: string;
  responseCode: string;
  responseMessage: string;
  orderId: string;
  txnType: string;
  txnStatus: string;
  vposId: number;
  vposName: string;
}

export interface CommissionInquiryRequest {
  amount: string;
  installmentCount: string;
  memberId: number;
  merchantId: number;
}

export interface CommissionInquiryResponse {
  hasCommissionInfo: boolean;
  commissionRate: string;
  amount: string;
}

export interface InstallmentInquiryResponse {
  hasInstallment: number;
  installments: string[];
  vposId: string;
  vposName: string;
}

export interface Card {
  cardStatus: string;
  customerId: string;
  cardHolderName: string;
  cardMask: string;
  priorityRate: string;
  cardAlias: string;
  cardBin: string;
  expireDate: string;
  secureDataId: string;
}

export interface CardListResponse {
  fail: boolean;
  statusCode: number;
  result: Card[];
}

export interface CustomerCard {
  cardMask: string;
  month: string;
  year: string;
  cardAlias: string;
  secureDataId: number;
  cardHolderName: string;
  cardAssociation: string;
  brandName: string;
  eftCode: string;
  cardType: string;
}

export interface CustomerCardsResponse {
  customerCards: CustomerCard[];
}

export interface DeleteCustomerCardRequest {
  memberId: number;
  merchantId: number;
  customerId: string;
  secureDataId: number;
}

export interface DeleteCustomerCardResponse {
  isSucceed: boolean;
  message: string;
}

export interface OrderInquiryRequest {
  memberId: number;
  merchantId: number;
  customerId?: string;
  rnd: string;
  hash: string;
  orderNo?: string;
}

export interface OrderInquiryResponse {
  fail: boolean;
  statusCode: number;
  result: OrderInquiryResult[];
  errorCode?: string;
  errorDescription?: string;
}

export interface OrderInquiryResult {
  orderId: string;
  cardNo: string;
  ccNo: string | null;
  amount: number;
  authCode: string;
  tranDate: string;
  txnType: string;
  txnStatus: string | null;
  hostLogKey: string | null;
  currencyCode: string;
  responseCode: string;
  responseMessage: string | null;
}
