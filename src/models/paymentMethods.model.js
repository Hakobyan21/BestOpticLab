// NPM Modules
import { Model } from 'objection';
import { ErrorsUtil } from '../utils';

// Local Modules
// import Status from '../enum/status.enum';
// import Role from '../enum/role.enum';

const { InputValidationError } = ErrorsUtil;

class PaymentMethodsModel extends Model {
    static get idColumn() { return 'id'; }

    static get tableName() { return 'payment_methods'; }

    $formatJson(json) {
        json = super.$formatJson(json);
        delete json.password;
        return json;
    }

    $beforeInsert() {
        const date = new Date();
        this.created_at = date;
    }

    $beforeUpdate() {
        const date = new Date();
        this.updated_at = date;
    }

    // // Methods
    static getPaymentMethods() {
        return PaymentMethodsModel.query().select('*').where('status', '=', true);
    }

    static async changePaymentMethods(id) {
        const method = await PaymentMethodsModel.query().select('*').whereIn('id', id);
        if (method[0].status == true) {
            return PaymentMethodsModel.query().update({ status: false }).whereIn('id', id).returning('*');
        }
        return PaymentMethodsModel.query().update({ status: true }).whereIn('id', id).returning('*');
    }

    // static delete (id) {
    //     return PaymentMethodsModel.query().select('*').where('id','=',id).del().returning('*');
    // }

}

export default PaymentMethodsModel;
