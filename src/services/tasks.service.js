// Local Modules
import { TasksModel } from "../models";
import bcrypt from "bcrypt";

export default class UsersServices {
  static async add(info) {
    const password = await bcrypt.hash(info.password, 10);
    delete info.password;

    return TasksModel.create({ ...info, password });
  }

  static get(limit, offset) {
    return TasksModel.get(limit, offset);
  }
  static checkBox(info, id) {
    return TasksModel.checkBox(info, id);
  }

  static put(info, id) {
    return TasksModel.put(info, id);
  }

  static delete(id) {
    return TasksModel.delete(id);
  }
  static getAll() {
    return TasksModel.getAll();
  }
  static task(limit, offset) {
    return TasksModel.task(limit, offset);
  }
  static getOne(id) {
    return TasksModel.getOne(id);
  }
  static getById(id) {
    return TasksModel.getById(id);
  }
  static addTasks(info) {
    return TasksModel.addTasks(info);
  }
  static getTasks(id) {
    return TasksModel.getTasks(id);
  }
  static editTasks(info, id) {
    return TasksModel.editTasks(info, id);
  }
  static deleteTasks(id) {
    return TasksModel.deleteTasks(id);
  }
  static async searchString(obj) {
    const data = await TasksModel.searchString();
    let e = Object.keys(obj);
    let v = Object.values(obj);
    for (let i = 0; i < data.length; i++) {
      if(data[i][e[0]] === v[0]){
        return data[i];
      }
      else {
        return [];
      }
    }
  }
}
