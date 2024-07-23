import { TYPES } from "@interfaces";
import { ContainerModule, interfaces } from "inversify";
import { IOrderQueries, OrderQueries } from "./queries";
import { BASE_TYPES, ICommandBus, MediatRCommandBus } from "@core";
import { CreateOrderCommandHandler, OrderStartedEventHandler, OrderStartedEventSendEmailHandler } from "@application";

export const ApplicationModule = new ContainerModule(
    (bind: interfaces.Bind, _u: interfaces.Unbind, _ib: interfaces.IsBound, _rb: interfaces.Rebind) => {
        bind<IOrderQueries>(TYPES.OrderQueries).to(OrderQueries).inSingletonScope();
        bind<ICommandBus>(BASE_TYPES.ICommandBus).to(MediatRCommandBus).inSingletonScope();
        bind<CreateOrderCommandHandler>('CreateOrderCommand').to(CreateOrderCommandHandler).inRequestScope();
        bind<OrderStartedEventHandler>('OrderStartedEventHandler').to(OrderStartedEventHandler).inRequestScope();
        bind<OrderStartedEventSendEmailHandler>('OrderStartedEventSendEmailHandler').to(OrderStartedEventSendEmailHandler).inRequestScope();
    }
);
