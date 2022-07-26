import { createDbPool } from "../../db/db.connect";
var pool = createDbPool();

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


export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
    try {
      if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, params, (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
  
    } catch (error) {
      console.error('[mysql.connector][execute][Error]: ', error);
      throw new Error('failed to execute MySQL query');
    }
  }