import { BASE_TYPES, LoggingModule, ContainerProvider, ILogger } from '@core';
import { TYPES } from '@interfaces';
import { PrismaClient } from '@prisma/client';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Application, json } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { InfrastructureModule } from '@infra';
import { ApplicationModule, errorMiddleware, loggingMiddleware } from '@application';

export class Server {
    private app: Application;
    private container: Container;
    private logger: ILogger;
    private prismaClient: PrismaClient;

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

    start() {
        this.startAsync().catch(async (error) => {
            this.logger?.error(error.message);
            console.error(error.message);
            await this.prismaClient?.$disconnect();
        })
    }

    private async startAsync() {
        console.info('...');
        this.logger.info('🚀 Server is starting... 🚀');

        await this._setupDatabase();

        this.app.listen(process.env.PORT, () => {
            this.logger.info(`Server is listening on the port ${process.env.PORT}`);
        });

        this.logger.info('Server finish starting');
    }

    private _setupContainer() {
        this.container = ContainerProvider.Container;
        this.container.load(LoggingModule);
        this.container.load(InfrastructureModule);
        this.container.load(ApplicationModule);
    }

    private async _setupDatabase() {
        this.prismaClient = this.container.get<PrismaClient>(TYPES.PrismaClient);
        try {
            this.logger.info('Connecting to DB...');
            await this.prismaClient.$connect();
            this.logger.info('Connected to DB...');
        } catch (error) {
            this.logger.error('Connect to DB error', error?.message);
            throw error;
        }
    }
}
