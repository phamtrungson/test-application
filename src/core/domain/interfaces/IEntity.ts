import { IDomainEvent } from './IDomainEvent';

export interface IEntity {
    id: string;

    _events: IDomainEvent[];
}
