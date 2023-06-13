// Local Modules
import PDFDocument from 'pdfkit';
import fs from 'fs';
import nodemailer from 'nodemailer'; 
import bcrypt from 'bcrypt';

import { superAdminModel } from '../models';
import SuperAdminLoginModel from '../models/superAdminLogin.model';
import SuperAdminSettingsModel from '../models/superAdminSettings.model';
import SuperAdminStylesModel from '../models/superAdminStyles.model';
import SuperAdminAboutModel from '../models/superAdminAbout.model';
import SuperAdminHomeModel from '../models/superAdminHome.model';
import SuperAdminTermsModel from '../models/superAdminTerms.model';
import SuperAdminMessagesModel from '../models/superAdminMessages.model';

export default class SuperAdminServices {
    
    static async createAdmin(info){
        const password = await bcrypt.hash(info.password, 10);
        delete info.password;
        return superAdminModel.createAdmin({...info, password});
    }
    static async addTable(info){
        return superAdminModel.addTable(info);
    }
    static async dropTable(dropInfo){
        return superAdminModel.dropTable(dropInfo);
    }
    static async dropColumn(dropColumn){
        return superAdminModel.dropColumn(dropColumn);
    }
    static async changeTableName(editTableName){
        return superAdminModel.changeTableName(editTableName);
    }
    static async changeColumnName(editColumnName){
        return superAdminModel.changeColumnName(editColumnName);
    }
    static async addColumn(addColumn){
        return superAdminModel.addColumn(addColumn);
    }
    static async getColumns(id){
        return superAdminModel.getColumns(id);
    }
    
    static async insertValues(insertingData){
        return superAdminModel.insertValues(insertingData);
    }
    static async getPrice(tableNames){
        return superAdminModel.getPrice(tableNames);
    }

    static async changeLoginOptions(update){
        return SuperAdminLoginModel.changeLoginOptions(update.id, update);
    }
    
    static async getLoginOptionsById(id) {
        return SuperAdminLoginModel.getById(id);
    }

    static async changeSettings(update){
        return SuperAdminSettingsModel.changeSettings(update.id, update);
    }

    static async getSettingsById(id) {
        return SuperAdminSettingsModel.getById(id);
    }

    static async getStylesByTitleDiv(title_div) {
        return SuperAdminStylesModel.getByTitleDiv(title_div);
    }
    

    static async changeStyles(update){
        return SuperAdminStylesModel.changeStyles(update.id, update);
    }

    static deleteForStyles(id){
        return SuperAdminStylesModel.delete(id);
    }

    static addStyle(user) {
        return SuperAdminStylesModel.create(user);
    }

    static async getAboutByTitleDiv(title_div) {
        return SuperAdminAboutModel.getByTitleDiv(title_div);
    }
    
    static async getHomeByTitleDiv() {
        return SuperAdminHomeModel.getByTitleDiv();
    }

    static async getTerms() {
        return SuperAdminTermsModel.getTerms();
    }

    static async changeTerms(update){
        return SuperAdminTermsModel.changeTerms(update);
    }

    static async changeAbout(update){
        return SuperAdminAboutModel.changeAbout(update.id, update);
    }

    static deleteForAbout(id){
        return SuperAdminAboutModel.delete(id);
    }

    static deleteForHome(id){
        return SuperAdminHomeModel.delete(id);
    }

    static addAbout(user) {
        return SuperAdminAboutModel.create(user);
    }

    static addHome(user) {
        return SuperAdminHomeModel.create(user);
    }








    static async getPDF(data){
        return superAdminModel.getPDF(data);
    }
    
    static createPDF(data) {
        // const a = data.map(({ name, surname, price }) => [name, surname, price])
        // console.log(a);
        const doc = new PDFDocument();
        const fontSize = 12;
        const lineHeight = 15;

        const x = 50;
        let y = 50;

        data.forEach(row => {
            row.forEach((cell, i) => {
                doc.rect(x + (i * 150), y, 150, lineHeight).stroke();

                doc.text(cell, x + (i * 150) + 5, y + 5, { 
                    width: 140,
                    height: lineHeight,
                    align: 'left',
                    valign: 'top',
                    fontSize: fontSize
                });
            });
            y += lineHeight;
        });

        doc.pipe(fs.createWriteStream('table.pdf'));
        doc.end();
    }

    static async getMessages() {
        return await SuperAdminMessagesModel.getMessages();
    }

    static async deleteMessage(id) {
        return await SuperAdminMessagesModel.deleteMessage(id);
    }

    static async changeMessageStatus(id, seen) {
        return await SuperAdminMessagesModel.changeMessageStatus(id, seen);
    }

    static async sendMail(data) {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                // company mail
                user: 'khachatryanartur848@gmail.com',
                pass: 'pveuruzoqugxlrbn',
            },
        });
        
        const mailOptions = {
            // company mail
            from: 'khachatryanartur848@gmail.com',
            to: data.email,
            subject: data.subject,
            text: data.message
        };
        
        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return error;
            } else {
                console.log('Email sent: ' + info.response);
                return 'Email sent successfully';
            }
        });

        return 'Email sent successfully';
    }



    static changeCompanyData(user) {
        return superAdminModel.changeCompanyData(user);
    }



    static addBoxParams(payload) {
        return superAdminModel.addBoxParams(payload);
    }


    static changeBoxParams(payload) {
        return superAdminModel.changeBoxParams(payload);
    }
}