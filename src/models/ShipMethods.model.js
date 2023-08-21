// NPM Modules
import { Model } from 'objection';
import { ErrorsUtil } from '../utils';

// Local Modules
const { InputValidationError } = ErrorsUtil;

class ShipMethodsModel extends Model {
    static get idColumn() { return 'id'; }

    static get tableName() { return 'ship_methods'; }

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
    static getShipMethods() {
        return ShipMethodsModel.query().select('*').orderBy('id');
    }

    // static delete (id) {
    //     return ShipMethodsModel.query().select('*').where('id','=',id).del().returning('*');
    // }

}

export default ShipMethodsModel;
