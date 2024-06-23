import { ContainerModule, interfaces } from 'inversify';
import { BASE_TYPES, ILogger } from '../interfaces';
import { LoggerFactory } from './logging';

export const BaseInfrastructureModule = new ContainerModule(
    (bind: interfaces.Bind, _u: interfaces.Unbind, _ib: interfaces.IsBound, _rb: interfaces.Rebind) => {
        bind<ILogger>(BASE_TYPES.ILogger).toDynamicValue((_context: interfaces.Context) => {
            const inputComponent = _context.currentRequest.target.getNamedTag()?.value;
            const parentServiceId = _context.currentRequest.parentRequest?.serviceIdentifier;
            const loggerName = inputComponent
                ? inputComponent
                : typeof parentServiceId === 'symbol'
                ? parentServiceId.description.toString()
                : `${parentServiceId}`;
            return LoggerFactory.createLogger(loggerName)
        });
    }
);
