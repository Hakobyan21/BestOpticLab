// Standard modules
import http from 'http';
import 'dotenv/config';
import 'regenerator-runtime';

// Modules from this project
import { LoggerUtil } from '../utils';
import App from '../app';

// Constants
import config from '../config/variables.config';
import { name } from '../../package.json';

const { PORT } = config;

const init = async () => {

    
    const server = http.createServer(App.app);
    App.init(server);

    const _onError = (error) => {
        LoggerUtil.error(error.message);
    };

    const _onListening = () => {
        const address = server.address();
        const bind = typeof address === 'string'
            ? `pipe ${address}`
            : `${address.port}`;

        LoggerUtil.info(`${name} started:`);
        LoggerUtil.info(`\tPort: ${bind}`);
        LoggerUtil.info(`\tStart date: ${(new Date()).toUTCString()} \n`);
    };

    server.listen(PORT);
    server.on('error', _onError);
    server.on('listening', _onListening);
};


// const localtunnel = require('localtunnel');

//  // The port number your local server is listening on

// (async () => {
//   const tunnel = await localtunnel({ port: PORT });
  
//   console.log(`Tunnel URL: ${tunnel.url}`);

//   tunnel.on('close', () => {
//     console.log('Tunnel closed');
//   });
// })();

module.exports = init().catch(LoggerUtil.error);
