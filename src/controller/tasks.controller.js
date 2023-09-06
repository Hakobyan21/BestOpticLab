// Local Modules

import { TasksService } from '../services';
import { SuccessHandlerUtil } from '../utils';
const HOST_OF_SERVER = process.env.SERVER_HOST;



export default class UsersController {
    static async  addPicture(req, res, next) {
        try {
            const { file } = req;
            const { originalname, filename, path } = file;

            const dirname = `${HOST_OF_SERVER}/` + path;
            SuccessHandlerUtil.handleAdd(res, next, { originalname, filename, dirname, success: true });
        } catch (error) {
            next(error);
        }
    }

    static async add(req, res, next) {
        try {
            const info = req.body;

            const result = await TasksService.add(info);
            SuccessHandlerUtil.handleAdd(res, next, result);
        } catch (error) {
            next(error);
        }
    }
    static async checkBox(req, res, next) {
        try {
            const info = req.body;
            const {id} = req.params
            const result = await TasksService.checkBox(info,id);
            SuccessHandlerUtil.handleAdd(res, next, result);
        } catch (error) {
            next(error);
        }
    }
    

    static async get(req, res, next) {
        try {
            const {limit,offset} = req.params
            const result = await TasksService.get(limit,offset);
            SuccessHandlerUtil.handleAdd(res, next, result);
        } catch (error) {
            next(error);
        }
    }
    static async put(req, res, next) {
        try {
            const info = req.body;
            const {id} = req.params
            const result = await TasksService.put(info,id);
            SuccessHandlerUtil.handleAdd(res, next, result);
        } catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const {id} = req.params
            const result = await TasksService.delete(id);
            SuccessHandlerUtil.handleAdd(res, next, result);
        } catch (error) {
            next(error);
        }
    }
    static async getAll(req, res, next) {
        try {
            const result = await TasksService.getAll();
            SuccessHandlerUtil.handleAdd(res, next, result);
        } catch (error) {
            next(error);
        }
    }
    static async task(req, res, next) {
        try {
            const {limit,offset} = req.params

            const result = await TasksService.task(limit,offset);
            SuccessHandlerUtil.handleAdd(res, next, result);
        } catch (error) {
            next(error);
        }
    }
    static async getOne(req, res, next) {
        try {
            const {id} = req.params

            const result = await TasksService.getOne(id);
            SuccessHandlerUtil.handleAdd(res, next, result);
        } catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const {id} = req.params

            const result = await TasksService.getById(id);
            SuccessHandlerUtil.handleAdd(res, next, result);
        } catch (error) {
            next(error);
        }
    }

    static async addTasks(req, res, next) {
        try {
            const info = req.body;
            console.log(info);
            const result = await TasksService.addTasks(info);
            SuccessHandlerUtil.handleAdd(res, next, result);
        } catch (error) {
            next(error);
        }
    }

    static async getTasks(req, res, next) {
        try {
            const { id } = req.params
            const result = await TasksService.getTasks(id);
            SuccessHandlerUtil.handleAdd(res, next, result);
        } catch (error) {
            next(error);
        }
    }
    

    static async editTasks(req, res, next) {
        try {
            const info = req.body;
            const { id } = req.params
            const result = await TasksService.editTasks(info,id);
            SuccessHandlerUtil.handleAdd(res, next, result);
        } catch (error) {
            next(error);
        }
    }
    static async deleteTasks(req, res, next) {
        try {
            const { id } = req.params

            const result = await TasksService.deleteTasks(id);
            SuccessHandlerUtil.handleAdd(res, next, result);
        } catch (error) {
            next(error);
        }
    }

    static async searchString(req, res, next) {
        try {
            const obj = req.body;
            const result = await TasksService.searchString(obj);
            SuccessHandlerUtil.handleAdd(res, next, result);
        } catch (error) {
            next(error);
        }
    }

    
    
}