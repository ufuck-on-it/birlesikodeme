import axios from 'axios'
import {Lang} from './enums'
import {AuthenticationMerchant} from './interfaces/authentication.merchant'

export class BirlesikOdeme {
	private testUrl = 'https://ppgpayment-test.birlesikodeme.com:20000/api/ppg'
	token = ''
	userId = ''

	constructor(
		private readonly email: string,
		private readonly password: string,
		private readonly lang: Lang,
		private readonly baseUrl?: string
	) {
		this.authenticationMerchant()
	}

	public async authenticationMerchant() {
		try {
			const response = await axios.post(this.baseUrl ?? this.testUrl, {
				password: this.password,
				lang: this.lang,
				email: this.email,
			})

			const responseData: AuthenticationMerchant = response.data

			if (responseData.fail || responseData.statusCode !== 200) {
				throw new Error(JSON.stringify(responseData))
			}

			this.token = responseData.result.token
			this.userId = responseData.result.userId
		} catch (error) {
			throw new Error(JSON.stringify(error))
		}
	}
}
