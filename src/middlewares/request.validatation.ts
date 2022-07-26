import { ReponseInterface } from "../../interfaces/reponse.interface";
import express from 'express';
import { CreateTong } from "../../interfaces/create.tong";
class MiddlewareRequest {
  async validateRequiredCreateTongBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body) {
      next();
    } else {
        res.status(400).send(<ReponseInterface>{
          status: false,
          data: null,
          error: `Missing required body`,
          message: "Reqeust is not validation"
        }
      );
    }
  }
  async validateRequiredGetTongBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.query&&req.query.documentId) {
      next();
    } else {
        res.status(400).send(<ReponseInterface>{
          status: false,
          data: null,
          error: `Missing required params`,
          message: "Reqeust is not validation"
        }
      );
    }
  }
  async validateRequireddasboardFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.query&&req.query.whgrpCode&&req.query.type) {
      next();
    } else {
        res.status(400).send(<ReponseInterface>{
          status: false,
          data: null,
          error: `Missing required params`,
          message: "Reqeust is not validation"
        }
      );
    }
  } 
  
  async validateRequiredUpdateProductBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body&&req.body.documentId) {
      next();
    } else {
        res.status(400).send(<ReponseInterface>{
          status: false,
          data: null,
          error: `Missing required params`,
          message: "Reqeust is not validation"
        }
      );
    }
  }

  async validateRequiredaddReasonBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body&&req.body.value) {
      next();
    } else {
        res.status(400).send(<ReponseInterface>{
          status: false,
          data: null,
          error: `Missing required params`,
          message: "Reqeust is not validation"
        }
      );
    }
  }

  async validateRequiredinsertReasonBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body&&req.body.documentId&&req.body.key&&req.body.imageUrl&&req.body.statusCode) {
      next();
    } else {
        res.status(400).send(<ReponseInterface>{
          status: false,
          data: null,
          error: `Missing required params`,
          message: "Reqeust is not validation"
        }
      );
    }
  }

  async validateRequiredLoginBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body&&req.body.userid&&req.body.password) {
      next();
    } else {
        res.status(400).send(<ReponseInterface>{
          status: false,
          data: null,
          error: `Missing required params`,
          message: "Reqeust is not validation"
        }
      );
    }
  }

}

export default new MiddlewareRequest;



 


