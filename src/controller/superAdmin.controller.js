// Local Modules
import { log } from 'console';
import GeneratePDF from '../middlewares/generatePDF';
import { superAdminServices } from '../services';
import { SuccessHandlerUtil } from '../utils';
import process from 'process';

// NPM Modules
// import config from '../config/variables.config';

const HOST_OF_SERVER = process.env.SERVER_HOST;

export default class UsersController {

    
    static async createAdmin(req, res, next) {
        try {
            const  { username,password }  = req.body;
            const create_admiin = await superAdminServices.createAdmin({ username,password });
        
            SuccessHandlerUtil.handleAdd(res, next, create_admiin);
        } catch (error) {
            next(error);
        }
    }



    static async addTable(req, res, next) {
        try {
            const  info  = req.body;
            const superAdmin = await superAdminServices.addTable({info});
        
            SuccessHandlerUtil.handleAdd(res, next, superAdmin);
        } catch (error) {
            console.log('111');
            next(error);
        }
    }
    static async dropTable(req, res, next) {
        try {
            const  dropInfo  = req.body;
            const superAdmin = await superAdminServices.dropTable({dropInfo});
            
            SuccessHandlerUtil.handleAdd(res, next, superAdmin);
        } catch (error) {
            console.log('111');
            next(error);
        }
    }
    static async dropColumn(req, res, next) {
        try {
            const  dropColumn  = req.body;
            const superAdmin = await superAdminServices.dropColumn({dropColumn});
            
            SuccessHandlerUtil.handleAdd(res, next, superAdmin);
        } catch (error) {
            console.log('111');
            next(error);
        }
    }
    static async changeTableName(req, res, next) {
        try {
            const  editTableName  = req.body;
            const superAdmin = await superAdminServices.changeTableName({editTableName});
            
            SuccessHandlerUtil.handleAdd(res, next, superAdmin);
        } catch (error) {
            console.log('111');
            next(error);
        }
    }
    
    static async changeColumnName(req, res, next) {
        try {
            const  editColumneName  = req.body;
            const superAdmin = await superAdminServices.changeColumnName({editColumneName});
            
            SuccessHandlerUtil.handleAdd(res, next, superAdmin);
        } catch (error) {
            console.log('111');
            next(error);
        }
    }
    static async addColumn(req, res, next) {
        try {
            const  addColumn  = req.body;
            const superAdmin = await superAdminServices.addColumn({addColumn});
            
            SuccessHandlerUtil.handleAdd(res, next, superAdmin);
        } catch (error) {
            console.log('111');
            next(error);
        }
    }
    static async getColumns(req, res, next) {
        try {
            const superAdmin = await superAdminServices.getColumns();
            
            SuccessHandlerUtil.handleAdd(res, next, superAdmin);
        } catch (error) {
            console.log('111');
            next(error);
        }
    }
    
    static async insertValues(req, res, next) {
        try {
            const  insertingData = req.body;
            const superAdmin = await superAdminServices.insertValues(insertingData);
            
            SuccessHandlerUtil.handleAdd(res, next, superAdmin);
        } catch (error) {
            console.log('111');
            next(error);
        }
    }
    static async getPrice(req, res, next) {
        try {
            const  tableNames = req.body;
            const superAdmin = await superAdminServices.getPrice(tableNames);
            
            SuccessHandlerUtil.handleAdd(res, next, superAdmin);
        } catch (error) {
            console.log('111');
            next(error);
        }
    }







    static async changeLoginOptions(req, res, next) {
        try {
            const editLoginOptions  = req.body;
            editLoginOptions.id = 1;
        
            const changes = await superAdminServices.changeLoginOptions(editLoginOptions);
            SuccessHandlerUtil.handleAdd(res, next, changes);
        } catch (error) {
            next(error);
        }
    }

    static async getLoginOptions(req, res, next) {
        try {
            const { id } = req.params;
            const user = await superAdminServices.getLoginOptionsById(id);

            SuccessHandlerUtil.handleGet(res, next, { ...user});
        } catch (error) {
            next(error);
        }
    }

    static async addPic(req, res, next) {
        try {
            const { file } = req;
            const { originalname, filename, path } = file;
            const dirname =  `${HOST_OF_SERVER}/` + path;
            SuccessHandlerUtil.handleAdd(res, next, { originalname, filename, dirname, success: true  });
        } catch (error) {
            next(error);
        }
    }

    static async changeSettings(req, res, next) {
        try {
            const editLoginOptions  = req.body;
            editLoginOptions.id = 1;        
            // let dirname = `${HOST_OF_SERVER}/upload/` + editLoginOptions.logo;
            // editLoginOptions.logo = dirname;

            const changes = await superAdminServices.changeSettings(editLoginOptions);
            SuccessHandlerUtil.handleAdd(res, next, changes);
        } catch (error) {
            next(error);
        }
    }

    static async getSettings(req, res, next) {
        try {
            const { id } = req.params;
            const user = await superAdminServices.getSettingsById(id);

            SuccessHandlerUtil.handleGet(res, next, { ...user});
        } catch (error) {
            next(error);
        }
    }

    static async getStylesByTitleDiv(req, res, next) {
        try {
            const { title_div } = req.query;
            const data = await superAdminServices.getStylesByTitleDiv(title_div);

            SuccessHandlerUtil.handleGet(res, next, { ...data});
        } catch (error) {
            next(error);
        }
    }


    static async changeStyles(req, res, next) {
        try {
            const editStyles  = req.body;
            // let dirname = `${HOST_OF_SERVER}/upload/` + editStyles.image;
            // editStyles.image = dirname;

            const changes = await superAdminServices.changeStyles(editStyles);
            SuccessHandlerUtil.handleAdd(res, next, changes);
        } catch (error) {
            next(error);
        }
    }

    static async deleteForStyles(req, res, next) {
        try {
            const { id } = req.params;
            const deletedUser = await superAdminServices.deleteForStyles(id);

            SuccessHandlerUtil.handleGet(res, next, deletedUser);
        } catch (error) {
            next(error);
        }
    }

    static async addStyle(req, res, next) {
        try {
            const style = req.body;
            const newUser = await superAdminServices.addStyle(style);

            SuccessHandlerUtil.handleAdd(res, next, newUser);
        } catch (error) {
            next(error);
        }
    }

    static async deleteForAbout(req, res, next) {
        try {
            const { id } = req.params;
            const deletedUser = await superAdminServices.deleteForAbout(id);

            SuccessHandlerUtil.handleGet(res, next, deletedUser);
        } catch (error) {
            next(error);
        }
    }

    static async deleteForHome(req, res, next) {
        try {
            const { id } = req.params;
            const deletedUser = await superAdminServices.deleteForHome(id);

            SuccessHandlerUtil.handleGet(res, next, deletedUser);
        } catch (error) {
            next(error);
        }
    }


    static async getAboutByTitleDiv(req, res, next) {
        try {
            const { title_div } = req.query;
            const data = await superAdminServices.getAboutByTitleDiv(title_div);

            SuccessHandlerUtil.handleGet(res, next, { ...data});
        } catch (error) {
            next(error);
        }
    }

    static async getHomeByTitleDiv(req, res, next) {
        try {

            const data = await superAdminServices.getHomeByTitleDiv();

            SuccessHandlerUtil.handleGet(res, next, { ...data});
        } catch (error) {
            next(error);
        }
    }

    static async getTerms(req, res, next) {
        try {
            const data = await superAdminServices.getTerms();

            SuccessHandlerUtil.handleGet(res, next, { ...data});
        } catch (error) {
            next(error);
        }
    }

    static async changeAbout(req, res, next) {
        try {
            const editStyles  = req.body;
            // let dirname = `${HOST_OF_SERVER}/upload/` + editStyles.image;
            // editStyles.image = dirname;

            const changes = await superAdminServices.changeAbout(editStyles);
            SuccessHandlerUtil.handleAdd(res, next, changes);
        } catch (error) {
            next(error);
        }
    }

    static async changeTerms(req, res, next) {
        try {
            const editTerms  = req.body;
            // let dirname = `${HOST_OF_SERVER}/upload/` + editStyles.image;
            // editStyles.image = dirname;

            const changes = await superAdminServices.changeTerms(editTerms);
            SuccessHandlerUtil.handleAdd(res, next, changes);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deletedUser = await superAdminServices.delete(id);

            SuccessHandlerUtil.handleGet(res, next, deletedUser);
        } catch (error) {
            next(error);
        }
    }

    static async addAbout(req, res, next) {
        try {
            const style = req.body;
            const newUser = await superAdminServices.addAbout(style);

            SuccessHandlerUtil.handleAdd(res, next, newUser);
        } catch (error) {
            next(error);
        }
    }

    static async addHome(req, res, next) {
        try {
            const data = req.body;
            const newData = await superAdminServices.addHome(data);

            SuccessHandlerUtil.handleAdd(res, next, newData);
        } catch (error) {
            next(error);
        }
    }











    static async getPDF(req, res, next) {
        try {                
            const data = await GeneratePDF.generateingPDF();
            // console.log(data);
            const superAdmin = await superAdminServices.getPDF(data);

            SuccessHandlerUtil.handleAdd(res, next, data);
        } catch (error) {
            console.log('111');
            next(error);
        }
    }

    static async createPDF(req, res, next) {
        try {
            console.log(req.body,1111);
            const data = req.body;
            const newData = await superAdminServices.createPDF(data);

            SuccessHandlerUtil.handleAdd(res, next, newData);
        } catch (error) {
            next(error);
        }
    }
    

    static async getMessages(req, res, next) {
        try {
            const superAdmin = await superAdminServices.getMessages();

            SuccessHandlerUtil.handleGet(res, next, superAdmin);
        } catch (error) {
            console.log('111');
            next(error);
        }
    }

    static async deleteMessage(req, res, next) {
        try {
            const {id} = req.params;
            const superAdmin = await superAdminServices.deleteMessage(id);

            SuccessHandlerUtil.handleGet(res, next, superAdmin);
        } catch (error) {
            console.log('111');
            next(error);
        }
    }

    static async changeMessageStatus(req, res, next) {
        try {
            const {id} = req.params;
            const {seen}  = req.body;

            const changes = await superAdminServices.changeMessageStatus(id, seen);
            SuccessHandlerUtil.handleAdd(res, next, changes);
        } catch (error) {
            next(error);
        }
    }

    static async sendMail(req, res, next) {
        try {
            const data = req.body;
            const newData = await superAdminServices.sendMail(data);

            SuccessHandlerUtil.handleAdd(res, next, newData);
        } catch (error) {
            next(error);
        }
    }



    static async changeCompanyData(req, res, next) {
        try {
            const data = req.body;
            const newData = await superAdminServices.changeCompanyData(data);

            SuccessHandlerUtil.handleAdd(res, next, newData);
        } catch (error) {
            next(error);
        }
    }


    static async addBoxParams(req, res, next) {
        try {
            const data = req.body;
            const newData = await superAdminServices.addBoxParams(data);

            SuccessHandlerUtil.handleAdd(res, next, newData);
        } catch (error) {
            next(error);
        }
    }
    
    static async changeBoxParams(req, res, next) {
        try {
            const data = req.body;
            const newData = await superAdminServices.changeBoxParams(data);

            SuccessHandlerUtil.handleAdd(res, next, newData);
        } catch (error) {
            next(error);
        }
    }
}
