import { CommonRoutesConfig } from '../models/appllication';
import express from 'express';
import MiddlewareRequest from '../middlewares/request.validatation';
import ValidateAuthentication from '../auth/validate.authentication';
import controller from '../controllers/controller';

export class TongsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'TongsRoutes');
    }    
    configureRoutes() {
        this.app.route(`/login`).post(MiddlewareRequest.validateRequiredLoginBodyFields,ValidateAuthentication.signin);
        this.app.route(`/tong`)
            .post(ValidateAuthentication.verifyToken,MiddlewareRequest.validateRequiredCreateTongBodyFields,controller.create)
            .get(ValidateAuthentication.verifyToken,MiddlewareRequest.validateRequiredGetTongBodyFields,controller.getBydocumentId)
            .delete(ValidateAuthentication.verifyToken,controller.deleteBydocumentId);
        this.app.route('/dasboard').get(ValidateAuthentication.verifyToken,MiddlewareRequest.validateRequireddasboardFields,controller.getdasboard);
        this.app.route('/dasboard/to').get(ValidateAuthentication.verifyToken,MiddlewareRequest.validateRequireddasboardFields,controller.getdasboardTo);
        this.app.route('/resiveSearch').get(ValidateAuthentication.verifyToken,MiddlewareRequest.validateRequiredGetTongBodyFields,controller.resiveSearch);
        this.app.route('/updateProduct').put(ValidateAuthentication.verifyToken,MiddlewareRequest.validateRequiredUpdateProductBodyFields,controller.updateProductInTong);
        this.app.route('/addReasonMaster').post(ValidateAuthentication.verifyToken,MiddlewareRequest.validateRequiredaddReasonBodyFields,controller.addReasonMaster);
        this.app.route('/getReasonMaster').get(ValidateAuthentication.verifyToken,controller.getReasonMaster);
        this.app.route('/insertReasonIndocument').post(controller.insertReasonIndocument);
        this.app.route('/').get(controller.test);
        return this.app;
    }
}





