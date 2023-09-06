// NPM Modules
import { ErrorsUtil } from "../utils";
const { InputValidationError } = ErrorsUtil;

import knex from "knex";
import knexConfigs from "../../knex.configs";
import { LoggerUtil } from "../../src/utils";
const pg = knex(knexConfigs.development);
class TasksModel {
  static async create(payload) {
    let user;
    if (payload.email) {
      user = await pg("employes")
        .select("*")
        .where("email", "=", payload.email);
    }
    if (user == undefined || user.length == 0) {
      return pg("employes")
        .insert({
          name: payload.name,
          surname: payload.surname,
          position: payload.position,
          picture: payload.picture,
          email: payload.email,
          password: payload.password,
          created_at: new Date(),
        })
        .returning("*");
    } else {
      throw new InputValidationError("User with this email already exist");
    }
  }

  static async get(limit, offset) {
    const data = await pg("employes")
      .select("id", "name", "surname", "position", "picture", "email")
      .offset((offset - 1) * limit)
      .limit(limit * offset)
      .where("id", ">", 1)
      .orderBy("employes.id");

    return data;
  }
  static async put(info, id) {
    return pg("employes").update(info).where("id", "=", id).returning("*");
  }
  static async delete(id) {
    return pg("employes").del().where("id", "=", id).returning("*");
  }
  static getAll() {
    return pg("employes")
      .select("id", "name", "surname", "position", "email")
      .where("id", ">", 1)
      .orderBy("id");
  }
  static async task(limit, offset) {
    const arrayTasks = [];
    const enpName = await pg("employes").select("id", "name").orderBy("id");
    const temp = await pg("tasks")
      .select(
        "id",
        "tasks_name",
        "tasks_description",
        "tasks_start",
        "tasks_end",
        "employes_id"
      )
      .offset((offset - 1) * limit)
      .limit(limit * offset)
      .orderBy("id");
      console.log(temp);

    for (let i in temp) {
      if (
        temp[i].tasks_name !== null &&
        temp[i].tasks_description !== null &&
        temp[i].tasks_start !== null &&
        temp[i].tasks_end !== null
      ) {
        arrayTasks.push(temp[i]);
      }
    }
    for (let j in arrayTasks) {
      for (let k in enpName) {
        if (arrayTasks[j].employes_id === enpName[k].id) {
          arrayTasks[j].name = enpName[k].name;
        }
      }
    }
    return arrayTasks;
  }
  static async getOne(id) {
    const arrayTasks = [];
    const temp = await pg("tasks")
      .select(
        "id",
        "tasks_name",
        "tasks_description",
        "tasks_start",
        "tasks_end",
        "tasks_status"
      )
      .where("id", "=", id)
      .orderBy("id");

    for (let i in temp) {
      if (
        temp[i].tasks_name !== null &&
        temp[i].tasks_description !== null &&
        temp[i].tasks_start !== null &&
        temp[i].tasks_end !== null
      ) {
        arrayTasks.push(temp[i]);
      }
    }
    return arrayTasks;
  }
  static async getById(id) {
    const a = await pg("employes")
      .select("id", "name", "surname", "position", "email", "picture")
      .where("id", "=", id)
      .orderBy("id");
    return a;
  }
  static async checkBox(info, id) {
    return pg("tasks")
      .update(info)
      .where("id", "=", id)
      .returning("*");
  }

  static addTasks(info) {
    return pg("tasks").insert(info).returning("*");
  }

  static async getTasks(id) {
    // const empName = await pg('employes').select('name').where('id','=',id)
    const data = await pg()
      .select("*")
      .from("employes")
      .join("tasks", "employes.id", "tasks.employes_id")
      .where("employes.id", "=", id)
      .orderBy("employes.id");

    return data;
  }
  static editTasks(info, id) {
    return pg("tasks").update(info).where("id", "=", id).returning("*");
  }
  static deleteTasks(id) {
    return pg("tasks").del().where("id", "=", id).returning("*");
  }
  static searchString() {
    return pg("tasks").select("*");
  }

  
}

export default TasksModel;
