// NPM Modules
import { Model } from 'objection';



class AdminModels extends Model {
    static get idColumn() { return 'id'; }

    static get tableName() { return 'admins'; }

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



    static findByUsername(username) {
        return  AdminModels.query().findOne({ username })
    }


    static findByEmail(email) {
        return  AdminModels.query().findOne({ email })
    }


    
}

export default AdminModels;
