import { IDomainEvent } from './IDomainEvent';

export interface IDomainEventHandler<TEvent extends IDomainEvent> {
    handle(event: TEvent): Promise<any>;
}

export interface IDomainEventDispatcher {
    register(eventNames: string[], handlerSymbol: symbol | string, handler: Function);

    dispatch(event: IDomainEvent): Promise<any>;

    dispatchEntity(entity: any): Promise<any>;
}
