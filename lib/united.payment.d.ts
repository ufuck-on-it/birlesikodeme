import { BinData, BinListResponse, Card, CardCheckPointsRequest, CardCheckPointsResponse, CommissionInquiryRequest, CommissionInquiryResponse, CommissionInstallResponse, CommissionResponse, CustomerCard, DeleteCustomerCardRequest, DeleteCustomerCardResponse, InstallmentInquiryResponse, IptalIadeServisiRequest, IptalIadeServisiResponse, MerchantData, OrderInquiryRequest, OrderInquiryResponse, Payment3dRequest, Payment3dResponse, PaymentAuthorizationRequest, PaymentAuthorizationResponse, PaymentInquiryRequest, PaymentInquiryResponse, SaveCardWithoutTransactionRequest, SaveCardWithoutTransactionResponse, TransactionData } from './interfaces';
export declare class UnitedPayment {
    private httpClient;
    private hashPassword;
    constructor(baseUrl: string, token: string, hashPassword: string);
    private calculateHash;
    authorizePaymentIFrame(request: PaymentAuthorizationRequest): Promise<PaymentAuthorizationResponse>;
    noneSecurePayment(request: PaymentAuthorizationRequest): Promise<PaymentAuthorizationResponse>;
    Payment3d(request: Payment3dRequest): Promise<Payment3dResponse>;
    paymentInquiry(request: PaymentInquiryRequest): Promise<PaymentInquiryResponse>;
    getCommissionSale(): Promise<CommissionResponse[]>;
    getCommissionInstall(): Promise<CommissionInstallResponse[]>;
    getBinListWithId(bin: string): Promise<BinListResponse[]>;
    saveCardWithoutTransaction(request: SaveCardWithoutTransactionRequest): Promise<SaveCardWithoutTransactionResponse>;
    getTransactionList(merchantId: number, orderNo: string, txnTypeList: string[], cardMask: string, startDate: number, endDate: number, responseCode: string, txnStatus: string, authCode: string, customerId: string, page: number, pageSize: number, sortOrder: string, sortField: string): Promise<TransactionData[]>;
    getMerchantList(parentMerchantId: number, identityNumber: string, taxNumber: string, page: number, pageSize: number, sortOrder: string, sortField: string): Promise<MerchantData[]>;
    getBinList(): Promise<BinData[]>;
    cardCheckPoints(request: CardCheckPointsRequest): Promise<CardCheckPointsResponse>;
    cancelOrRefund(request: IptalIadeServisiRequest): Promise<IptalIadeServisiResponse>;
    ManuelPayment(paymentRequest: PaymentRequest): Promise<PaymentResponse>;
    commissionInquiry(request: CommissionInquiryRequest): Promise<CommissionInquiryResponse>;
    installmentInquiry(merchantId: number, bin: string, txnType: string): Promise<InstallmentInquiryResponse>;
    getCardList(memberId: number, merchantId: string, customerId: string, userCode: string, rnd: string, hash: string): Promise<Card[]>;
    getCustomerCards(memberId: number, merchantId: number, customerId: string): Promise<CustomerCard[]>;
    deleteCustomerCard(request: DeleteCustomerCardRequest): Promise<DeleteCustomerCardResponse>;
    orderInquiry(request: OrderInquiryRequest): Promise<OrderInquiryResponse>;
}
