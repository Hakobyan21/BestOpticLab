// NPM Modules
import knex from "knex";
import knexConfigs from "../knex.configs";
import process from "process";

// Local Modules
import { LoggerUtil } from "../src/utils";

function up(pg) {
  return (
    pg.schema
      .createTable("users", (table) => {
        table.increments("id").primary();
        table.string("email").notNullable();
        table.string("password");
        table.string("username");
        table.string("role");
        table.string("googleId");
        table.string("displayName");
        table.string("picture");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("admins", (table) => {
        table.increments("id").primary();
        table.string("username").notNullable().unique();
        table.string("password");
        table.string("role");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("superLogin", (table) => {
        table.integer("id").defaultTo(1);
        table.string("title");
        table.string("login_title");
        table.string("password_title");
        table.string("signUp_title");
        table.string("registration_title");
        table.string("remember_title");
        table.string("signIn_title");
        table.string("loginBg_color");
        table.string("login_color");
        table.string("buttonBg_color");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("supersettings", (table) => {
        table.integer("id").defaultTo(1);
        table.string("logo");
        table.string("address");
        table.string("director");
        table.string("company_name");
        table.string("company_address");
        table.boolean("paypal");
        table.boolean("google_pay");
        table.boolean("stripe");
        table.boolean("login_version1");
        table.boolean("login_version2");
        table.boolean("login_version3");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("superstyles", (table) => {
        table.increments("id").primary();
        table.string("title_div");
        table.string("title");
        table.text("text");
        table.string("image");
        table.string("color");
        table.text("note");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("superabout", (table) => {
        table.increments("id").primary();
        table.string("title_div");
        table.string("title");
        table.text("text");
        table.string("image");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("superhome", (table) => {
        table.increments("id").primary();
        table.string("image");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("superterms", (table) => {
        table.increments("id").primary();
        table.text("text");
        table.string("title_div");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("super_admin", (table) => {
        table.increments("id").primary();
        table.string("table_names").unique();
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("supermessages", (table) => {
        table.increments("id").primary();
        table.string("email").notNullable();
        table.string("name").notNullable();
        table.text("message").notNullable();
        table.boolean("seen").defaultTo(false);
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("usersrateitems", (table) => {
        table.increments("id").primary();
        table.specificType("rates", "text[]");
        table.specificType("rateReplyDetails", "text[]");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("usersorders", (table) => {
        table.increments("id").primary();
        table.specificType("orderinfo", "text[]");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("pdfFiles", (table) => {
        table.increments("id").primary();
        table.string("pdfName");
        table.dateTime("created_at");
      })
      .createTable("our_address", (table) => {
        table.increments("id").primary();
        table.string("name");
        table.string("company");
        table.string("street1");
        table.string("street2");
        table.string("city");
        table.string("state");
        table.string("zip");
        table.string("country");
        table.string("phone");
        table.string("email");
        table.string("metadata");
        table.dateTime("created_at");
      })
      .createTable("shippo", (table) => {
        table.increments("id").primary();
        table.string("provider");
        table.string("estimated_days");
        table.string("duration_terms");
        table.string("object_id");
        table.string("amount");
        table.string("currency");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("boxparams", (table) => {
        table.increments("id").primary();
        table.integer("length");
        table.integer("width");
        table.integer("height");
        table.string("mass_unit");
        table.integer("weight");
        table.string("distance_unit");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("rates_details", (table) => {
        table.increments("id").primary();
        table.specificType("rateShippo", "text[]");
        table.specificType("rateFedex", "text[]");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("payment_methods", (table) => {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.boolean("status").defaultTo(true);
        table.string("icon");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("ship_methods", (table) => {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.boolean("status").defaultTo(true);
        table.string("icon");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("paypal_orders", (table) => {
        table.increments("id").primary();
        table.specificType("order", "text[]");
        table.dateTime("created_at");
      })
      .createTable("company_settings", (table) => {
        table.increments("id").primary();
        table.string("logo");
        table.string("phone");
        table.string("director");
        table.string("company_name");
        table.string("company_address");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })

      // ------------------------------------------T a s k s ------------------------------------------------------------------------------

      .createTable("employes", (table) => {
        table.increments("id").primary();
        table.string("name");
        table.string("surname");
        table.string("position");
        table.string("picture");
        table.string("email");
        table.string("role");
        table.string("password");
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
      .createTable("tasks", (table) => {
        table.increments("id").primary();
        table
          .integer("employes_id")
          .unsigned()
          .references("id")
          .inTable("employes");
        table.string("tasks_name");
        table.string("tasks_description");
        table.string("tasks_start");
        table.string("tasks_end");
        table.boolean("tasks_status").defaultTo(false);
        table.dateTime("created_at");
        table.dateTime("updated_at");
      })
  );
}

async function init() {
  try {
    const options =
      process.env.NODE_ENV === "production"
        ? knexConfigs.production
        : knexConfigs.development;
    const pg = knex(options);
    await up(pg);
    console.log("Successfully created all tables ... ");
    process.kill(process.pid);
  } catch (error) {
    LoggerUtil.error(error.message);
  }
}

init();
