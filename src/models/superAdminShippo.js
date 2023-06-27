// NPM Modules
import { Model } from 'objection';

// Local Modules


class SuperAdminShippo extends Model {
    static get idColumn() { return 'id'; }

    static get tableName() { return 'shippo'; }

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


    static async create(payload) {
        return SuperAdminShippo.query().insert({
            provider:payload.provider,
            estimated_days:payload.estimated_days,
            duration_terms:payload.duration_terms,
            object_id:payload.rate,
            amount:payload.amount,
            currency:payload.currency,
            created_at:new Date()
        }).returning("*");
    }
    static async returningShip(id) {
        return SuperAdminShippo.query().select('*').where("id","=",id)
    }
    
}

export default SuperAdminShippo;
