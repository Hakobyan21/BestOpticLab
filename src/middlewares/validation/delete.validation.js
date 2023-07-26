import { DeleteSchemes } from './schemes';
import ValidatorUtil from './util/validator.util';

class DeleteValidation {
    static validateDropColumnArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, DeleteSchemes.dropColumn, next);
    }

    static validateDeleteByIdArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, DeleteSchemes.deleteById, next);
    }

}

export default DeleteValidation;

