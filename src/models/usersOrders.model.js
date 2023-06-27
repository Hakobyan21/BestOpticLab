// NPM Modules
import { Model } from 'objection';

// Local Modules
// import Status from '../enum/status.enum';
// import Role from '../enum/role.enum';

class UsersOrders extends Model {
    static get idColumn() { return 'id'; }

    static get tableName() { return 'usersorders'; }

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
    // static getOneOrFail(id) {
    //     return UsersOrders.query().findById(id).throwIfNotFound();
    // }

    static getById(id){
        return UsersOrders.query().findById(id);
    }

    static async create(payload) {
        return UsersOrders.query().insert(payload);
    }
    
    // static update(id, status){
    //     return UsersOrders.query()
    //         .update({ status })
    //         .where('id', '=', id)
    //         .returning('*');
    // }
    

    static findByEmail(email) {
        return UsersOrders.query().findOne({ email });
    }

    // static  fullList(){
    //     return  UsersOrders.query()
    //         .select('*')
    //         .orderBy('id');
    // }

    // static list(){
    //     return UsersOrders.query()
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

    // static delete (id) {
    //     return UsersOrders.query().select('*').where('id','=',id).del().returning('*');
    // }
    
}

export default UsersOrders;
