// NPM Modules
import Joi from 'joi';
import { ID } from './type';


const ChangeSchema = {
    changeColumnName: {
        body: Joi.object({
            tableName: Joi.string().required(),
            columnName: Joi.string().required(),   
            newPrice_user: Joi.string(),
            newPrice_company: Joi.string(),
            id: Joi.string().required()
        })
    },

    changeLoginOptions: {
        body: Joi.object({
            title: Joi.string(),
            login_title: Joi.string(),
            password_title: Joi.string(),
            signUp_title: Joi.string(),
            registration_title: Joi.string(),
            remember_title: Joi.string(),
            signIn_title: Joi.string(),
            loginBg_color: Joi.string(),
            login_color: Joi.string(),
            buttonBg_color: Joi.string()
        })
    },

    changeSettings: {
        body: Joi.object({
            logo: Joi.string().uri(),
            address: Joi.string().required(),
            director: Joi.string(),
            company_name: Joi.string(),
            company_address: Joi.string(),
            paypal: Joi.boolean(),
            google_pay: Joi.boolean(),
            stripe: Joi.boolean(),
            login_version1: Joi.boolean(),
            login_version2: Joi.boolean(),
            login_version3: Joi.boolean()
        })
    },

    changeStyles: {
        body: Joi.object({
            id: Joi.number().integer().positive().required(),
            title_div: Joi.string(),
            title: Joi.string(),
            text: Joi.string(),
            image: Joi.string(),
            color: Joi.string(),
            note: Joi.string().allow(null)
        })
    },

    changeAbout: {
        body: Joi.object({
            id: Joi.number().integer().positive().required(),
            title_div: Joi.string(),
            title: Joi.string(),
            text: Joi.string(),
            image: Joi.string()
        })
    },

    changeTerms: {
        body: Joi.object({
            text: Joi.string().required()
        })
    },

    changeMessage: {
        body: Joi.object({
            seen: Joi.boolean().required()
        })
    },

    changeById: {
        params: Joi.object({
            id: ID.required()
        })
    },

    changeCompanySettings: {
        body: Joi.object({
            logo: Joi.string(),
            phone: Joi.string(),
            director: Joi.string(),
            company_name: Joi.string(),
            company_address: Joi.string()
        })
    },
};

export default ChangeSchema;
