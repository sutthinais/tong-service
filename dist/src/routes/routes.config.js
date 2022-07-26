"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TongsRoutes = void 0;
const appllication_1 = require("../models/appllication");
const request_validatation_1 = __importDefault(require("../middlewares/request.validatation"));
const validate_authentication_1 = __importDefault(require("../auth/validate.authentication"));
const controller_1 = __importDefault(require("../controllers/controller"));
class TongsRoutes extends appllication_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'TongsRoutes');
    }
    configureRoutes() {
        this.app.route(`/login`).post(request_validatation_1.default.validateRequiredLoginBodyFields, validate_authentication_1.default.signin);
        this.app.route(`/tong`)
            .post(validate_authentication_1.default.verifyToken, request_validatation_1.default.validateRequiredCreateTongBodyFields, controller_1.default.create)
            .get(validate_authentication_1.default.verifyToken, request_validatation_1.default.validateRequiredGetTongBodyFields, controller_1.default.getBydocumentId)
            .delete(validate_authentication_1.default.verifyToken, controller_1.default.deleteBydocumentId);
        this.app.route('/dasboard').get(validate_authentication_1.default.verifyToken, request_validatation_1.default.validateRequireddasboardFields, controller_1.default.getdasboard);
        this.app.route('/dasboard/to').get(validate_authentication_1.default.verifyToken, request_validatation_1.default.validateRequireddasboardFields, controller_1.default.getdasboardTo);
        this.app.route('/resiveSearch').get(validate_authentication_1.default.verifyToken, request_validatation_1.default.validateRequiredGetTongBodyFields, controller_1.default.resiveSearch);
        this.app.route('/updateProduct').put(validate_authentication_1.default.verifyToken, request_validatation_1.default.validateRequiredUpdateProductBodyFields, controller_1.default.updateProductInTong);
        this.app.route('/addReasonMaster').post(validate_authentication_1.default.verifyToken, request_validatation_1.default.validateRequiredaddReasonBodyFields, controller_1.default.addReasonMaster);
        this.app.route('/getReasonMaster').get(validate_authentication_1.default.verifyToken, controller_1.default.getReasonMaster);
        this.app.route('/insertReasonIndocument').post(controller_1.default.insertReasonIndocument);
        this.app.route('/').get(controller_1.default.test);
        return this.app;
    }
}
exports.TongsRoutes = TongsRoutes;
