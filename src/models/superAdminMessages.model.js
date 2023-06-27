// NPM Modules
import { Model } from 'objection';

// Local Modules
// import Status from '../enum/status.enum';
// import Role from '../enum/role.enum';

class SuperAdminMessagesModel extends Model {
    static get idColumn() { return 'id'; }

    static get tableName() { return 'supermessages'; }

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
    static getOneOrFail(id) {
        return SuperAdminMessagesModel.query().findById(id).throwIfNotFound();
    }

    static getById(id){
        return SuperAdminMessagesModel.query().findById(id);
    }

    static async create(payload) {
        return SuperAdminMessagesModel.query().insert(payload);
    }

    static delete (id) {
        return SuperAdminMessagesModel.query().select('*').where('id','=', id).del().returning('*');
    }

    static async getMessages() {
        return SuperAdminMessagesModel.query().select('*').returning('*');
    }

    static async deleteMessage(id) {
        return SuperAdminMessagesModel.query().select('*').where('id', '=', id).del().returning('*');
    }

    static async changeMessageStatus(id, seen) {
        return SuperAdminMessagesModel.query()
            .update({seen})
            .where('id', '=', id)
            .returning('*');
    }
    
    // static update(id, status){
    //     return UsersModel.query()
    //         .update({ status })
    //         .where('id', '=', id)
    //         .returning('*');
    // }
    

    // static findByEmail(email) {
    //     return UsersModel.query().findOne({ email });
    // }

    // static  fullList(){
    //     return  UsersModel.query()
    //         .select('*')
    //         .orderBy('id');
    // }

    // static list(){
    //     return UsersModel.query()
    //         .select('id',
    //             'fullname',
    //             'picture',
    //             'position',
    //             'status'
    //         ).orderBy('id')
    //         .where(builder => builder
    //             .where('status', '=', 'active')
    //             .andWhere('role', '=', 'member')
    //         );
    // }

    
}

export default SuperAdminMessagesModel;
