import { Application, json } from 'express';
import { Container } from 'inversify';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { BASE_TYPES, BaseInfrastructureModule, ContainerProvider, ILogger } from '@building-blocks';
import { loggingMiddleware } from './main-application';
import errorMiddleware from './main-application/middleware/errorMiddleware';

export class Server {
    private app: Application;
    private container: Container;
    private logger: ILogger;

    private _setupContainer() {
        this.container = new Container();
        this.container.load(BaseInfrastructureModule);
        ContainerProvider.init(this.container);
    }

    constructor() {
        this._setupContainer();
        this.app = new InversifyExpressServer(this.container).setConfig((app) => {
            app.use(cors({
                origin: '*'
            }));
            app.use(json());
            app.use(cookieParser());
            app.use(compression());
            app.use(loggingMiddleware);
            app.disable('x-powered-by');
        }).setErrorConfig((app) => {
            app.use(errorMiddleware);
        }).build();

        this.logger = this.container.getNamed<ILogger>(BASE_TYPES.ILogger, Server.name);
        this.logger.debug('ENV: ', process.env);
    }

    async start() {
        console.info('...');
        this.logger.info('🚀 Server is starting... 🚀');
        this.app.listen(process.env.PORT, () => {
            this.logger.info(`Server is listening on the port ${process.env.PORT}`);
        });
    }
}
