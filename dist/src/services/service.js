"use strict";
//  ! Document
// let tong: Array<string> = [];
// let tongDetail: Array<string> = [];
// const formattedResponse: CreateTong[] = (resource['list']).map((e:any) => Convert.toCreateTong(JSON.stringify(e)));
// formattedResponse.forEach(element  => {
//     tong.push(`INSERT INTO tong
//     ( tongId, documentId,linenumber, createAt)
//     VALUES ( '${element.tongId}', ${element.documentId},${element.linenumber}, NOW());`);
//     element.tong.forEach(element2 => {
//         tongDetail.push(`tong_detailINSERT INTO tong_detail
//         (tongId, itemCode, itemDescription, quantityInTong, uoMCode, createAt)
//         VALUES ('${element.tongId}', '${element2.itemCode}', '${element2.itemDescription}', ${element2.quantityInTong}, ${element2.uoMCode}, NOW());`);
//     });
// });
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
const create_tong_1 = require("../../interfaces/create.tong");
const db_connect_1 = require("../db/db.connect");
const dasboard_1 = require("./functions/dasboard");
// import {query} from "./functions/dasboard";
var pool = (0, db_connect_1.createDbPool)();
class TongService {
    create(resource, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const formattedResponse = create_tong_1.Convert.toCreateTong(JSON.stringify(resource));
                var queryTong = `INSERT INTO tong( tongId, documentId,linenumber, createAt) 
            VALUES ( '${formattedResponse.tongId}', ${formattedResponse.documentId},${formattedResponse.linenumber}, NOW());`;
                pool.query(queryTong, []);
                formattedResponse.tong.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    pool.query(`INSERT INTO tong_detail (tongId, itemCode, itemDescription, quantityInTong, uoMCode, createAt)
                VALUES ('${formattedResponse.tongId}', '${element.itemCode}', '${element.itemDescription}', ${element.quantityInTong}, '${element.uoMCode}', NOW());\n\n`, []);
                }));
                return callback(null, formattedResponse);
            }
            catch (error) {
                console.log(error);
                return callback(error);
            }
        });
    }
    ;
    getByDocumentId(resource, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var query = `SELECT t.*,
        detail.*
        FROM	tong AS t	
       INNER	 JOIN tong_detail AS detail ON t.tongId = detail.tongId
       WHERE	documentId	= ? AND	t.active = 1`;
                pool.query(query, [resource.documentId], (error, results) => {
                    console.log("🚀 ~ file: service.ts ~ line 58 ~ TongService ~ pool.query ~ results", results.length);
                    if (error)
                        return callback(error);
                    if (results.length > 0) {
                        return callback(null, results);
                    }
                    else {
                        return callback('error');
                    }
                });
            }
            catch (error) {
                callback(error);
            }
        });
    }
    ;
    deleteTongByDocumentId(resource, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const formattedResponse = create_tong_1.Convert.toCreateTong(JSON.stringify(resource));
                var deleteTong = `UPDATE tong SET active=0 WHERE documentId= ${formattedResponse.documentId}`;
                pool.query(deleteTong, []);
                formattedResponse.tong.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    pool.query(`UPDATE tong_detail SET active=0 WHERE tongId = '${formattedResponse.tongId}'  and roworder = ${element.roworder}`, []);
                }));
                return callback(null, formattedResponse);
            }
            catch (error) {
                return callback(error);
            }
        });
    }
    ;
    getDasboard(resource, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            var dashbordList = [];
            try {
                for (let index = 0; index < 7; index++) {
                    let code = `${resource.type == 'form' ? 'WhGrpCode' : 'ToWhsCode'} LIKE '%${resource.whgrpCode}%' AND`;
                    if (resource.whgrpCode == "all" || resource.whgrpCode == "ALL") {
                        code = "";
                    }
                    var str = `SELECT COUNT(*) AS Count FROM document WHERE ${code} StatusId  = ${index}`;
                    const results = yield (0, dasboard_1.execute)(str, []);
                    var arrayObject = Object.values(JSON.parse(JSON.stringify(results)))[0];
                    dashbordList.push({
                        "count": JSON.parse(JSON.stringify(arrayObject))['Count'],
                        "statusid": index
                    });
                }
                return callback(null, dashbordList);
            }
            catch (error) {
                callback(error);
            }
        });
    }
    getDasboardTo(resource, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            var dashbordList = [];
            try {
                for (let index = 0; index < 7; index++) {
                    let code = `${resource.type == 'form' ? 'WhGrpCode' : 'ToWhsCode'} LIKE '%${resource.whgrpCode}%' AND`;
                    if (resource.whgrpCode == "all" || resource.whgrpCode == "ALL") {
                        code = "";
                    }
                    var str = `SELECT COUNT(*) AS Count FROM document WHERE ${code} StatusId  = ${index}`;
                    const results = yield (0, dasboard_1.execute)(str, []);
                    var arrayObject = Object.values(JSON.parse(JSON.stringify(results)))[0];
                    dashbordList.push({
                        "count": JSON.parse(JSON.stringify(arrayObject))['Count'],
                        "statusid": index
                    });
                }
                return callback(null, dashbordList);
            }
            catch (error) {
                callback(error);
            }
        });
    }
    resiveSearch(resource, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            var dataList = [];
            var head;
            try {
                var str = `SELECT document.*,product.* FROM	 document 
            INNER	JOIN	product ON document.Id = product.DocumentId
            WHERE document.Id = ?`;
                const results = yield (0, dasboard_1.execute)(str, [resource.documentId]);
                var arrayObject = Object.values(JSON.parse(JSON.stringify(results)));
                console.log("🚀 ~ file: service.ts ~ line 128 ~ TongService ~ dresiveSearch ~ arrayObject", typeof arrayObject);
                if (arrayObject.length > 0) {
                    let data = JSON.parse(JSON.stringify(arrayObject[0]));
                    for (let i = 0; i < arrayObject.length; i++) {
                        let _data = JSON.parse(JSON.stringify(arrayObject[i]));
                        dataList.push({
                            "lineNum": _data["LineNum"],
                            "itemCode": _data["ItemCode"],
                            "itemDescription": _data["ItemDescription"],
                            "quantityInSap": _data["Quantity_Sap"],
                            "quantityInTong": _data["Quantity_Tong"],
                            "uoMCode": _data["UoMCode"],
                            // "data":data
                        });
                    }
                    head = {
                        "documentId": data["DocumentId"],
                        "statusId": data["StatusId"],
                        "doctype": "R",
                        "docEntry": data["DocEntry"],
                        "whGrpCode": data["WhGrpCode"],
                        "toWhsCode": data["ToWhsCode"],
                        "docDueDate": data["DocDueDate"],
                        "comments": data["Comments"],
                        "dataProduct": dataList
                    };
                }
                return callback(null, head);
            }
            catch (error) {
                callback(error);
            }
        });
    }
    updateProductInTong(resource, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const formattedResponse = create_tong_1.Convert.toCreateTong(JSON.stringify(resource));
                console.log("🚀 ~ file: service.ts ~ line 180 ~ TongService ~ updateProductInTong ~ formattedResponse", formattedResponse);
                // var deleteTong = `UPDATE tong SET active=0 WHERE documentId= ${formattedResponse.documentId}`;
                // pool.query(deleteTong, []);
                // var str: string = ``;            
                // var arrayObject = Object.values(JSON.parse(JSON.stringify(results)));
                // console.log("🚀 ~ file: service.ts ~ line 128 ~ TongService ~ dresiveSearch ~ arrayObject", typeof arrayObject)
                formattedResponse.tong.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield (0, dasboard_1.execute)(`UPDATE tong_detail SET	quantityInTong = ${element.quantityInTong} WHERE tongId = '${formattedResponse.tongId}' AND roworder=${element.roworder};`, []);
                }));
                return callback(null, formattedResponse);
            }
            catch (error) {
                return callback(error);
            }
        });
    }
    ;
    addReasonMaster(resource, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var str = `INSERT INTO reason_master (value, createAt) VALUES ('${resource.value}', NOW())`;
                var results = yield (0, dasboard_1.execute)(str, []);
                var arrayObject = Object.values(JSON.parse(JSON.stringify(results)));
                console.log("🚀 ~ file: service.ts ~ line 128 ~ TongService ~ dresiveSearch ~ arrayObject", typeof arrayObject);
                return callback(null, true);
            }
            catch (error) {
                return callback(error);
            }
        });
    }
    ;
    getReasonMaster(resource, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var str = `SELECT r.roworder AS 'key',r.value FROM	reason_master AS r WHERE roworder !=1;`;
                var results = yield (0, dasboard_1.execute)(str, []);
                var arrayObject = Object.values(JSON.parse(JSON.stringify(results)));
                console.log("🚀 ~ file: service.ts ~ line 128 ~ TongService ~ dresiveSearch ~ arrayObject", typeof arrayObject);
                return callback(null, arrayObject);
            }
            catch (error) {
                return callback(error);
            }
        });
    }
    ;
    insertReasonIndocument(resource, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var str = `INSERT INTO tong_reason ( documentId, reasonCode, createAt, imageUrl, statusCode) VALUES ( ${resource.documentId}, '${resource.key}', NOW(), ${resource.imageUrl}, ${resource.statusCode});`;
                var results = yield (0, dasboard_1.execute)(str, []);
                var arrayObject = Object.values(JSON.parse(JSON.stringify(results)));
                console.log("🚀 ~ file: service.ts ~ line 128 ~ TongService ~ dresiveSearch ~ arrayObject", typeof arrayObject);
                return callback(null, arrayObject);
            }
            catch (error) {
                return callback(error);
            }
        });
    }
    ;
    test(resource, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = `SELECT a.documentId,a.tongId,a.linenumber,b.* FROM	tong AS a INNER JOIN	tong_detail AS b ON a.tongId = b.tongId;
        `;
            pool.query(query, [], (error, results) => {
                console.log("🚀 ~ file: service.ts ~ line 58 ~ TongService ~ pool.query ~ results", typeof results);
                if (error)
                    return callback(error);
                return callback(null, results);
            });
        });
    }
}
exports.default = new TongService();
