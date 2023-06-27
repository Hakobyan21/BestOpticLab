// NPM Modules
import { Model } from 'objection';

// Local Modules


class SuperAdminFedex extends Model {
    static get idColumn() { return 'id'; }

    static get tableName() { return 'usersrateitems'; }

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

    static async getFedexShip(id) {
        return SuperAdminFedex.query().select('id', 'rateReplyDetails').whereNotNull('rateReplyDetails').andWhere('id', '=', id)
    }
}

export default SuperAdminFedex;
