// NPM Modules
import { Model } from 'objection';
import { ErrorsUtil } from '../utils';

// Local Modules
// import Status from '../enum/status.enum';
// import Role from '../enum/role.enum';

const { InputValidationError } = ErrorsUtil;

class UsersModel extends Model {
    static get idColumn() { return 'id'; }

    static get tableName() { return 'users'; }

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
    //     return UsersModel.query().findById(id).throwIfNotFound();
    // }

    // static getById(id){
    //     console.log(id);
    //     return UsersModel.query().findById(id);
    // }

    static async create(payload) {
        const user = await UsersModel.query().select('*').where('email', '=', payload.email);
        if(user.length == 0) {
            return UsersModel.query().insert(payload);
        }else {
            throw new InputValidationError('User with this email already exist');
        }
    }
    
    // static update(id, status){
    //     return UsersModel.query()
    //         .update({ status })
    //         .where('id', '=', id)
    //         .returning('*');
    // }
    

    static findByEmail(email) {
        return UsersModel.query().findOne({ email });
    }

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

    // static delete (id) {
    //     return UsersModel.query().select('*').where('id','=',id).del().returning('*');
    // }
    
}

export default UsersModel;
