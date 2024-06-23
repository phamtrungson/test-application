import { IDomainEvent } from './IDomainEvent';

export interface IEntity {
    id: string;

    updatedAt?: string;
    oldUpdatedAt?: string;

    _events: IDomainEvent[];
}
