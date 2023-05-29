export interface AuthenticationMerchant {
    fail: boolean;
    statusCode: number;
    result: {
        userId: string;
        token: string;
    };
    count: string;
    errorCode: string;
    errorDescription: string;
}
