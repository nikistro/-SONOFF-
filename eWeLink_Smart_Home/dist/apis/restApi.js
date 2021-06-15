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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAuth = exports.getAuth = exports.registerService = exports.removeStates = exports.updateStates = exports.getStateByEntityId = void 0;
var axios_1 = __importDefault(require("axios"));
var AuthClass_1 = __importDefault(require("../class/AuthClass"));
var url_1 = require("../config/url");
var restRequest = axios_1.default.create({
    baseURL: url_1.HaRestURL,
    timeout: 5000,
});
restRequest.interceptors.request.use(function (val) {
    val.headers = {
        Authorization: "Bearer " + AuthClass_1.default.curAuth,
    };
    return val;
});
var restRequestWithoutAuth = axios_1.default.create({
    baseURL: url_1.HaRestURL,
});
var getStateByEntityId = function (entityId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, restRequest({
                method: 'GET',
                url: "/api/states/" + entityId,
            }).catch(function (e) {
                console.log('获取HA实体出错：', entityId);
            })];
    });
}); };
exports.getStateByEntityId = getStateByEntityId;
var updateStates = function (entityId, data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, restRequest({
                method: 'POST',
                url: "/api/states/" + entityId,
                data: data,
            }).catch(function (e) {
                console.log('更新设备到HA出错：', entityId, '\ndata: ', data);
            })];
    });
}); };
exports.updateStates = updateStates;
var removeStates = function (entityId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, restRequest({
                method: 'DELETE',
                url: "/api/states/" + entityId,
            }).catch(function (e) {
                console.log('删除HA实体出错：', entityId);
            })];
    });
}); };
exports.removeStates = removeStates;
var registerService = function (domain, service) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, restRequest({
                method: 'POST',
                url: "/api/events/service_registered",
                data: {
                    domain: domain,
                    service: service,
                },
            }).catch(function (e) {
                console.log('registerService error: ', domain, ':', service);
            })];
    });
}); };
exports.registerService = registerService;
var getAuth = function (clientId, code) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                res = restRequestWithoutAuth({
                    method: 'POST',
                    url: '/auth/token',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: "grant_type=authorization_code&client_id=" + clientId + "&code=" + code,
                });
                res.catch(function (e) {
                    console.log('获取Auth出错: \n client_id:', clientId, '\ncode:' + code);
                });
                return [4 /*yield*/, res];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getAuth = getAuth;
var refreshAuth = function (clientId, refreshToken) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                res = restRequestWithoutAuth({
                    method: 'POST',
                    url: '/auth/token',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: "grant_type=refresh_token&client_id=" + clientId + "&refresh_token=" + refreshToken,
                });
                res.catch(function (e) {
                    console.log('refresh Auth error:', clientId, '\n', e);
                });
                return [4 /*yield*/, res];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.refreshAuth = refreshAuth;
