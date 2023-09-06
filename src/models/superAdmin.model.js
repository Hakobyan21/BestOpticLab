import knex from "knex";
import knexConfigs from "../../knex.configs";
import { LoggerUtil } from "../../src/utils";
import process from "process";
const pg = knex(knexConfigs.development);
const dirname = process.env.SERVER_HOST;

class superAdminModel {
  static all_table_names = [];
  static columns;

  static async createAdmin(info) {
    try {
      const makeAdmin = await pg("admins")
        .insert({
          username: info.username,
          password: info.password,
          role: "admin",
          created_at: new Date(),
        })
        .onConflict("username")
        .ignore();
      return "create Succesfully!!!!!!!!!";
    } catch (error) {
      console.log(error);
    }
  }

  static async addTable(info) {
    console.log(info);
    // console.log(info.info[0].value,'1212121212211212');

    let price1;
    let price2;

    if (
      typeof info.info[info.info.length - 2] === "string" &&
      typeof info.info[info.info.length - 1] === "string"
    ) {
      price1 = info.info[info.info.length - 1];
      price2 = info.info[info.info.length - 2];
    }

    const tableNames = info.info[0];
    superAdminModel.all_table_names.push(tableNames);

    try {
      const options =
        process.env.NODE_ENV === "production"
          ? knexConfigs.production
          : knexConfigs.development;
      const pg = knex(options);

      await pg("super_admin")
        .insert({ table_names: tableNames })
        .onConflict("table_names")
        .ignore();

      const tableExists = await pg.schema.hasTable(tableNames);

      if (!tableExists) {
        await pg.schema.createTable(tableNames, function (table) {
          table.increments("id");
          table.string("table_name");
          table.string("column_name");
          table.string("value");
          table.integer("price_user");
          table.integer("price_company");
          table.boolean("is_active");
          table.timestamps(false, true);
        });
      }

      if (price1 && price2) {
        await pg(`${tableNames}`).insert({
          table_name: tableNames,
          column_name: info.info[1].columnName,
          price_user: price1,
          price_company: price2,
          is_active: false,
        });
        // }
      } else if (info.info.length == 2) {
        await pg(`${tableNames}`).insert({
          table_name: tableNames,
          column_name: info.info[1].columnName,
          is_active: null,
        });
        // }
      } else {
        let argument = info.info[2].value;
        info.info.pop();
        superAdminModel.columns = info.info[1].columnName;
        await pg(`${tableNames}`).insert({
          table_name: tableNames,
          column_name: info.info[1].columnName,
          is_active: null,
        });
        await pg(`${tableNames}`)
          .update({ value: `${argument}` })
          .where("table_name", "=", tableNames)
          .andWhere("column_name", "=", superAdminModel.columns);
      }
      await pg.destroy();
      return "Table created successfully!";
    } catch (error) {
      LoggerUtil.error(error.message);
      return "Table already exist";
    }
  }

  static async dropColumn(dropColumn) {
    const dropColumns = dropColumn.dropColumn;

    const options =
      process.env.NODE_ENV === "production"
        ? knexConfigs.production
        : knexConfigs.development;
    const pg = knex(options);
    try {
      const temp = await pg(dropColumns.tableName)
        .del()
        .where("column_name", "=", dropColumns.columnName)
        .returning("*");
      const delSuperAdmin = await pg("super_admin")
        .del()
        .where("table_names", "=", dropColumns.tableName)
        .returning("*");

      pg.destroy();
      return ["deleted successfully !!!!", temp, delSuperAdmin];
    } catch (error) {
      return "inCorrect column name Arm Jan";
    }
  }

  static async changeColumnName(editColumnName) {
    const edit = editColumnName.editColumneName;
    const tableName = edit.tableName;
    const oldColumnName = edit.oldName;
    const newColumnName = edit.newName;
    const newPrice_company = edit.newPrice_company;
    const newPrice_user = edit.newPrice_user;
    const id = edit.id;

    const options =
      process.env.NODE_ENV === "production"
        ? knexConfigs.production
        : knexConfigs.development;
    const pg = knex(options);

    if (newPrice_company && newPrice_user) {
      await pg(tableName)
        .update({
          column_name: newColumnName,
          price_user: newPrice_user,
          price_company: newPrice_company,
        })
        .where("id", "=", id);
    } else if (newPrice_user) {
      await pg(tableName)
        .update({ column_name: newColumnName, price_user: newPrice_user })
        .where("id", "=", id);
    } else if (newPrice_company) {
      await pg(tableName)
        .update({ column_name: newColumnName, price_company: newPrice_company })
        .where("id", "=", id);
    } else {
      await pg(tableName)
        .update({ column_name: newColumnName })
        .where("id", "=", id);
    }

    pg.destroy();
    console.log("Columns renamed successfully");
  }
  catch(error) {
    return "Incorrect column name ARMs";
  }

  static async getColumns() {
    const data = [];
    console.log(superAdminModel.all_table_names.length);
    try {
      const options =
        process.env.NODE_ENV === "production"
          ? knexConfigs.production
          : knexConfigs.development;
      const pg = knex(options);
      const allTableNames = await pg("super_admin")
        .select("table_names")
        .orderBy("id");
      console.log(allTableNames);
      //  console.log(allTableNames);
      for (let i in allTableNames) {
        data.push(
          await pg("super_admin")
            .select("*")
            .from(`${allTableNames[i].table_names}`)
            .orderBy("id")
        );
      }

      return data.flat();
    } catch (error) {
      console.log(error);
      return "Table is empty";
    }
  }

  static async insertValues(insertingData) {
    console.log(insertingData);
    const info = [];
    let prices_user = 0;
    let price_company = 0;

    try {
      const options =
        process.env.NODE_ENV === "production"
          ? knexConfigs.production
          : knexConfigs.development;

      const pg = knex(options);

      for (let i in insertingData) {
        const data = insertingData[i];
        const tableName = data.tableName;
        const columns = data.columnName;
        const price_user = data.price_user;
        const price_company = data.price_company;
        const values = data.value;
        const id = data.id;

        if (price_company || price_user) {
          info.push(
            await pg(tableName)
              .update({
                column_name: columns,
                price_user: price_user,
                price_company: price_company,
                value: values,
              })
              .where("id", "=", id)
              .returning("*")
          );
        } else {
          info.push(
            await pg(tableName)
              .update({ column_name: columns, value: values })
              .where("id", "=", id)
              .returning("*")
          );
        }
      }
      for (let item in info) {
        prices_user += info[item][0].price_user;
        price_company += info[item][0].price_company;
      }

      return [
        { price_user: prices_user, price_company: price_company },
        "Data inserted successfully",
      ];
    } catch (error) {
      console.log(error);
      return "Error inserting data";
    }
  }

  static async getPrice() {
    console.log(superAdminModel.tableNames);
    const info = [];
    let prices_user = 0;
    let price_company = 0;

    try {
      const options =
        process.env.NODE_ENV === "production"
          ? knexConfigs.production
          : knexConfigs.development;
      const pg = knex(options);
      for (let name in superAdminModel.tableNames) {
        info.push(
          await pg(superAdminModel.tableNames[name]).select(
            "id",
            "price_user",
            "price_company"
          )
        );
      }
      for (let item in info) {
        prices_user += info[item][0].price_user;
        price_company += info[item][0].price_company;
      }

      return { price_user: prices_user, price_company: price_company };
    } catch (error) {
      console.log(error);
      return "Price is empty";
    }
  }

  static async getPDF(informatika) {
    const data = [];
    try {
      const allTableNames = await pg("super_admin").select("table_names");
      for (let i in allTableNames) {
        data.push(
          await pg
            .select(
              "table_name",
              "column_name",
              "value",
              "price_user",
              "price_company"
            )
            .from(`${allTableNames[i].table_names}`)
        );
      }
      if (informatika !== undefined) {
        const pdfFiles = await pg("pdfFiles")
          .insert({ pdfName: informatika, created_at: new Date() })
          .returning("*");
        console.log(pdfFiles);
      }

      return data;
    } catch (error) {
      console.log(error);
      return "PDF genarating failed please repet !!!";
    }
  }

  static async getOurAddress() {
    try {
      const ourData = await pg("our_address").select("*");
      return ourData;
    } catch (error) {
      console.log(error);
    }
  }

  static async changeCompanyData(data) {
    let keys;
    let values;
    let ourData;
    try {
      keys = Object.keys(data[0]);
      values = Object.values(data[0]);
      for (let temp = 0; temp < keys.length; temp++) {
        ourData = await pg("our_address")
          .update({ [keys[temp]]: values[temp] })
          .where("id", "=", 1);
      }
      return "success";
    } catch (error) {
      console.log(error);
      return "change failed";
    }
  }

  static async rateDetails(data) {
    console.log(data[0]);
    try {
      if (data[0].serviceType) {
        const insertData = await pg("rates_details")
          .insert({ rateFedex: data })
          .returning("id");
        return "success", insertData;
      }
      const insertData = await pg("rates_details")
        .insert({ rateShippo: data })
        .returning("id");
      return "success", insertData;
    } catch (error) {
      console.log(error);
      return "change failed";
    }
  }

  static async getRateDetails(id) {
    try {
      const selectedData = await pg("rates_details")
        .select("*")
        .where("id", "=", id);

      if (selectedData[0].rateShippo !== null) {
        delete selectedData[0].rateFedex;
        return "success", JSON.parse(selectedData[0].rateShippo);
      }
      delete selectedData[0].rateShippo;
      return "success", JSON.parse(selectedData[0].rateFedex);
    } catch (error) {
      console.log(error);
      return "change failed";
    }
  }

  static async addBoxParams(payload) {
    try {
      const selectedData = await pg("boxparams").insert({
        ...payload,
        created_at: new Date(),
      });

      return "success";
    } catch (error) {
      console.log(error);
      return "failed";
    }
  }

  static async changeBoxParams(payload) {
    try {
      if (payload.ids.length > 0) {
        const method = await pg("ship_methods")
          .select("*")
          .whereIn("id", payload.ids);
        for (let i = 0; i < method.length; i++) {
          if (method[i].status == true) {
            await pg("ship_methods")
              .update({ status: false })
              .whereIn("id", payload.ids);
          } else {
            await pg("ship_methods")
              .update({ status: true })
              .whereIn("id", payload.ids);
          }
        }
        return pg("ship_methods").select("*");
      } else {
        const changedData = await pg("boxparams")
          .update({
            weight: payload.weight,
            height: payload.height,
            length: payload.length,
            width: payload.widht,
            distance_unit: payload.distance_unit,
            mass_unit: payload.mass_unit,
            updated_at: new Date(),
          })
          .where("id", "=", 1);
        return pg("boxparams").select("*");
      }
    } catch (error) {
      console.log(error);
      return "change failed";
    }
  }

  static async getBoxParams() {
    try {
      const data = await pg("boxparams").select("*").first();
      return data;
    } catch (error) {
      console.log(error);
      return "failed";
    }
  }

  static async createPaypalOrder(payload) {
    try {
      const data = await pg("paypal_orders")
        .insert({ order: payload, created_at: new Date() })
        .returning("id");
      return data;
    } catch (error) {
      console.log(error);
      return "failed";
    }
  }
}

export default superAdminModel;
