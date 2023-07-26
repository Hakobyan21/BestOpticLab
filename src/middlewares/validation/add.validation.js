import { AddSchemes } from './schemes';
import ValidatorUtil from './util/validator.util';

class AddValidation{
    static validateInsertingArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, AddSchemes.inserting, next);
    }

    static validateCreateTableArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, AddSchemes.createTable, next);
    }

    static validateAddStylesArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, AddSchemes.addStyles, next);
    }
    
    static validateAddAboutArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, AddSchemes.addAbout, next);
    }

    static validateAddToHomeArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, AddSchemes.addToHome, next);
    }

    static validateCretaePDFArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, AddSchemes.createPDF, next);
    }
  
    static validateSendMailArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, AddSchemes.sendMail, next);
    }

}

export default AddValidation;
