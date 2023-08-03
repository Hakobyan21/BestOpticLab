// NPM Modules
import { Model } from 'objection';
import { ErrorsUtil } from '../utils';
import knex from 'knex';
import knexConfigs from '../../knex.configs';
const pg = knex(knexConfigs.development);

// Local Modules
const { InputValidationError } = ErrorsUtil;

class CompanySettingsModel extends Model {
    static get idColumn() { return 'id'; }

    static get tableName() { return 'company_settings'; }

    $formatJson(json) {
        json = super.$formatJson(json);
        delete json.password;
        return json;
    }

    $beforeInsert() {
        const date = new Date();
        this.created_at = date;
    }

    $beforeUpdate() {
        const date = new Date();
        this.updated_at = date;
    }

    // Methods
    static companySettings() {
        return CompanySettingsModel.query().select('*').orderBy('id');
    }
    static changeCompanySettings(data) {
        return CompanySettingsModel.query().update(data).returning('*');
    }
    static async addCompanySettings(data) {
        try {
            const colName = Object.keys(data)[0];
            const value = Object.values(data)[0];
            
            // Check if the column already exists in the table
            const tableExists = await pg.schema.hasColumn(this.tableName, colName);
            if (!tableExists) {
                // If the column doesn't exist, add it to the table
                await pg.schema.table(this.tableName, function (table) {
                    table.string(colName);
                });
            }

            // Insert the data into the table
            return CompanySettingsModel.query().update({ [colName]: value }).returning('*');
        } catch (error) {
            console.error('Error adding company settings:', error);
            throw error;
        }
    }
    
    static deleteCompanySettings(colname) {
        try {
            return pg.schema.alterTable('company_settings', function(table) {
                table.dropColumn(colname);
            });
        } catch (error) {
            console.error('Error deleting company settings:', error);
            throw error;
        }
     
        // return CompanySettingsModel.query().update(data).returning('*');
    }
    
}

export default CompanySettingsModel;
