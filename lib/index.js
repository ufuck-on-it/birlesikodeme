"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var crypto_1 = require("crypto");
var BirlesikOdeme = /** @class */ (function () {
    function BirlesikOdeme(baseUrl, password, lang, email, hashPassword) {
        this.httpClient = axios_1.default.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.authenticate(password, lang, email).catch(function (error) { return console.error('Authentication failed:', error); });
    }
    BirlesikOdeme.prototype.calculateHash = function (data) {
        var hash = (0, crypto_1.createHash)('sha512');
        hash.update(data, 'utf16le');
        return hash.digest('hex');
    };
    BirlesikOdeme.prototype.authenticate = function (password, lang, email) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, fail_1, statusCode, result, token, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.post('/api/ppg/Securities/authenticationMerchant', {
                                password: password,
                                lang: lang,
                                email: email,
                            })];
                    case 1:
                        response = _b.sent();
                        _a = response.data, fail_1 = _a.fail, statusCode = _a.statusCode, result = _a.result, token = _a.token;
                        if (fail_1 || statusCode !== 200 || !result || !token) {
                            throw new Error('Authentication failed');
                        }
                        this.httpClient.defaults.headers.common['Authorization'] = "Bearer ".concat(token);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.error('Authentication failed:', error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.authorizePaymentIFrame = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var calculatedHash, response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        calculatedHash = this.calculateHash("".concat(this.hashPassword, "+").concat(request.userCode, "+").concat(request.rnd, "+").concat(request.txnType, "+").concat(request.totalAmount, "+\n            ").concat(request.customerId, "+").concat(request.orderId, "+").concat(request.okUrl, "+").concat(request.failUrl));
                        request.hash = calculatedHash;
                        return [4 /*yield*/, this.httpClient.post('/api/ppg/Payment/Payment', request)];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data || data.responseCode !== '00') {
                            throw new Error('Payment authorization failed');
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Payment authorization failed:', error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.noneSecurePayment = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // HASH hesaplama
                        request.hash = this.calculateHash("".concat(this.hashPassword, "+").concat(request.userCode, "+").concat(request.rnd, "+").concat(request.txnType, "+").concat(request.totalAmount, "+").concat(request.customerId, "+").concat(request.orderId));
                        return [4 /*yield*/, this.httpClient.post('/api/ppg/Payment/NoneSecurePayment', request)];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data || data.responseCode !== '00') {
                            throw new Error('Payment authorization failed');
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Payment authorization failed:', error_3);
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.Payment3d = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // HASH hesaplama
                        request.hash = this.calculateHash("".concat(this.hashPassword, "+").concat(request.userCode, "+").concat(request.rnd, "+").concat(request.txnType, "+").concat(request.totalAmount, "+").concat(request.customerId, "+").concat(request.orderId, "+").concat(request.okUrl, "+").concat(request.failUrl));
                        return [4 /*yield*/, this.httpClient.post('/api/ppg/Payment/Payment3d', request)];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data || data.responseCode !== '00') {
                            throw new Error('Payment authorization failed');
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_4 = _a.sent();
                        console.error('Payment authorization failed:', error_4);
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.paymentInquiry = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // HASH hesaplama
                        request.hash = this.calculateHash("".concat(this.hashPassword, "+").concat(request.rnd, "+").concat(request.orderNo, "+").concat(request.totalAmount));
                        return [4 /*yield*/, this.httpClient.post('/api/ppg/Payment/PaymentInquiry', request)];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data || data.responseCode !== '00') {
                            throw new Error('Payment inquiry failed');
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_5 = _a.sent();
                        console.error('Payment inquiry failed:', error_5);
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.getCommissionSale = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get('/api/ppg/Payment/GetCommissionSale')];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data) {
                            throw new Error('Failed to fetch commission sale');
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_6 = _a.sent();
                        console.error('Failed to fetch commission sale:', error_6);
                        throw error_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.getCommissionInstall = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get('/api/ppg/Payment/GetCommissionInstall')];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data) {
                            throw new Error('Failed to fetch commission install');
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_7 = _a.sent();
                        console.error('Failed to fetch commission install:', error_7);
                        throw error_7;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.getBinListWithId = function (bin) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/api/ppg/Payment/BinList/".concat(bin))];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data) {
                            throw new Error('Failed to fetch BIN list');
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_8 = _a.sent();
                        console.error('Failed to fetch BIN list:', error_8);
                        throw error_8;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.saveCardWithoutTransaction = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.post('/api/ppg/Payment/SaveCardWithoutTransaction', request)];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data) {
                            throw new Error('Failed to save card without transaction');
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_9 = _a.sent();
                        console.error('Failed to save card without transaction:', error_9);
                        throw error_9;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.getTransactionList = function (merchantId, orderNo, txnTypeList, cardMask, startDate, endDate, responseCode, txnStatus, authCode, customerId, page, pageSize, sortOrder, sortField) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, data, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        request = {
                            merchantId: merchantId,
                            orderNo: orderNo,
                            txnTypeList: txnTypeList,
                            cardMask: cardMask,
                            startDate: startDate,
                            endDate: endDate,
                            responseCode: responseCode,
                            txnStatus: txnStatus,
                            authCode: authCode,
                            customerId: customerId,
                            pageOptions: {
                                page: page,
                                pageSize: pageSize,
                                sortOrder: sortOrder,
                                sortField: sortField
                            }
                        };
                        return [4 /*yield*/, this.httpClient.post('/api/ppg/Payment/GetTransactionList', request)];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data || data.fail) {
                            throw new Error('Failed to get transaction list');
                        }
                        return [2 /*return*/, data.result.data];
                    case 2:
                        error_10 = _a.sent();
                        console.error('Failed to get transaction list:', error_10);
                        throw error_10;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.getMerchantList = function (parentMerchantId, identityNumber, taxNumber, page, pageSize, sortOrder, sortField) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, data, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        request = {
                            parentMerchantId: parentMerchantId,
                            identityNumber: identityNumber,
                            taxNumber: taxNumber,
                            pageOptions: {
                                page: page,
                                pageSize: pageSize,
                                sortOrder: sortOrder,
                                sortField: sortField
                            }
                        };
                        return [4 /*yield*/, this.httpClient.post('/api/ppg/Payment/GetMerchantList', request)];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data || data.fail) {
                            throw new Error('Failed to get merchant list');
                        }
                        return [2 /*return*/, data.result.data];
                    case 2:
                        error_11 = _a.sent();
                        console.error('Failed to get merchant list:', error_11);
                        throw error_11;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.getBinList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get('/api/ppg/Payment/BinList')];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data) {
                            throw new Error('Failed to get BIN list');
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_12 = _a.sent();
                        console.error('Failed to get BIN list:', error_12);
                        throw error_12;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.cardCheckPoints = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.post('/api/ppg/Payment/CardCheckPoints', request)];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data) {
                            throw new Error('Failed to check card points');
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_13 = _a.sent();
                        console.error('Failed to check card points:', error_13);
                        throw error_13;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.cancelOrRefund = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        request.hash = this.calculateHash("".concat(this.hashPassword).concat(request.userCode).concat(request.rnd).concat(request.txnType).concat(request.totalAmount).concat(request.customerId).concat(request.orderId).concat(request.okUrl).concat(request.failUrl));
                        return [4 /*yield*/, this.httpClient.post("/api/ppg/Payment/Payment", request)];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data) {
                            throw new Error('Failed to cancel or refund');
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_14 = _a.sent();
                        console.error('Failed to cancel or refund:', error_14);
                        throw error_14;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.ManuelPayment = function (paymentRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.post('/api/ppg/Payment/CardCheckPoints', paymentRequest)];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data) {
                            throw new Error('Failed to check card points');
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_15 = _a.sent();
                        console.error('Failed to check card points:', error_15);
                        throw error_15;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.commissionInquiry = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.post('/api/ppg/Payment/CommissionInquiry', request)];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data || !data.hasCommissionInfo) {
                            throw new Error('Commission inquiry failed');
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_16 = _a.sent();
                        console.error('Commission inquiry failed:', error_16);
                        throw error_16;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.installmentInquiry = function (merchantId, bin, txnType) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/api/ppg/Payment/HasInstallment/".concat(merchantId, "/").concat(bin, "/").concat(txnType))];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data) {
                            throw new Error('Installment inquiry failed');
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_17 = _a.sent();
                        console.error('Installment inquiry failed:', error_17);
                        throw error_17;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.getCardList = function (memberId, merchantId, customerId, userCode, rnd, hash) {
        return __awaiter(this, void 0, void 0, function () {
            var calcHash, request, response, data, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        calcHash = this.calculateHash("".concat(this.hashPassword, "+").concat(userCode, "+").concat(rnd, "+").concat(customerId));
                        request = {
                            memberId: memberId,
                            merchantId: merchantId,
                            customerId: customerId,
                            userCode: userCode,
                            rnd: rnd,
                            hash: calcHash
                        };
                        return [4 /*yield*/, this.httpClient.post('/api/ppg/Payment/Cardlist', request)];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data || data.fail) {
                            throw new Error('Failed to get card list');
                        }
                        return [2 /*return*/, data.result];
                    case 2:
                        error_18 = _a.sent();
                        console.error('Failed to get card list:', error_18);
                        throw error_18;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.getCustomerCards = function (memberId, merchantId, customerId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/api/ppg/Payment/GetCustomerCards/".concat(memberId, "/").concat(merchantId, "/").concat(customerId))];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data || !data.customerCards) {
                            throw new Error('Failed to get customer cards');
                        }
                        return [2 /*return*/, data.customerCards];
                    case 2:
                        error_19 = _a.sent();
                        console.error('Failed to get customer cards:', error_19);
                        throw error_19;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.deleteCustomerCard = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.put('/api/ppg/Payment/DeleteCustomerCard', request)];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data || !data.isSucceed) {
                            throw new Error('Failed to delete customer card');
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_20 = _a.sent();
                        console.error('Failed to delete customer card:', error_20);
                        throw error_20;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BirlesikOdeme.prototype.orderInquiry = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        request.hash = this.calculateHash("".concat(this.hashPassword, "+").concat(request.orderNo, "+").concat(request.rnd));
                        return [4 /*yield*/, this.httpClient.post('/api/ppg/Payment/OrderInquiry', request)];
                    case 1:
                        response = _a.sent();
                        data = response.data;
                        if (!data || data.fail) {
                            throw new Error('Failed to inquire order');
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_21 = _a.sent();
                        console.error('Failed to inquire order:', error_21);
                        throw error_21;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BirlesikOdeme;
}());
exports.default = BirlesikOdeme;
