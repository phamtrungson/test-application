import { IDomainEvent } from './IDomainEvent';

export interface IDomainEventHandler<TEvent extends IDomainEvent> {
    handle(event: TEvent): Promise<void>;
}
