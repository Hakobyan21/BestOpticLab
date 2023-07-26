// NPM Modules
import Joi from 'joi';
import { ID } from './type';

const DeleteSchema = {

    dropColumn: {
        body: Joi.object({
            tableName: Joi.string().required(),
            columnName: Joi.string().required()
        })
    },
    
    deleteById: {
        params: Joi.object({
          id: ID.required()
        })
      },
    
};

export default DeleteSchema;
