import axios, { AxiosInstance } from 'axios';

export class UnitedPaymentAuthentication {
  private readonly httpClient: AxiosInstance;

  constructor(baseUrl: string) {
    this.httpClient = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async authenticate(email: string, password: string, lang: 'TR' | 'EN'): Promise<string> {
    try {
      const response = await this.httpClient.post('/api/ppg/Securities/authenticationMerchant', {
        email,
        password,
        lang,
      });

      const { fail, statusCode, result } = response.data;

      if (fail || statusCode !== 200 || !result || !result.token) {
        throw new Error('Authentication failed. Invalid response from the server.');
      }

      return result.token;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw new Error('Authentication failed. Unable to authenticate merchant.');
    }
  }
}
