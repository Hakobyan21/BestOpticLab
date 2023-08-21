// NPM Modules
import Joi from 'joi';

//Local MOdules
import { ID } from './type';

const UsersSchema = {

    getByIdSchema: {
        params: Joi.object({
            id: ID.required()
        })
    },

    addSchema: {
        body: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        })
    },

    editSchema: {
        params: Joi.object({
            id: ID.required()
        }),
        body: Joi.object({
            fullname: Joi.string().min(3).max(155),
            position: Joi.string().min(3).max(155),
            picture: Joi.string().min(3).max(755),
        }).or(
            'fullname',
            'position',
            'picture'
        )
    },
    

};

export default  UsersSchema;
