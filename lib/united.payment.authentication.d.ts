export declare class UnitedPaymentAuthentication {
    private readonly httpClient;
    constructor(baseUrl: string);
    authenticate(email: string, password: string, lang: 'TR' | 'EN'): Promise<string>;
}
