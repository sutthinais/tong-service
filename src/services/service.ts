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

import { Convert, CreateTong } from "../../interfaces/create.tong";
import { createDbPool } from "../db/db.connect";
import { execute } from "./functions/dasboard";
// import {query} from "./functions/dasboard";
var pool = createDbPool();
class TongService {
    async create(resource: any, callback: any) {
        try {
            const formattedResponse: CreateTong = Convert.toCreateTong(JSON.stringify(resource));
            var queryTong = `INSERT INTO tong( tongId, documentId,linenumber, createAt) 
            VALUES ( '${formattedResponse.tongId}', ${formattedResponse.documentId},${formattedResponse.linenumber}, NOW());`;
            pool.query(queryTong, []);
            formattedResponse.tong.forEach(async (element) => {
                pool.query(`INSERT INTO tong_detail (tongId, itemCode, itemDescription, quantityInTong, uoMCode, createAt)
                VALUES ('${formattedResponse.tongId}', '${element.itemCode}', '${element.itemDescription}', ${element.quantityInTong}, '${element.uoMCode}', NOW());\n\n`, []);
            });
            return callback(null, formattedResponse);
        } catch (error) {
            console.log(error);
            return callback(error);
        }

    };

    async getByDocumentId(resource: any, callback: any) {
        try {
            var query: string = `SELECT t.*,
        detail.*
        FROM	tong AS t	
       INNER	 JOIN tong_detail AS detail ON t.tongId = detail.tongId
       WHERE	documentId	= ? AND	t.active = 1`;
        pool.query(query, [resource.documentId], (error, results) => {
            console.log("🚀 ~ file: service.ts ~ line 58 ~ TongService ~ pool.query ~ results", results.length)

            if (error) return callback(error);
            if(results.length >0){
                return callback(null,results)
            }else{
                return callback('error')
            }
            
        });
        } catch (error) {
            callback(error);
        }
    };

    async deleteTongByDocumentId(resource: any, callback: any) {

        try {
            const formattedResponse: CreateTong = Convert.toCreateTong(JSON.stringify(resource));
            var deleteTong = `UPDATE tong SET active=0 WHERE documentId= ${formattedResponse.documentId}`;
            pool.query(deleteTong, []);

            formattedResponse.tong.forEach(async (element) => {
                pool.query(`UPDATE tong_detail SET active=0 WHERE tongId = '${formattedResponse.tongId}'  and roworder = ${element.roworder}`, []);
            });
            return callback(null, formattedResponse);
        } catch (error) {
            return callback(error);
        }
    };

    async getDasboard(resource: any, callback: any) {
        var dashbordList: any[] = [];
        try {
            for (let index = 0; index < 7; index++) {

                let code = `${resource.type == 'form' ? 'WhGrpCode' : 'ToWhsCode'} LIKE '%${resource.whgrpCode}%' AND`;
                if (resource.whgrpCode == "all" || resource.whgrpCode == "ALL") {
                    code = "";
                }
                var str: string = `SELECT COUNT(*) AS Count FROM document WHERE ${code} StatusId  = ${index}`;
                const results = await execute<any>(str, []);
                var arrayObject = Object.values(JSON.parse(JSON.stringify(results)))[0];
                dashbordList.push({
                    "count": JSON.parse(JSON.stringify(arrayObject))['Count'],
                    "statusid": index
                });

            }
            return callback(null, dashbordList);
        } catch (error) {
            callback(error);
        }


    }
    async getDasboardTo(resource: any, callback: any) {
        var dashbordList: any[] = [];
        try {
            for (let index = 0; index < 7; index++) {

                let code = `${resource.type == 'form' ? 'WhGrpCode' : 'ToWhsCode'} LIKE '%${resource.whgrpCode}%' AND`;
                if (resource.whgrpCode == "all" || resource.whgrpCode == "ALL") {
                    code = "";
                }
                var str: string = `SELECT COUNT(*) AS Count FROM document WHERE ${code} StatusId  = ${index}`;
                const results = await execute<any>(str, []);
                var arrayObject = Object.values(JSON.parse(JSON.stringify(results)))[0];
                dashbordList.push({
                    "count": JSON.parse(JSON.stringify(arrayObject))['Count'],
                    "statusid": index
                });

            }
            return callback(null, dashbordList);
        } catch (error) {
            callback(error);
        }
    }

    async resiveSearch(resource: any, callback: any) {
        var dataList: any[] = [];
        var head;
        try {
            var str: string = `SELECT document.*,product.* FROM	 document 
            INNER	JOIN	product ON document.Id = product.DocumentId
            WHERE document.Id = ?`;
            const results = await execute<any>(str, [resource.documentId]);
            var arrayObject = Object.values(JSON.parse(JSON.stringify(results)));
            console.log("🚀 ~ file: service.ts ~ line 128 ~ TongService ~ dresiveSearch ~ arrayObject", typeof arrayObject)


            if (arrayObject.length > 0) {
                let data = JSON.parse(JSON.stringify(arrayObject[0]));
                for (let i = 0; i < arrayObject.length; i++) {
                    let _data = JSON.parse(JSON.stringify(arrayObject[i]));
                    dataList.push(
                        {
                            "lineNum": _data["LineNum"],
                            "itemCode": _data["ItemCode"],
                            "itemDescription": _data["ItemDescription"],
                            "quantityInSap": _data["Quantity_Sap"],
                            "quantityInTong": _data["Quantity_Tong"],
                            "uoMCode": _data["UoMCode"],
                            // "data":data
                        }
                    );
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
                }
            }
            return callback(null, head);
        } catch (error) {
            callback(error);
        }


    }

    async updateProductInTong(resource: any, callback: any) {
        try {
            const formattedResponse: CreateTong = Convert.toCreateTong(JSON.stringify(resource));
            console.log("🚀 ~ file: service.ts ~ line 180 ~ TongService ~ updateProductInTong ~ formattedResponse", formattedResponse)
            // var deleteTong = `UPDATE tong SET active=0 WHERE documentId= ${formattedResponse.documentId}`;
            // pool.query(deleteTong, []);
            // var str: string = ``;            
            // var arrayObject = Object.values(JSON.parse(JSON.stringify(results)));
            // console.log("🚀 ~ file: service.ts ~ line 128 ~ TongService ~ dresiveSearch ~ arrayObject", typeof arrayObject)
            formattedResponse.tong.forEach(async (element) => {
                await execute<any>(`UPDATE tong_detail SET	quantityInTong = ${element.quantityInTong} WHERE tongId = '${formattedResponse.tongId}' AND roworder=${element.roworder};`, []);
            });
            return callback(null, formattedResponse);
        } catch (error) {
            return callback(error);
        }
    };

    async addReasonMaster(resource: any, callback: any) {
        try {                  
            var str: string = `INSERT INTO reason_master (value, createAt) VALUES ('${resource.value}', NOW())`; 
            var  results = await execute<any>(str, []);  
            var arrayObject = Object.values(JSON.parse(JSON.stringify(results)));         
            console.log("🚀 ~ file: service.ts ~ line 128 ~ TongService ~ dresiveSearch ~ arrayObject", typeof arrayObject)        
            return callback(null, true);
        } catch (error) {
            return callback(error);
        }
    };

    async getReasonMaster(resource: any, callback: any) {
        try {                  
            var str: string = `SELECT r.roworder AS 'key',r.value FROM	reason_master AS r WHERE roworder !=1;`; 
            var  results = await execute<any>(str, []);  
            var arrayObject = Object.values(JSON.parse(JSON.stringify(results)));         
            console.log("🚀 ~ file: service.ts ~ line 128 ~ TongService ~ dresiveSearch ~ arrayObject", typeof arrayObject)        
            return callback(null, arrayObject);
        } catch (error) {
            return callback(error);
        }
    };

    async insertReasonIndocument(resource: any, callback: any) {
        try {                  
            var str: string = `INSERT INTO tong_reason ( documentId, reasonCode, createAt, imageUrl, statusCode) VALUES ( ${resource.documentId}, '${resource.key}', NOW(), ${resource.imageUrl}, ${resource.statusCode});`; 
            var  results = await execute<any>(str, []);  
            var arrayObject = Object.values(JSON.parse(JSON.stringify(results)));         
            console.log("🚀 ~ file: service.ts ~ line 128 ~ TongService ~ dresiveSearch ~ arrayObject", typeof arrayObject)        
            return callback(null, arrayObject);
        } catch (error) {
            return callback(error);
        }
    };


    async test(resource: any, callback: any) {
        var query: string = `SELECT a.documentId,a.tongId,a.linenumber,b.* FROM	tong AS a INNER JOIN	tong_detail AS b ON a.tongId = b.tongId;
        `;
        pool.query(query, [], (error, results) => {
            console.log("🚀 ~ file: service.ts ~ line 58 ~ TongService ~ pool.query ~ results", typeof results)

            if (error) return callback(error)
            return callback(null, results)
        });

    }



}

export default new TongService();