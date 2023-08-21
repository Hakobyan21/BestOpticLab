// NPM Modules
import { Model } from 'objection';
import { ErrorsUtil } from '../utils';

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
        return PaymentMethodsModel.query().select('*').orderBy('id');
    }

    static async changePaymentMethods(ids) {
            let method = await PaymentMethodsModel.query().select('*').whereIn('id', ids);
            for(let i = 0; i<method.length; i++) {
                if (method[i].status == true) {
                    return PaymentMethodsModel.query().update({ status: false }).whereIn('id', ids).returning('*');
                }
                return PaymentMethodsModel.query().update({ status: true }).whereIn('id', ids).returning('*');
            }
    }

    // static delete (id) {
    //     return PaymentMethodsModel.query().select('*').where('id','=',id).del().returning('*');
    // }

}

export default PaymentMethodsModel;
