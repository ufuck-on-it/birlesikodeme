import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { createHash } from 'crypto'
import { BinData, BinListResponse, Card, CardCheckPointsRequest, CardCheckPointsResponse, CardListResponse, CommissionInquiryRequest, CommissionInquiryResponse, CommissionInstallResponse, CommissionResponse, CustomerCard, CustomerCardsResponse, DeleteCustomerCardRequest, DeleteCustomerCardResponse, InstallmentInquiryResponse, IptalIadeServisiRequest, IptalIadeServisiResponse, MerchantData, MerchantListResponse, OrderInquiryRequest, OrderInquiryResponse, Payment3dRequest, Payment3dResponse, PaymentAuthorizationRequest, PaymentAuthorizationResponse, PaymentInquiryRequest, PaymentInquiryResponse, SaveCardWithoutTransactionRequest, SaveCardWithoutTransactionResponse, TransactionData, TransactionListResponse } from './interfaces'

class BirlesikOdeme {
	private httpClient: AxiosInstance
	private hashPassword: unknown
	constructor(baseUrl: string, password: string, lang: 'TR' | 'EN', email: string, hashPassword: string) {
		this.httpClient = axios.create({
			baseURL: baseUrl,
			headers: {
				'Content-Type': 'application/json',
			},
		})

		this.authenticate(password, lang, email).catch((error) => console.error('Authentication failed:', error))
	}

	private calculateHash(data: string): string {
		const hash = createHash('sha512')
		hash.update(data, 'utf16le')
		return hash.digest('hex')
	}

	private async authenticate(password: string, lang: string, email: string): Promise<void> {
		try {
			const response = await this.httpClient.post('/api/ppg/Securities/authenticationMerchant', {
				password,
				lang,
				email,
			})

			const { fail, statusCode, result, token } = response.data
			if (fail || statusCode !== 200 || !result || !token) {
				throw new Error('Authentication failed')
			}

			this.httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
		} catch (error) {
			console.error('Authentication failed:', error)
			throw error
		}
	}
	public async authorizePaymentIFrame(request: PaymentAuthorizationRequest): Promise<PaymentAuthorizationResponse> {
		try {
			// HASH hesaplama
			const calculatedHash = this.calculateHash(`${this.hashPassword}+${request.userCode}+${request.rnd}+${request.txnType}+${request.totalAmount}+
            ${request.customerId}+${request.orderId}+${request.okUrl}+${request.failUrl}`)

			request.hash = calculatedHash

			const response = await this.httpClient.post<PaymentAuthorizationResponse>('/api/ppg/Payment/Payment', request)
			const data = response.data

			if (!data || data.responseCode !== '00') {
				throw new Error('Payment authorization failed')
			}

			return data
		} catch (error) {
			console.error('Payment authorization failed:', error)
			throw error
		}
	}

	public async noneSecurePayment(request: PaymentAuthorizationRequest): Promise<PaymentAuthorizationResponse> {
		try {
			// HASH hesaplama
			request.hash = this.calculateHash(`${this.hashPassword}+${request.userCode}+${request.rnd}+${request.txnType}+${request.totalAmount}+${request.customerId}+${request.orderId}`)

			const response = await this.httpClient.post<PaymentAuthorizationResponse>('/api/ppg/Payment/NoneSecurePayment', request);
			const data = response.data;

			if (!data || data.responseCode !== '00') {
				throw new Error('Payment authorization failed');
			}

			return data;
		} catch (error) {
			console.error('Payment authorization failed:', error);
			throw error;
		}
	}

	public async Payment3d(request: Payment3dRequest): Promise<Payment3dResponse> {
		try {
			// HASH hesaplama
			request.hash = this.calculateHash(`${this.hashPassword}+${request.userCode}+${request.rnd}+${request.txnType}+${request.totalAmount}+${request.customerId}+${request.orderId}+${request.okUrl}+${request.failUrl}`)

			const response = await this.httpClient.post<Payment3dResponse>('/api/ppg/Payment/Payment3d', request);
			const data = response.data;

			if (!data || data.responseCode !== '00') {
				throw new Error('Payment authorization failed');
			}

			return data;
		} catch (error) {
			console.error('Payment authorization failed:', error);
			throw error;
		}
	}

	public async paymentInquiry(request: PaymentInquiryRequest): Promise<PaymentInquiryResponse> {
		try {
			// HASH hesaplama
			request.hash = this.calculateHash(`${this.hashPassword}+${request.rnd}+${request.orderNo}+${request.totalAmount}`)

			const response = await this.httpClient.post<PaymentInquiryResponse>('/api/ppg/Payment/PaymentInquiry', request);
			const data = response.data;

			if (!data || data.responseCode !== '00') {
				throw new Error('Payment inquiry failed');
			}

			return data;
		} catch (error) {
			console.error('Payment inquiry failed:', error);
			throw error;
		}
	}

	public async getCommissionSale(): Promise<CommissionResponse[]> {
		try {
			const response = await this.httpClient.get<CommissionResponse[]>('/api/ppg/Payment/GetCommissionSale');
			const data = response.data;

			if (!data) {
				throw new Error('Failed to fetch commission sale');
			}

			return data;
		} catch (error) {
			console.error('Failed to fetch commission sale:', error);
			throw error;
		}
	}

	public async getCommissionInstall(): Promise<CommissionInstallResponse[]> {
		try {
			const response = await this.httpClient.get<CommissionInstallResponse[]>('/api/ppg/Payment/GetCommissionInstall');
			const data = response.data;

			if (!data) {
				throw new Error('Failed to fetch commission install');
			}

			return data;
		} catch (error) {
			console.error('Failed to fetch commission install:', error);
			throw error;
		}
	}

	async getBinListWithId(bin: string): Promise<BinListResponse[]> {
		try {
			const response = await this.httpClient.get<BinListResponse[]>(`/api/ppg/Payment/BinList/${bin}`);
			const data = response.data;

			if (!data) {
				throw new Error('Failed to fetch BIN list');
			}

			return data;
		} catch (error) {
			console.error('Failed to fetch BIN list:', error);
			throw error;
		}
	}


	async saveCardWithoutTransaction(request: SaveCardWithoutTransactionRequest): Promise<SaveCardWithoutTransactionResponse> {
		try {
			const response = await this.httpClient.post<SaveCardWithoutTransactionResponse>('/api/ppg/Payment/SaveCardWithoutTransaction', request);
			const data = response.data;

			if (!data) {
				throw new Error('Failed to save card without transaction');
			}

			return data;
		} catch (error) {
			console.error('Failed to save card without transaction:', error);
			throw error;
		}
	}

	public async getTransactionList(
		merchantId: number,
		orderNo: string,
		txnTypeList: string[],
		cardMask: string,
		startDate: number,
		endDate: number,
		responseCode: string,
		txnStatus: string,
		authCode: string,
		customerId: string,
		page: number,
		pageSize: number,
		sortOrder: string,
		sortField: string
	): Promise<TransactionData[]> {
		try {
			const request = {
				merchantId,
				orderNo,
				txnTypeList,
				cardMask,
				startDate,
				endDate,
				responseCode,
				txnStatus,
				authCode,
				customerId,
				pageOptions: {
					page,
					pageSize,
					sortOrder,
					sortField
				}
			};

			const response = await this.httpClient.post<TransactionListResponse>('/api/ppg/Payment/GetTransactionList', request);
			const data = response.data;

			if (!data || data.fail) {
				throw new Error('Failed to get transaction list');
			}

			return data.result.data;
		} catch (error) {
			console.error('Failed to get transaction list:', error);
			throw error;
		}
	}

	public async getMerchantList(
		parentMerchantId: number,
		identityNumber: string,
		taxNumber: string,
		page: number,
		pageSize: number,
		sortOrder: string,
		sortField: string
	): Promise<MerchantData[]> {
		try {
			const request = {
				parentMerchantId,
				identityNumber,
				taxNumber,
				pageOptions: {
					page,
					pageSize,
					sortOrder,
					sortField
				}
			};

			const response = await this.httpClient.post<MerchantListResponse>('/api/ppg/Payment/GetMerchantList', request);
			const data = response.data;

			if (!data || data.fail) {
				throw new Error('Failed to get merchant list');
			}

			return data.result.data;
		} catch (error) {
			console.error('Failed to get merchant list:', error);
			throw error;
		}
	}

	public async getBinList(): Promise<BinData[]> {
		try {
			const response = await this.httpClient.get<BinData[]>('/api/ppg/Payment/BinList');
			const data = response.data;

			if (!data) {
				throw new Error('Failed to get BIN list');
			}

			return data;
		} catch (error) {
			console.error('Failed to get BIN list:', error);
			throw error;
		}
	}

	public async cardCheckPoints(request: CardCheckPointsRequest): Promise<CardCheckPointsResponse> {
		try {
			const response = await this.httpClient.post<CardCheckPointsResponse>('/api/ppg/Payment/CardCheckPoints', request);
			const data = response.data;

			if (!data) {
				throw new Error('Failed to check card points');
			}

			return data;
		} catch (error) {
			console.error('Failed to check card points:', error);
			throw error;
		}
	}

	public async cancelOrRefund(request: IptalIadeServisiRequest): Promise<IptalIadeServisiResponse> {
		try {
			request.hash = this.calculateHash(
				`${this.hashPassword}${request.userCode}${request.rnd}${request.txnType}${request.totalAmount}${request.customerId}${request.orderId}${request.okUrl}${request.failUrl}`
			);

			const response = await this.httpClient.post<IptalIadeServisiResponse>(`/api/ppg/Payment/Payment`, request);
			const data = response.data;

			if (!data) {
				throw new Error('Failed to cancel or refund');
			}

			return data;
		} catch (error) {
			console.error('Failed to cancel or refund:', error);
			throw error;
		}
	}

	async ManuelPayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
		try {
			const response = await this.httpClient.post<PaymentResponse>('/api/ppg/Payment/CardCheckPoints', paymentRequest);
			const data = response.data;

			if (!data) {
				throw new Error('Failed to check card points');
			}

			return data;
		} catch (error) {
			console.error('Failed to check card points:', error);
			throw error;
		}
	}

	public async commissionInquiry(request: CommissionInquiryRequest): Promise<CommissionInquiryResponse> {
		try {
			const response = await this.httpClient.post<CommissionInquiryResponse>('/api/ppg/Payment/CommissionInquiry', request);
			const data = response.data;

			if (!data || !data.hasCommissionInfo) {
				throw new Error('Commission inquiry failed');
			}

			return data;
		} catch (error) {
			console.error('Commission inquiry failed:', error);
			throw error;
		}
	}

	public async installmentInquiry(merchantId: number, bin: string, txnType: string): Promise<InstallmentInquiryResponse> {
		try {
			const response = await this.httpClient.get<InstallmentInquiryResponse>(`/api/ppg/Payment/HasInstallment/${merchantId}/${bin}/${txnType}`);
			const data = response.data;

			if (!data) {
				throw new Error('Installment inquiry failed');
			}

			return data;
		} catch (error) {
			console.error('Installment inquiry failed:', error);
			throw error;
		}
	}

	public async getCardList(memberId: number, merchantId: string, customerId: string, userCode: string, rnd: string, hash: string): Promise<Card[]> {
		try {
			const calcHash = this.calculateHash(`${this.hashPassword}+${userCode}+${rnd}+${customerId}`)
			const request = {
				memberId,
				merchantId,
				customerId,
				userCode,
				rnd,
				hash: calcHash
			};

			const response = await this.httpClient.post<CardListResponse>('/api/ppg/Payment/Cardlist', request);
			const data = response.data;

			if (!data || data.fail) {
				throw new Error('Failed to get card list');
			}

			return data.result;
		} catch (error) {
			console.error('Failed to get card list:', error);
			throw error;
		}
	}

	public async getCustomerCards(memberId: number, merchantId: number, customerId: string): Promise<CustomerCard[]> {
		try {
			const response = await this.httpClient.get<CustomerCardsResponse>(`/api/ppg/Payment/GetCustomerCards/${memberId}/${merchantId}/${customerId}`);
			const data = response.data;

			if (!data || !data.customerCards) {
				throw new Error('Failed to get customer cards');
			}

			return data.customerCards;
		} catch (error) {
			console.error('Failed to get customer cards:', error);
			throw error;
		}
	}

	public async deleteCustomerCard(request: DeleteCustomerCardRequest): Promise<DeleteCustomerCardResponse> {
		try {
			const response = await this.httpClient.put<DeleteCustomerCardResponse>('/api/ppg/Payment/DeleteCustomerCard', request);
			const data = response.data;

			if (!data || !data.isSucceed) {
				throw new Error('Failed to delete customer card');
			}

			return data;
		} catch (error) {
			console.error('Failed to delete customer card:', error);
			throw error;
		}
	}

	public async orderInquiry(request: OrderInquiryRequest): Promise<OrderInquiryResponse> {
		try {
			request.hash = this.calculateHash(`${this.hashPassword}+${request.orderNo}+${request.rnd}`)
			const response = await this.httpClient.post<OrderInquiryResponse>('/api/ppg/Payment/OrderInquiry', request);
			const data = response.data;

			if (!data || data.fail) {
				throw new Error('Failed to inquire order');
			}

			return data;
		} catch (error) {
			console.error('Failed to inquire order:', error);
			throw error;
		}
	}

}

export default BirlesikOdeme
