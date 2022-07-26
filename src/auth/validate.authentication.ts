import express from "express";
import { ReponseInterface } from "../../interfaces/reponse.interface";
import jsonwebtoken from 'jsonwebtoken';
const axios = require('axios').default;
const BaseIP = "http://203.114.108.46:10102";
var tokenList = {};
class ValidateAuthentication {

    async signin(req: express.Request,
        res: express.Response) {
        try {
            const response = await axios.get('https://boonsirifishery.com/Api/loginapp/loginapp.php', { params: { users: '' + req.body.userid, password: '' + req.body.password } });
            // if (response.status === 200) {
            //     const datarespons = response.data;

            //     if (datarespons.data.length > 0) {
            //         jsonwebtoken.sign({ user: req.body.userid }, "secretkey", { expiresIn: "30d", }, async (err, token) => {
            //             //expiresIn: "10h",
            //             if (err) {
            //                 //On Error JWT
            //                 res.status(400).send({ error: true, message: "Generate Token failed" });
            //             } else {
            //                 //On Success JWT
            //                 var mapUser = {
            //                     citiId: datarespons.data[0].citi_id,
            //                     user: datarespons.data[0].user,
            //                     fname: datarespons.data[0].fname,
            //                     lname: datarespons.data[0].lname
            //                 };

            //                 let ipconnect = BaseIP + '/api/bfp/common/searchWarehouseGroupByCondition';
            //                 const headers = {
            //                     'Content-Type': 'application/json',
            //                     'a-token': 'gwKwHaGxcg07zRwC2P0Z8tJ7PKFgxjDJ1eQ32WT1+gcwbve1uhBe69VNFXadX9DUAYr7MW2vhpclJTRjgI176x1zPPrcMo4rjdAfebBLGEg='
            //                 }
            //                 //UDN Resive 
            //                 const body = {
            //                     "Condition": {
            //                         "UserCode": req.body.userid
            //                     }
            //                 }

            //                 const response = await this.getChekeStatusData(ipconnect, body, headers);
            //                 //console.log(response.WarehouseGroupList);
            //                 var warehouseGroupList = response.WarehouseGroupList;
            //                 const renamedObj = [];
            //                 for (var i = 0; i < warehouseGroupList.length; i++) {
            //                     const obj = warehouseGroupList[i];
            //                     const newKeys = { "BranchId": "branchId", "WhsGrpCode": "whsGrpCode", "WhsGrpName": "whsGrpName" };
            //                     renamedObj.push(this.renameKeys(obj, newKeys));
            //                 }
            //                 warehouseGroupList = renamedObj;
            //                 tokenList = req.body.userid;
            //                 res.status(200).send(<ReponseInterface>{
            //                     status: true,
            //                     data: { 
            //                         userData: mapUser,
            //                         warehouseGroupList,
            //                         token: token
            //                     },
            //                     error: null,
            //                     message: "Login Success"
            //                 });
            //             }
            //         });
            //     } else {
            //         res.status(400).send(<ReponseInterface>{
            //             status: false,
            //             data: null,
            //             error: null,
            //             message: "invalid User or Password"
            //         });

            //         // send({error:true,message:"invalid User or Password"});
            //     }
            // } else {
            //     res.status(400).send(<ReponseInterface>{
            //         status: false,
            //         data: null,
            //         error: null,
            //         message: "invalid User or Password"
            //     })
            // }
            if (response.status != 200) {
                return res.status(400).send(<ReponseInterface>{
                    status: false,
                    data: null,
                    error: null,
                    message: "authenticate token."
                });
            }

            const headers = {
                'Content-Type': 'application/json',
                'a-token': 'gwKwHaGxcg07zRwC2P0Z8tJ7PKFgxjDJ1eQ32WT1+gcwbve1uhBe69VNFXadX9DUAYr7MW2vhpclJTRjgI176x1zPPrcMo4rjdAfebBLGEg='
            }

            const body = {
                "Condition": {
                    "UserCode": req.body.userid
                }
            }
            const response2 = await axios.post('http://203.114.108.46:10300/api/bfp/common/searchWarehouseGroupByCondition', body, { headers });
            var mapUser = {
                citiId: response.data.data[0].citi_id,
                user: response.data.data[0].user,
                fname: response.data.data[0].fname,
                lname: response.data.data[0].lname
            };

            if (response2.status != 200) {
                return res.status(400).send(<ReponseInterface>{
                    status: false,
                    data: null,
                    error: null,
                    message: "authenticate token."
                });
            }

            var warehouseGroupList = response2.data.WarehouseGroupList;

            var resjsonwebtoken = await jsonwebtoken.sign({ user: req.body.userid }, "secretkey", { expiresIn: "30d", });


            return res.status(200).send(<ReponseInterface>{
                status: true,
                data: {
                    userData: mapUser,
                    warehouseGroupList: warehouseGroupList,
                    token: resjsonwebtoken
                },
                error: null,
                message: "authenticate token."
            });

        } catch (error) {
            return res.status(400).send(<ReponseInterface>{
                status: false,
                data: null,
                error: error,
                message: "invalid User or Password."
            });
        }
    }

    async verifyToken(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {

        // check header or url parameters or post parameters for token
        var token = req.headers['authorization'];
        // decode token
        if (token) {
            token = token.replace('Bearer ', '')
            // verifies secret and checks exp
            jsonwebtoken.verify(token, 'secretkey', function (err: any, decoded: any) {
                if (err) {
                    return res.status(403).send(<ReponseInterface>{
                        status: false,
                        data: null,
                        error: err,
                        message: "Failed to authenticate token."
                    });
                } else {
                    next();
                }
            });

        } else {
            return res.status(401).send(<ReponseInterface>{
                status: false,
                data: null,
                error: null,
                message: "401 Unauthorized"
            });
        }
    }

    async getChekeStatusData(baseIP: string, body: any, headers: any) {
        try {
            const response = await axios.post(baseIP, body, { headers });
            if (response.status === 200) {
                console.log(response.status);
                return response.data;
            } else {
                return { status: 400, ErrorMessage: true };
            }
        } catch (error) {
            return { status: error, ErrorMessage: true };
        }
    }

    async renameKeys(obj: any, newKeys: any) {
        const keyValues = Object.keys(obj).map(key => {
            const newKey = newKeys[key] || key;
            return { [newKey]: obj[key] };
        });
        return Object.assign({}, ...keyValues);
    }


}


export default new ValidateAuthentication;
