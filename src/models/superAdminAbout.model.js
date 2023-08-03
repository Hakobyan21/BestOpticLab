// NPM Modules
import { Model } from 'objection';

// Local Modules
// import Status from '../enum/status.enum';
// import Role from '../enum/role.enum';

class SuperAdminAboutModel extends Model {
    static get idColumn() { return 'id'; }

    static get tableName() { return 'superabout'; }

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
        return SuperAdminAboutModel.query().findById(id).throwIfNotFound();
    }

    static getById(id){
        return SuperAdminAboutModel.query().findById(id);
    }

    static getByTitleDiv(title_div){
        return SuperAdminAboutModel.query().select('*').where('title_div', '=', title_div).orderBy('id  ');
    }

    static async create(payload) {
        return SuperAdminAboutModel.query().insert(payload);
    }

    static changeAbout(id, update) {
        return SuperAdminAboutModel.query().update(update).where({id}).returning('*');
    }


    static delete (id) {
        return SuperAdminAboutModel.query().select('*').where('id','=', id).del().returning('*');
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

export default SuperAdminAboutModel;
