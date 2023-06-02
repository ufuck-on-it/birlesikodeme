### Example

The following example demonstrates how to use the `UnitedPayment` class to authenticate and perform operations using the United Payment API.

```javascript
(async () => {
  // Create an instance of UnitedPaymentAuthentication
  const authentication = new UnitedPaymentAuthentication('https://ppgsecurity-test.birlesikodeme.com:55002');

  // Authenticate the merchant and obtain the authentication token
  const token = await authentication.authenticate('', '', 'TR');

  // Create an instance of UnitedPayment with the authentication token
  const unitedPayment = new UnitedPayment('https://ppgpayment-test.birlesikodeme.com:20000', token, '');

  // Get the list of BINs
  console.log(await unitedPayment.getBinList());
})();
```

This example demonstrates the following steps:

1. Create an instance of `UnitedPaymentAuthentication` by providing the base URL for the authentication endpoint.
2. Use the `authenticate` method to authenticate the merchant with the provided email, password, and language.
3. Obtain the authentication token.
4. Create an instance of `UnitedPayment` by providing the base URL for the payment endpoint and the authentication token.
5. Use the `getBinList` method to retrieve the list of BINs.
6. Print the list of BINs to the console.

Please note that in the example, the email and password values are empty strings. You need to provide valid credentials for successful authentication. Additionally, make sure to replace the base URLs with the actual URLs of the United Payment API endpoints.

## UnitedPaymentAuthentication Class

### Constructor

#### UnitedPaymentAuthentication(baseUrl: string)

Creates an instance of the UnitedPaymentAuthentication class.

##### Parameters

- `baseUrl`: A string representing the base URL of the API.

### authenticate(email: string, password: string, lang: 'TR' | 'EN'): Promise&lt;string&gt;

Authenticates the merchant and returns an authentication token.

##### Parameters

- `email`: A string representing the email of the merchant.
- `password`: A string representing the password of the merchant.
- `lang`: A string representing the language (TR or EN) for the authentication request.

##### Returns

A Promise that resolves to a string representing the authentication token.

## UnitedPayment Class

### Constructor

#### UnitedPayment(baseUrl: string, token: string, hashPassword: string)

Creates an instance of the UnitedPayment class.

##### Parameters

- `baseUrl`: A string representing the base URL of the API.
- `token`: A string representing the authentication token.
- `hashPassword`: A string representing the hash password for calculating the hash.

### authorizePaymentIFrame(request: PaymentAuthorizationRequest): Promise&lt;PaymentAuthorizationResponse&gt;

Authorizes a payment and returns the payment authorization response.

##### Parameters

- `request`: An object of type PaymentAuthorizationRequest containing the payment authorization request details.

##### Returns

A Promise that resolves to an object of type PaymentAuthorizationResponse representing the payment authorization response.

### noneSecurePayment(request: PaymentAuthorizationRequest): Promise&lt;PaymentAuthorizationResponse&gt;

Performs a non-secure payment and returns the payment authorization response.

##### Parameters

- `request`: An object of type PaymentAuthorizationRequest containing the non-secure payment request details.

##### Returns

A Promise that resolves to an object of type PaymentAuthorizationResponse representing the payment authorization response.

### Payment3d(request: Payment3dRequest): Promise&lt;Payment3dResponse&gt;

Performs a 3D payment and returns the payment response.

##### Parameters

- `request`: An object of type Payment3dRequest containing the 3D payment request details.

##### Returns

A Promise that resolves to an object of type Payment3dResponse representing the payment response.

### paymentInquiry(request: PaymentInquiryRequest): Promise&lt;PaymentInquiryResponse&gt;

Performs a payment inquiry and returns the payment inquiry response.

##### Parameters

- `request`: An object of type PaymentInquiryRequest containing the payment inquiry request details.

##### Returns

A Promise that resolves to an object of type PaymentInquiryResponse representing the payment inquiry response.

### getCommissionSale(): Promise&lt;CommissionResponse[]&gt;

Retrieves the commission sale data.

##### Returns

A Promise that resolves to an array of objects of type CommissionResponse representing the commission sale data.

### getCommissionInstall(): Promise&lt;CommissionInstallResponse[]&gt;

Retrieves the installment commission data.

##### Returns

A Promise that resolves to an array of objects of type CommissionInstallResponse representing the installment commission data.

### getBinListWithId(bin: string): Promise&lt;BinListResponse[]&gt;

Retrieves the BIN (Bank Identification Number) list based on the given BIN.

##### Parameters

- `bin`: A string representing the BIN for which the BIN list is requested.

##### Returns

A Promise that resolves to an array of objects of type BinListResponse representing the BIN list.

### saveCardWithoutTransaction(request: SaveCardWithoutTransactionRequest): Promise&lt;SaveCardWithoutTransactionResponse&gt;

Saves a card without performing a transaction and returns the response.

##### Parameters

- `request`: An object of type SaveCardWithoutTransactionRequest containing the request details for saving the card.

##### Returns

A Promise that resolves to an object of type SaveCardWithout

TransactionResponse representing the response.

### getTransactionList(merchantId: number, orderNo: string, txnTypeList: string[], cardMask: string, startDate: number, endDate: number, responseCode: string, txnStatus: string, authCode: string, customerId: string, page: number, pageSize: number, sortOrder: string, sortField: string): Promise&lt;TransactionData[]&gt;

Retrieves a list of transactions based on the provided filters.

##### Parameters

- `merchantId`: A number representing the merchant ID.
- `orderNo`: A string representing the order number.
- `txnTypeList`: An array of strings representing the transaction types.
- `cardMask`: A string representing the card mask.
- `startDate`: A number representing the start date of the transaction.
- `endDate`: A number representing the end date of the transaction.
- `responseCode`: A string representing the response code.
- `txnStatus`: A string representing the transaction status.
- `authCode`: A string representing the authorization code.
- `customerId`: A string representing the customer ID.
- `page`: A number representing the page number.
- `pageSize`: A number representing the page size.
- `sortOrder`: A string representing the sort order.
- `sortField`: A string representing the sort field.

##### Returns

A Promise that resolves to an array of objects of type TransactionData representing the list of transactions.

### getMerchantList(parentMerchantId: number, identityNumber: string, taxNumber: string, page: number, pageSize: number, sortOrder: string, sortField: string): Promise&lt;MerchantData[]&gt;

Retrieves a list of merchants based on the provided filters.

##### Parameters

- `parentMerchantId`: A number representing the parent merchant ID.
- `identityNumber`: A string representing the identity number.
- `taxNumber`: A string representing the tax number.
- `page`: A number representing the page number.
- `pageSize`: A number representing the page size.
- `sortOrder`: A string representing the sort order.
- `sortField`: A string representing the sort field.

##### Returns

A Promise that resolves to an array of objects of type MerchantData representing the list of merchants.

### getBinList(): Promise&lt;BinData[]&gt;

Retrieves the list of BINs (Bank Identification Numbers).

##### Returns

A Promise that resolves to an array of objects of type BinData representing the list of BINs.

### cardCheckPoints(request: CardCheckPointsRequest): Promise&lt;CardCheckPointsResponse&gt;

Checks the card points and returns the response.

##### Parameters

- `request`: An object of type CardCheckPointsRequest containing the request details for checking the card points.

##### Returns

A Promise that resolves to an object of type CardCheckPointsResponse representing the response.

### cancelOrRefund(request: IptalIadeServisiRequest): Promise&lt;IptalIadeServisiResponse&gt;

Performs a cancel or refund operation and returns the response.

##### Parameters

- `request`: An object of type IptalIadeServisiRequest containing the request details for the cancel or refund operation.

##### Returns

A Promise that resolves to an object of type IptalIadeServisiResponse representing the response.

### ManuelPayment(paymentRequest: PaymentRequest): Promise&lt;PaymentResponse&gt;

Performs a manual payment and returns the response.

##### Parameters

- `paymentRequest`: An object of type PaymentRequest containing the request details for the manual payment.

##### Returns

A Promise that resolves to an object of type PaymentResponse representing the response.

### commissionInquiry(request: CommissionInquiryRequest): Promise&lt;CommissionInquiryResponse&gt

;

Performs a commission inquiry and returns the response.

##### Parameters

- `request`: An object of type CommissionInquiryRequest containing the request details for the commission inquiry.

##### Returns

A Promise that resolves to an object of type CommissionInquiryResponse representing the response.

### installmentInquiry(merchantId: number, bin: string, txnType: string): Promise&lt;InstallmentInquiryResponse&gt;

Performs an installment inquiry and returns the response.

##### Parameters

- `merchantId`: A number representing the merchant ID.
- `bin`: A string representing the BIN (Bank Identification Number).
- `txnType`: A string representing the transaction type.

##### Returns

A Promise that resolves to an object of type InstallmentInquiryResponse representing the response.

### getCardList(memberId: number, merchantId: string, customerId: string, userCode: string, rnd: string, hash: string): Promise&lt;Card[]&gt;

Retrieves the list of cards associated with a customer.

##### Parameters

- `memberId`: A number representing the member ID.
- `merchantId`: A string representing the merchant ID.
- `customerId`: A string representing the customer ID.
- `userCode`: A string representing the user code.
- `rnd`: A string representing the random number.
- `hash`: A string representing the hash.

##### Returns

A Promise that resolves to an array of objects of type Card representing the list of cards.

### getCustomerCards(memberId: number, merchantId: number, customerId: string): Promise&lt;CustomerCard[]&gt;

Retrieves the list of customer cards.

##### Parameters

- `memberId`: A number representing the member ID.
- `merchantId`: A number representing the merchant ID.
- `customerId`: A string representing the customer ID.

##### Returns

A Promise that resolves to an array of objects of type CustomerCard representing the list of customer cards.

### deleteCustomerCard(request: DeleteCustomerCardRequest): Promise&lt;DeleteCustomerCardResponse&gt;

Deletes a customer card and returns the response.

##### Parameters

- `request`: An object of type DeleteCustomerCardRequest containing the request details for deleting the customer card.

##### Returns

A Promise that resolves to an object of type DeleteCustomerCardResponse representing the response.

### orderInquiry(request: OrderInquiryRequest): Promise&lt;OrderInquiryResponse&gt;

Performs an order inquiry and returns the response.

##### Parameters

- `request`: An object of type OrderInquiryRequest containing the request details for the order inquiry.

##### Returns

A Promise that resolves to an object of type OrderInquiryResponse representing the response.
