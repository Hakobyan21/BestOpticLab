// NPM Modules
import knex from 'knex';
import knexConfigs from '../knex.configs';
import process from 'process';
const pg = knex(knexConfigs.development);

// Drop
import { LoggerUtil } from '../src/utils';
class DropTables{
    static async dropCreatedTables(){
        
        const table_names = await pg('super_admin').select('table_names');
        for (const elem of table_names) {
            await pg.schema.dropTableIfExists(elem.table_names);
        }


    }
    static down(){
        return pg.schema
            .dropTableIfExists('users')
            .dropTableIfExists('superLogin')
            .dropTableIfExists('supersettings')
            .dropTableIfExists('superstyles')
            .dropTableIfExists('superabout')
            .dropTableIfExists('superhome')
            .dropTableIfExists('superterms')
            .dropTableIfExists('super_admin')
            .dropTableIfExists('supermessages')
            .dropTableIfExists('usersrateitems')
            .dropTableIfExists('usersorders')
            .dropTableIfExists('pdfFiles')
            .dropTableIfExists('our_address')
            .dropTableIfExists('shippo')
            .dropTableIfExists('rates_details')
            .dropTableIfExists('admins')
            .dropTableIfExists('boxparams')
            .dropTableIfExists('payment_methods')
            .dropTableIfExists('ship_methods')
            .dropTableIfExists('paypal_orders')
            .dropTableIfExists('company_settings')
            .dropTableIfExists('tasks')
            .dropTableIfExists('tasks_admin')        
            .dropTableIfExists('employes');                    
            
    }

}

async function init() {
    try {
        await DropTables.dropCreatedTables();
        await DropTables.down();
        console.log('Successfully dropped all tables ... ');
        process.kill(process.pid);
    } catch (error) {
        LoggerUtil.error(error.message);
    }
}

init();
