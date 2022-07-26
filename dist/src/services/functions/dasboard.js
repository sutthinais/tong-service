"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const db_connect_1 = require("../../db/db.connect");
var pool = (0, db_connect_1.createDbPool)();
// export async function query(
//     whsGrpCode: string,
//     statusid: string,
//     type: string,
//     callback: any) {
//         let whgrpCode = `${type == 'form' ? 'WhGrpCode' : 'ToWhsCode'} LIKE '%${whsGrpCode}%' AND`;
//         if (whsGrpCode == "all" || whsGrpCode == "ALL") {
//             whgrpCode = "";
//         }
//                 var str: string = `SELECT COUNT(*) AS Count FROM document WHERE ${whgrpCode} StatusId  = ${statusid}`;
//         try {
//             pool.query(str,[], (err, results) => {
//             if (err) {
//                 return callback(err);
//             } else {                
//                 return callback(null, results[0]);
//             }
//         });
//         } catch (error) {
//             return callback(error);
//         }
// }
// // class FunctionDasboard {
// //     async function name(params:any) {
// //         return 
// //     }
// //     //  async function query(
// //     //     whsGrpCode: string,
// //     //     statusid: string,
// //     //     type: string,
// //     //     callback: any
// //     // ) {
// //     //     let whgrpCode = `${type == 'form' ? 'WhGrpCode' : 'ToWhsCode'} LIKE '%${whsGrpCode}%' AND`;
// //     //     if (whsGrpCode == "all" || whsGrpCode == "ALL") {
// //     //         whgrpCode = "";
// //     //     }
// //     //     var str: string = `SELECT COUNT(*) AS Count FROM document WHERE ${whgrpCode} StatusId  = ${statusid}`;
// //     //     try {
// //     //         pool.query(str,[], (err, results) => {
// //     //         if (err) {
// //     //             return callback(err);
// //     //         } else {                
// //     //             return callback(null, results[0]);
// //     //         }
// //     //     });
// //     //     } catch (error) {
// //     //         return callback(error);
// //     //     }
// //     // }
// // }
// // export default new FunctionDasboard();
const execute = (query, params) => {
    try {
        if (!pool)
            throw new Error('Pool was not created. Ensure pool is created when running the app.');
        return new Promise((resolve, reject) => {
            pool.query(query, params, (error, results) => {
                if (error)
                    reject(error);
                else
                    resolve(results);
            });
        });
    }
    catch (error) {
        console.error('[mysql.connector][execute][Error]: ', error);
        throw new Error('failed to execute MySQL query');
    }
};
exports.execute = execute;
