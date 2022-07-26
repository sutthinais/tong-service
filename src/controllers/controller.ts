import express from 'express';
import { CreateTong, Tong } from '../../interfaces/create.tong';
import { ReponseInterface } from '../../interfaces/reponse.interface';
import service from '../services/service';

var time = new Date().toISOString();

class ControllerTong {
    async create(req: express.Request, res: express.Response) {
        service.create(req.body, (err: any, results: any) => {
            if (err != null) {
                return res.status(200).send(<ReponseInterface>{
                    status: false,
                    data: null,
                    error: null,
                    message: "Not Created .",
                    time: time
                });
            }

            return res.status(200).send(<ReponseInterface>{
                status: false,
                data: results,
                error: null,
                message: "Created .",
                time: time

            });
        });
    }

    async getBydocumentId(req: express.Request, res: express.Response) {
        service.getByDocumentId(req.query, (err: any, results: any) => {
            console.log("🚀 ~ file: controller.ts ~ line 27 ~ ControllerTong ~ service.getByDocumentId ~ results", typeof results)
            if (err != null && err != 'error') {
                return res.status(200).send(<ReponseInterface>{
                    status: false,
                    data: null,
                    error: null,
                    message: "Success .",
                    time: time
                });
            }
            if (err == 'error') {
                return res.status(200).send(<ReponseInterface>{
                    status: true,
                    data: null,
                    error: null,
                    message: "ไม่พบข้อมูล",
                    time: time
                });
            }
            var ObjectToArrLine = Object.values(JSON.parse(JSON.stringify(results)));
            var arr: Tong[] = [];
            if (ObjectToArrLine.length > 0) {
                for (const key in ObjectToArrLine) {
                    var tongs: any = ObjectToArrLine[key];
                    console.log(" ObjectToArrLine[key]", tongs!.itemDescription);
                    arr.push(
                        {
                            itemCode: tongs.itemCode,
                            itemDescription: tongs.itemDescription,
                            quantityInTong: tongs.quantityInTong,
                            uoMCode: tongs.uoMCode,
                            roworder: tongs.roworder,
                            status: tongs.status,
                        }
                    );
                }
            }


            return res.status(200).send(<ReponseInterface>{
                status: true,
                data: <CreateTong>{
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


    }

    async deleteBydocumentId(req: express.Request, res: express.Response) {
        service.deleteTongByDocumentId(req.body, (err: any, results: any) => {
            if (err != null) {
                return res.status(200).send(<ReponseInterface>{
                    status: false,
                    data: null,
                    error: err,
                    message: "unsuccess !! .",
                    time: time
                });
            }
            return res.status(200).send(<ReponseInterface>{
                status: true,
                data: results,
                error: null,
                message: "success !!.",
                time: time
            });
        });
    }

    async getdasboard(req: express.Request, res: express.Response) {

        await service.getDasboard(req.query, (err: any, results: any) => {
            if (err != null) {
                return res.status(200).send(<ReponseInterface>{
                    status: false,
                    data: null,
                    error: err,
                    message: "unsuccess !! .",
                    time: time
                });
            }
            return res.status(200).send(<ReponseInterface>{
                status: true,
                data: results,
                error: null,
                message: "success !!.",
                time: time
            });
        });
    }

    async getdasboardTo(req: express.Request, res: express.Response) {

        await service.getDasboardTo(req.query, (err: any, results: any) => {
            if (err != null) {
                return res.status(200).send(<ReponseInterface>{
                    status: false,
                    data: null,
                    error: err,
                    message: "unsuccess !! .",
                    time: time
                });
            }
            return res.status(200).send(<ReponseInterface>{
                status: true,
                data: results,
                error: null,
                message: "success !!.",
                time: time
            });
        });
    }

    async resiveSearch(req: express.Request, res: express.Response) {

        await service.resiveSearch(req.query, (err: any, results: any) => {
            if (err != null) {
                return res.status(200).send(<ReponseInterface>{
                    status: false,
                    data: null,
                    error: err,
                    message: "unsuccess !! .",
                    time: time
                });
            }
            return res.status(200).send(<ReponseInterface>{
                status: true,
                data: results,
                error: null,
                message: "success !!.",
                time: time
            });
        });
    }

    async updateProductInTong(req: express.Request, res: express.Response) {
        await service.updateProductInTong(req.body, (err: any, results: any) => {
            if (err != null) {
                return res.status(200).send(<ReponseInterface>{
                    status: false,
                    data: null,
                    error: err,
                    message: "unsuccess !! .",
                    time: time
                });
            }
            return res.status(200).send(<ReponseInterface>{
                status: true,
                data: null,
                error: null,
                message: "success !!.",
                time: time
            });
        });
    }

    async addReasonMaster(req: express.Request, res: express.Response) {
        await service.addReasonMaster(req.body, (err: any, results: any) => {
            if (err != null) {
                return res.status(200).send(<ReponseInterface>{
                    status: false,
                    data: null,
                    error: err,
                    message: "unsuccess !! .",
                    time: time
                });
            }
            return res.status(200).send(<ReponseInterface>{
                status: true,
                data: null,
                error: null,
                message: "success !!.",
                time: time
            });
        });
    }


    async getReasonMaster(req: express.Request, res: express.Response) {
        await service.getReasonMaster(req.body, (err: any, results: any) => {
            if (err != null) {
                return res.status(200).send(<ReponseInterface>{
                    status: false,
                    data: null,
                    error: err,
                    message: "unsuccess !! .",
                    time: time
                });
            }
            return res.status(200).send(<ReponseInterface>{
                status: true,
                data: results,
                error: null,
                message: "success !!.",
                time: time
            });
        });
    }

    async insertReasonIndocument(req: express.Request, res: express.Response) {
        await service.insertReasonIndocument(req.body, (err: any, results: any) => {
            if (err != null) {
                return res.status(200).send(<ReponseInterface>{
                    status: false,
                    data: null,
                    error: err,
                    message: "unsuccess !! .",
                    time: time
                });
            }
            return res.status(200).send(<ReponseInterface>{
                status: true,
                data: null,
                error: null,
                message: "success !!.",
                time: time
            });
        });
    }

    async test(req: express.Request, res: express.Response) {
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
    }


}

export default new ControllerTong;