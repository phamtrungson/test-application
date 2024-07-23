import { BASE_TYPES, ILogger } from "@core";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from 'express';
import { BusinessConcurrencyError, NotAuthenticatedError, NotAuthorizedError } from "@core";
import packageJson from '../../../package.json';

@controller('/')
export class CommonController {
    constructor(
        @inject(BASE_TYPES.ILogger) private readonly logger: ILogger
    ) { }

    @httpGet('')
    async getInfo(_request: Request, response: Response) {
        response.json({
            name: packageJson.name,
            version: packageJson.version,
        });
    }


    @httpGet('health')
    async getHealth(_request: Request, response: Response) {
        response.sendStatus(200);
    }

    @httpGet('error/business')
    async getErrorBussiness(_request: Request, response: Response) {
        throw new BusinessConcurrencyError();
    }

    @httpGet('error/authen')
    async getErrorAuthen(_request: Request, response: Response) {
        throw new NotAuthenticatedError();
    }

    @httpGet('error/authorize')
    async getErrorAuthorize(_request: Request, response: Response) {
        throw new NotAuthorizedError();
    }

    @httpGet('error/unexpect')
    async getError(_request: Request, response: Response) {
        throw new Error('Some thing wrong!');
    }
}
