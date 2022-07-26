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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("../services/service"));
var time = new Date().toISOString();
class ControllerTong {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            service_1.default.create(req.body, (err, results) => {
                if (err != null) {
                    return res.status(200).send({
                        status: false,
                        data: null,
                        error: null,
                        message: "Not Created .",
                        time: time
                    });
                }
                return res.status(200).send({
                    status: false,
                    data: results,
                    error: null,
                    message: "Created .",
                    time: time
                });
            });
        });
    }
    getBydocumentId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            service_1.default.getByDocumentId(req.query, (err, results) => {
                console.log("🚀 ~ file: controller.ts ~ line 27 ~ ControllerTong ~ service.getByDocumentId ~ results", typeof results);
                if (err != null && err != 'error') {
                    return res.status(200).send({
                        status: false,
                        data: null,
                        error: null,
                        message: "Success .",
                        time: time
                    });
                }
                if (err == 'error') {
                    return res.status(200).send({
                        status: true,
                        data: null,
                        error: null,
                        message: "ไม่พบข้อมูล",
                        time: time
                    });
                }
                var ObjectToArrLine = Object.values(JSON.parse(JSON.stringify(results)));
                var arr = [];
                if (ObjectToArrLine.length > 0) {
                    for (const key in ObjectToArrLine) {
                        var tongs = ObjectToArrLine[key];
                        console.log(" ObjectToArrLine[key]", tongs.itemDescription);
                        arr.push({
                            itemCode: tongs.itemCode,
                            itemDescription: tongs.itemDescription,
                            quantityInTong: tongs.quantityInTong,
                            uoMCode: tongs.uoMCode,
                            roworder: tongs.roworder,
                            status: tongs.status,
                        });
                    }
                }
                return res.status(200).send({
                    status: true,
                    data: {
                        documentId: results[0].documentId,
                        tongId: results[0].tongId,
                        linenumber: results[0].linenumber,
                        tong: arr
                    },
                    error: null,
                    message: "Unsuccess .",
                    time: time
                });
            });
        });
    }
    deleteBydocumentId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            service_1.default.deleteTongByDocumentId(req.body, (err, results) => {
                if (err != null) {
                    return res.status(200).send({
                        status: false,
                        data: null,
                        error: err,
                        message: "unsuccess !! .",
                        time: time
                    });
                }
                return res.status(200).send({
                    status: true,
                    data: results,
                    error: null,
                    message: "success !!.",
                    time: time
                });
            });
        });
    }
    getdasboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield service_1.default.getDasboard(req.query, (err, results) => {
                if (err != null) {
                    return res.status(200).send({
                        status: false,
                        data: null,
                        error: err,
                        message: "unsuccess !! .",
                        time: time
                    });
                }
                return res.status(200).send({
                    status: true,
                    data: results,
                    error: null,
                    message: "success !!.",
                    time: time
                });
            });
        });
    }
    getdasboardTo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield service_1.default.getDasboardTo(req.query, (err, results) => {
                if (err != null) {
                    return res.status(200).send({
                        status: false,
                        data: null,
                        error: err,
                        message: "unsuccess !! .",
                        time: time
                    });
                }
                return res.status(200).send({
                    status: true,
                    data: results,
                    error: null,
                    message: "success !!.",
                    time: time
                });
            });
        });
    }
    resiveSearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield service_1.default.resiveSearch(req.query, (err, results) => {
                if (err != null) {
                    return res.status(200).send({
                        status: false,
                        data: null,
                        error: err,
                        message: "unsuccess !! .",
                        time: time
                    });
                }
                return res.status(200).send({
                    status: true,
                    data: results,
                    error: null,
                    message: "success !!.",
                    time: time
                });
            });
        });
    }
    updateProductInTong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield service_1.default.updateProductInTong(req.body, (err, results) => {
                if (err != null) {
                    return res.status(200).send({
                        status: false,
                        data: null,
                        error: err,
                        message: "unsuccess !! .",
                        time: time
                    });
                }
                return res.status(200).send({
                    status: true,
                    data: null,
                    error: null,
                    message: "success !!.",
                    time: time
                });
            });
        });
    }
    addReasonMaster(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield service_1.default.addReasonMaster(req.body, (err, results) => {
                if (err != null) {
                    return res.status(200).send({
                        status: false,
                        data: null,
                        error: err,
                        message: "unsuccess !! .",
                        time: time
                    });
                }
                return res.status(200).send({
                    status: true,
                    data: null,
                    error: null,
                    message: "success !!.",
                    time: time
                });
            });
        });
    }
    getReasonMaster(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield service_1.default.getReasonMaster(req.body, (err, results) => {
                if (err != null) {
                    return res.status(200).send({
                        status: false,
                        data: null,
                        error: err,
                        message: "unsuccess !! .",
                        time: time
                    });
                }
                return res.status(200).send({
                    status: true,
                    data: results,
                    error: null,
                    message: "success !!.",
                    time: time
                });
            });
        });
    }
    insertReasonIndocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield service_1.default.insertReasonIndocument(req.body, (err, results) => {
                if (err != null) {
                    return res.status(200).send({
                        status: false,
                        data: null,
                        error: err,
                        message: "unsuccess !! .",
                        time: time
                    });
                }
                return res.status(200).send({
                    status: true,
                    data: null,
                    error: null,
                    message: "success !!.",
                    time: time
                });
            });
        });
    }
    test(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).send('Wellcome..');
            // await service.test(req.query, (err: any, results: any) => {
            //     if (err != null) {
            //         return res.status(200).send(<ReponseInterface>{
            //             status: false,
            //             data: null,
            //             error: err,
            //             message: "unsuccess !! .",
            //             time: time
            //         });
            //     }
            //     return res.status(200).send(<ReponseInterface>{
            //         status: true,
            //         data: results,
            //         error: null,
            //         message: "success !!.",
            //         time: time
            //     });
            // });
        });
    }
}
exports.default = new ControllerTong;
