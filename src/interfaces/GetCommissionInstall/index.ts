interface CommonResponseParams {
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

export interface CommissionSaleResponse {
  fail: boolean;
  statusCode: number;
  result: CommonResponseParams[];
}

export interface CommissionInstallResponse {
  fail: boolean;
  statusCode: number;
  result: (CommonResponseParams & {
    installmentCount: number;
    installmentReleaseType: string;
  })[];
}
