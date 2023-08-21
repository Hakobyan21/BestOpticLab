// NPM Modules
import Joi from 'joi';


const AddSchema = {

    inserting: {
        body: Joi.array().items(Joi.object({
            tableName: Joi.string().required(),
            columnName: Joi.string().required(),
            value: Joi.string(),
            id: Joi.string().required()
        })).required()
    },

    createTable: {
        body: Joi.array().items(Joi.string().required(),
         Joi.object({
            columnName: Joi.string().required(),
        }).required(),
        Joi.object({
            value:Joi.string()
        }).required()).required(),
        
    },

    addStyles: {
        body: Joi.object({
            title_div: Joi.string(),
            title: Joi.string(),
            text: Joi.string(),
            image: Joi.string(),
            color: Joi.string(),
            note: Joi.string()
        })
    },
    
    addAbout: {
        body: Joi.object({
            title_div: Joi.string().required(),
            title: Joi.string().required(),
            text: Joi.string(),
            image: Joi.string().uri()
        })
    },
    
    addToHome: {
        body: Joi.object({
            image: Joi.string().uri().required()
        })
    },

    createPDF: {
        body: Joi.array().items(
            Joi.array().items(
                Joi.string().required(),
                Joi.string().required(),
                Joi.string().required()).required(),
            Joi.array().items(
                Joi.string().required(),
                Joi.string().required(),
                Joi.string().required()).required()
        ).required()
    },

    sendMail: {
        body: Joi.object({
            email: Joi.string().email().required(),
            subject: Joi.string().required(),
            message: Joi.string().required()
        })
    }

    
};

export default AddSchema;
