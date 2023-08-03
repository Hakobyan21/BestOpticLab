import { ChangeSchemes } from './schemes';
import ValidatorUtil from './util/validator.util';

class ChangeValidation {
    static validateColumnNameArgs(req, res, next){
        ValidatorUtil.validateArgs(req, ChangeSchemes.changeColumnName, next);
    }

    static validateChangeLoginOptionsArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, ChangeSchemes.changeLoginOptions, next);
    }

    static validateChangeSettingsArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, ChangeSchemes.changeSettings, next);
    }

    static validateChangeStylesArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, ChangeSchemes.changeStyles, next);
    }

    static validateChangeAboutArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, ChangeSchemes.changeAbout, next);
    }

    static validateChangeTermsArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, ChangeSchemes.changeTerms, next);
    }

    static validateChangeMessageArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, ChangeSchemes.changeMessage, next);
    }

    static validateChangeByIdArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, ChangeSchemes.changeById, next);
    }

    static validateChangeCompanySettingsArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, ChangeSchemes.changeCompanySettings, next);
    }

   
    
}

export default ChangeValidation;

