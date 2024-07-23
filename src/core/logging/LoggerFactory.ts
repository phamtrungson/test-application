import winston from 'winston';

export class LoggerFactory {
    static createLogger(loggerName: string) {
        return winston.createLogger({ 
            defaultMeta: { component: loggerName },
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                })
            ]
        });
    }
}