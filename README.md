# BirlesikOdeme Class Documentation

The `BirlesikOdeme` class is a TypeScript class that provides a client for interacting with a payment gateway API. It allows users to perform various payment-related operations such as payment authorization, payment inquiry, commission inquiry, installment inquiry, card management, and more.

## Class: BirlesikOdeme

### Constructor

#### Parameters

- `baseUrl` (`string`): The base URL of the payment gateway API.
- `password` (`string`): The password for authentication.
- `lang` (`'TR' | 'EN'`): The language code for the API response (either 'TR' for Turkish or 'EN' for English).
- `email` (`string`): The email address for authentication.
- `hashPassword` (`string`): The hashed password for authentication.

#### Example

```typescript
const birlesikOdeme = new BirlesikOdeme(baseUrl, password, lang, email, hashPassword)
```

### Methods

#### authorizePaymentIFrame

Authorize a payment using an iframe.

##### Parameters

- `request` (`PaymentAuthorizationRequest`): The payment authorization request parameters.

##### Returns

- `Promise<PaymentAuthorizationResponse>`: A promise that resolves to the payment authorization response.

##### Example

```typescript
const request: PaymentAuthorizationRequest = {
	// request parameters
}

const response = await birlesikOdeme.authorizePaymentIFrame(request)
```

#### noneSecurePayment

Perform a non-secure payment.

##### Parameters

- `request` (`PaymentAuthorizationRequest`): The non-secure payment request parameters.

##### Returns

- `Promise<PaymentAuthorizationResponse>`: A promise that resolves to the non-secure payment response.

##### Example

```typescript
const request: PaymentAuthorizationRequest = {
	// request parameters
}

const response = await birlesikOdeme.noneSecurePayment(request)
```

#### Payment3d

Perform a 3D payment.

##### Parameters

- `request` (`Payment3dRequest`): The 3D payment request parameters.

##### Returns

- `Promise<Payment3dResponse>`: A promise that resolves to the 3D payment response.

##### Example

```typescript
const request: Payment3dRequest = {
	// request parameters
}

const response = await birlesikOdeme.Payment3d(request)
```

#### paymentInquiry

Inquire about a payment.

##### Parameters

- `request` (`PaymentInquiryRequest`): The payment inquiry request parameters.

##### Returns

- `Promise<PaymentInquiryResponse>`: A promise that resolves to the payment inquiry response.

##### Example

```typescript
const request: PaymentInquiryRequest = {
	// request parameters
}

const response = await birlesikOdeme.paymentInquiry(request)
```

#### getCommissionSale

Get commission sale information.

##### Returns

- `Promise<CommissionResponse[]>`: A promise that resolves to an array of commission sale information.

##### Example

```typescript
const response = await birlesikOdeme.getCommissionSale()
```

#### getCommissionInstall

Get commission install information.

##### Returns

- `Promise<CommissionInstallResponse[]>`: A promise that resolves to an array of commission install information.

##### Example

```typescript
const response = await birlesikOdeme.getCommissionInstall()
```

#### getBinListWithId

Get BIN list with a specific ID.

##### Parameters

- `bin` (`string`): The BIN (Bank Identification Number) to search for.

##### Returns

- `Promise<BinListResponse[]>`: A promise that resolves to an array of BIN list responses.

##### Example

```typescript
const bin = '123456'
const response = await

birlesikOdeme.getBinListWithId(bin)
```

#### saveCardWithoutTransaction

Save a card without performing a transaction.

##### Parameters

- `request` (`SaveCardWithoutTransactionRequest`): The save card without transaction request parameters.

##### Returns

- `Promise<SaveCardWithoutTransactionResponse>`: A promise that resolves to the save card without transaction response.

##### Example

```typescript
const request: SaveCardWithoutTransactionRequest = {
	// request parameters
}

const response = await birlesikOdeme.saveCardWithoutTransaction(request)
```

#### getTransactionList

Get a list of transactions.

##### Parameters

- `merchantId` (`number`): The merchant ID.
- `orderNo` (`string`): The order number.
- `txnTypeList` (`string[]`): An array of transaction types.
- `cardMask` (`string`): The masked card number.
- `startDate` (`number`): The start date of the transaction.
- `endDate` (`number`): The end date of the transaction.
- `responseCode` (`string`): The response code of the transaction.
- `txnStatus` (`string`): The status of the transaction.
- `authCode` (`string`): The authorization code of the transaction.
- `customerId` (`string`): The customer ID.
- `page` (`number`): The page number.
- `pageSize` (`number`): The page size.
- `sortOrder` (`string`): The sort order.
- `sortField` (`string`): The sort field.

##### Returns

- `Promise<TransactionData[]>`: A promise that resolves to an array of transaction data.

##### Example

```typescript
const merchantId = 123
const orderNo = 'ABC123'
const txnTypeList = ['SALE']
const cardMask = '****1234'
const startDate = 1622400000000
const endDate = 1622499999999
const responseCode = '00'
const txnStatus = 'SUCCESS'
const authCode = '123456'
const customerId = 'CUST123'
const page = 1
const pageSize = 10
const sortOrder = 'ASC'
const sortField = 'date'

const transactions = await birlesikOdeme.getTransactionList(
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
	page,
	pageSize,
	sortOrder,
	sortField
)
```

#### getMerchantList

Get a list of merchants.

##### Parameters

- `parentMerchantId` (`number`): The parent merchant ID.
- `identityNumber` (`string`): The identity number.
- `taxNumber` (`string`): The tax number.
- `page` (`number`): The page number.
- `pageSize` (`number`): The page size.
- `sortOrder` (`string`): The sort order.
- `sortField` (`string`): The sort field.

##### Returns

- `Promise<MerchantData[]>`: A promise that resolves to an array of merchant data.

##### Example

```typescript
const parentMerchantId = 123
const identityNumber = '1234567890'
const taxNumber = '0987654321'
const page = 1
const pageSize = 10
const sortOrder = 'ASC'
const sortField = 'name'

const merchants = await birlesikOdeme.getMerchantList(
	parentMerchantId,
	identityNumber,
	taxNumber,
	page,
	pageSize,
	sortOrder,
	sortField
)
```

#### getBinList

Get the BIN list.

##### Returns

- `Promise<BinData[]>`: A promise that resolves to an array of BIN data.

##### Example

```typescript
const binList = await birlesikOdeme.getBinList()
```

#### cardCheckPoints

Check the points of a card.

##### Parameters

- `request` (`CardCheckPointsRequest`): The card check points request parameters.

##### Returns

- `Promise<CardCheckPointsResponse>`: A promise that resolves to the card check points response.

##### Example

```typescript
const request: CardCheckPointsRequest = {
	// request parameters
}

const response = await birlesikOdeme.cardCheckPoints(request)
```

#### cancelOrRefund

Cancel or refund a payment.

##### Parameters

- `request` (`IptalIadeServisiRequest`): The cancel or refund request parameters.

##### Returns

- `Promise<IptalIadeServisiResponse>`: A promise that resolves to the cancel or refund response.

##### Example

```typescript
const request: IptalIadeServisiRequest = {
	// request parameters
}

const response = await birlesikOdeme.cancelOrRefund(request)
```

#### ManuelPayment

Perform a manual payment.

##### Parameters

- `paymentRequest` (`PaymentRequest`): The manual payment request parameters.

##### Returns

- `Promise<PaymentResponse>`: A promise that resolves to the manual payment response.

##### Example

```typescript
const paymentRequest: PaymentRequest = {
	// request parameters
}

const response = await birlesikOdeme.ManuelPayment(paymentRequest)
```

#### commissionInquiry

Inquire about commission information.

##### Parameters

- `request` (`CommissionInquiryRequest`): The commission inquiry request parameters.

##### Returns

- `Promise<CommissionInquiryResponse>`: A promise that resolves to the commission inquiry response.

##### Example

```typescript
const request: CommissionInquiryRequest = {
	// request parameters
}

const response = await birlesikOdeme.commissionInquiry(request)
```

#### installmentInquiry

Inquire about installment information.

##### Parameters

- `merchantId` (`number`): The merchant ID.
- `bin` (`string`): The BIN (Bank Identification Number).
- `txnType` (`string`): The transaction type.

##### Returns

- `Promise<InstallmentInquiryResponse>`: A promise that resolves to the installment inquiry response.

##### Example

```typescript
const merchantId = 123
const bin = '123456'
const txnType = 'SALE'

const response = await birlesikOdeme.installmentInquiry(merchantId, bin, txnType)
```

#### getCardList

Get a list of cards.

##### Parameters

- `memberId` (`number`): The member ID.
- `merchantId` (`string`): The merchant ID.
- `customerId` (`string`): The customer ID.
- `userCode` (`string`): The user code.
- `rnd` (`string`): The random string.
- `hash` (`string`): The hash value.

##### Returns

- `Promise<Card[]>`: A promise that resolves to an array of cards.

##### Example

```typescript
const memberId = 123
const merchantId = 'MERCHANT123'
const customerId = 'CUSTOMER123'
const userCode = 'USER123'
const rnd = 'ABC123'
const hash = 'HASH123'

const cards = await birlesikOdeme.getCardList(memberId, merchantId, customerId, userCode, rnd, hash)
```

#### getCustomerCards

Get a list of customer cards.

##### Parameters

- `memberId` (`number`): The member ID.
- `merchant

Id` (`number`): The merchant ID.

- `customerId` (`string`): The customer ID.

##### Returns

- `Promise<CustomerCard[]>`: A promise that resolves to an array of customer cards.

##### Example

```typescript
const memberId = 123
const merchantId = 456
const customerId = 'CUSTOMER123'

const customerCards = await birlesikOdeme.getCustomerCards(memberId, merchantId, customerId)
```

#### deleteCustomerCard

Delete a customer card.

##### Parameters

- `request` (`DeleteCustomerCardRequest`): The delete customer card request parameters.

##### Returns

- `Promise<DeleteCustomerCardResponse>`: A promise that resolves to the delete customer card response.

##### Example

```typescript
const request: DeleteCustomerCardRequest = {
	// request parameters
}

const response = await birlesikOdeme.deleteCustomerCard(request)
```

#### orderInquiry

Inquire about an order.

##### Parameters

- `request` (`OrderInquiryRequest`): The order inquiry request parameters.

##### Returns

- `Promise<OrderInquiryResponse>`: A promise that resolves to the order inquiry response.

##### Example

```typescript
const request: OrderInquiryRequest = {
	// request parameters
}

const response = await birlesikOdeme.orderInquiry(request)
```

## Example Usage

```typescript
import BirlesikOdeme from './BirlesikOdeme'

// Initialize the BirlesikOdeme instance
const birlesikOdeme = new BirlesikOdeme(
	'https://api.payment-gateway.com',
	'password123',
	'EN',
	'example@example.com',
	'hashPassword123'
)

// Perform payment authorization
const authorizationRequest = {
	// request parameters
}

const authorizationResponse = await birlesikOdeme.authorizePaymentIFrame(authorizationRequest)
```
