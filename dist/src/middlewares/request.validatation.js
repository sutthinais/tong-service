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
Object.defineProperty(exports, "__esModule", { value: true });
class MiddlewareRequest {
    validateRequiredCreateTongBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body) {
                next();
            }
            else {
                res.status(400).send({
                    status: false,
                    data: null,
                    error: `Missing required body`,
                    message: "Reqeust is not validation"
                });
            }
        });
    }
    validateRequiredGetTongBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query && req.query.documentId) {
                next();
            }
            else {
                res.status(400).send({
                    status: false,
                    data: null,
                    error: `Missing required params`,
                    message: "Reqeust is not validation"
                });
            }
        });
    }
    validateRequireddasboardFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query && req.query.whgrpCode && req.query.type) {
                next();
            }
            else {
                res.status(400).send({
                    status: false,
                    data: null,
                    error: `Missing required params`,
                    message: "Reqeust is not validation"
                });
            }
        });
    }
    validateRequiredUpdateProductBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body && req.body.documentId) {
                next();
            }
            else {
                res.status(400).send({
                    status: false,
                    data: null,
                    error: `Missing required params`,
                    message: "Reqeust is not validation"
                });
            }
        });
    }
    validateRequiredaddReasonBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body && req.body.value) {
                next();
            }
            else {
                res.status(400).send({
                    status: false,
                    data: null,
                    error: `Missing required params`,
                    message: "Reqeust is not validation"
                });
            }
        });
    }
    validateRequiredinsertReasonBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body && req.body.documentId && req.body.key && req.body.imageUrl && req.body.statusCode) {
                next();
            }
            else {
                res.status(400).send({
                    status: false,
                    data: null,
                    error: `Missing required params`,
                    message: "Reqeust is not validation"
                });
            }
        });
    }
    validateRequiredLoginBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body && req.body.userid && req.body.password) {
                next();
            }
            else {
                res.status(400).send({
                    status: false,
                    data: null,
                    error: `Missing required params`,
                    message: "Reqeust is not validation"
                });
            }
        });
    }
}
exports.default = new MiddlewareRequest;
