// NPM Modules
import { Model } from 'objection';

// Local Modules
// import Status from '../enum/status.enum';
// import Role from '../enum/role.enum';

class UsersRateItems extends Model {
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
    // static getOneOrFail(id) {
    //     return UsersRateItems.query().findById(id).throwIfNotFound();
    // }

    static async getById(id){
        const data = await UsersRateItems.query().findById(id);
        if(data) {
        if(data.rates !== null) {
            delete data.rateReplyDetails
            return data;
        }else {
            delete data.rates
            return data;
        }
    }
    }

    static async create(payload) {
        

        // if(payload.rateReplyDetails) {
        
            return UsersRateItems.query().insert(payload);
        // }
    }
    
    // static update(id, status){
    //     return UsersRateItems.query()
    //         .update({ status })
    //         .where('id', '=', id)
    //         .returning('*');
    // }
    

    static findByEmail(email) {
        return UsersRateItems.query().findOne({ email });
    }

    // static  fullList(){
    //     return  UsersRateItems.query()
    //         .select('*')
    //         .orderBy('id');
    // }

    // static list(){
    //     return UsersRateItems.query()
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

    static deleteById(id) {
        return UsersRateItems.query().select('*').where('id','=',id).del().returning('*');
    }
    
}

export default UsersRateItems;
