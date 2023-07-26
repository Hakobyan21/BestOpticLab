import { UsersSchemes } from './schemes';
import ValidatorUtil from './util/validator.util';

class UsersValidation {
    static validateGetByIdArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, UsersSchemes.getByIdSchema, next);
    }

    static validateAddArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, UsersSchemes.addSchema, next);
    }

    static validateEditArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, UsersSchemes.editSchema, next);
    }
    
}

export default UsersValidation;
