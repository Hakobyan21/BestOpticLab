// NPM modules
import Joi from 'joi';

const AuthSchema = {
    loginSchema: {
        body: Joi.object({
            username: Joi.string().min(3),
            email:Joi.string().email(),
            password: Joi.string().min(3).required(),
        }).or('username','email')
    }
};

export default AuthSchema;
