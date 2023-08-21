// Local Modules
import PDFDocument from 'pdfkit';
import fs from 'fs';
import nodemailer from 'nodemailer'; 
import bcrypt from 'bcrypt';

import { SuperAdminModel,
         CompanySettingsModel, 
         SuperAdminLoginModel, 
         SuperAdminSettingsModel, 
         SuperAdminStylesModel, 
         SuperAdminAboutModel, 
         SuperAdminHomeModel, 
         SuperAdminTermsModel, 
         SuperAdminMessagesModel } from '../models';


export default class SuperAdminServices {
    
    static async createAdmin(info){
        const password = await bcrypt.hash(info.password, 10);
        delete info.password;
        return SuperAdminModel.createAdmin({...info, password});
    }
    static async addTable(info){
        return SuperAdminModel.addTable(info);
    }
    static async dropTable(dropInfo){
        return SuperAdminModel.dropTable(dropInfo);
    }
    static async dropColumn(dropColumn){
        return SuperAdminModel.dropColumn(dropColumn);
    }
    static async changeTableName(editTableName){
        return SuperAdminModel.changeTableName(editTableName);
    }
    static async changeColumnName(editColumnName){
        return SuperAdminModel.changeColumnName(editColumnName);
    }
    static async addColumn(addColumn){
        return SuperAdminModel.addColumn(addColumn);
    }
    static async getColumns(){
        return SuperAdminModel.getColumns();
    }
    
    static async insertValues(insertingData){
        return SuperAdminModel.insertValues(insertingData);
    }
    static async getPrice(tableNames){
        return SuperAdminModel.getPrice(tableNames);
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
        return SuperAdminModel.getPDF(data);
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
        return SuperAdminModel.changeCompanyData(user);
    }



    static addBoxParams(payload) {
        return SuperAdminModel.addBoxParams(payload);
    }
    static getBoxParams() {
        return SuperAdminModel.getBoxParams();
    }
    


    static changeBoxParams(payload) {
        return SuperAdminModel.changeBoxParams(payload);
    }
    
    static companySettings() {
        return CompanySettingsModel.companySettings();
    }
    static changeCompanySettings(data) {
        return CompanySettingsModel.changeCompanySettings(data);
    }
    static addCompanySettings(data) {
        return CompanySettingsModel.addCompanySettings(data);
    }
    static deleteCompanySettings(colname) {
        return CompanySettingsModel.deleteCompanySettings(colname);
    }
     
    
}