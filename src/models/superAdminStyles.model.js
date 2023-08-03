// NPM Modules
import { Model } from 'objection';

// Local Modules
// import Status from '../enum/status.enum';
// import Role from '../enum/role.enum';

class SuperAdminStylesModel extends Model {
    static get idColumn() { return 'id'; }

    static get tableName() { return 'superstyles'; }

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
        return SuperAdminStylesModel.query().findById(id).throwIfNotFound();
    }

    static getById(id){
        return SuperAdminStylesModel.query().findById(id);
    }

    static getByTitleDiv(title_div){
        return SuperAdminStylesModel.query().select('*').where('title_div', '=', title_div).orderBy('id');
    }

    static async create(payload) {
        console.log(payload,'payl/oad');
        return SuperAdminStylesModel.query().insert(payload);
    }

    static async changeStyles(id, update) {
        return SuperAdminStylesModel.query().update(update).where({id}).returning('*').orderBy('id');
    }


    static delete (id) {
        return SuperAdminStylesModel.query().select('*').where('id','=', id).del().returning('*');
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

export default SuperAdminStylesModel;
