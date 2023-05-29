import { Lang } from './enums';
export declare class BirlesikOdeme {
    private readonly email;
    private readonly password;
    private readonly lang;
    private readonly baseUrl?;
    private testUrl;
    token: string;
    userId: string;
    constructor(email: string, password: string, lang: Lang, baseUrl?: string | undefined);
    private authenticationMerchant;
}
