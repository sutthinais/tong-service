import express from 'express';
import * as http from 'http';
import { CommonRoutesConfig } from './models/appllication';
import { TongsRoutes} from './routes/routes.config';
import cors from 'cors';
import * as expressWinston from 'express-winston';
import debug from 'debug';
import * as dotenv from 'dotenv';
import {configurationOptions} from './configs/cors.conf';
import {loggerOptions} from './configs/logger.option.conf'
import bodyParser from 'body-parser';


dotenv.config();
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.APP_PORT;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

const RUNNING_MESSAGES = `Server running http://192.168.11.111:${process.env.APP_PORT}`;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(configurationOptions));

if (!process.env.DEBUG) {
    loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));
routes.push(new TongsRoutes(app));

server.listen(port, async () => {
// await init();
routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
});
console.log(RUNNING_MESSAGES);
});