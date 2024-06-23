import { IEntity } from './interfaces';
import { IDomainEvent } from './interfaces/IDomainEvent';

export interface IBaseEntityProps {
    id: string;
    updatedAt?: string;
    oldUpdatedAt?: string;
}
export class BaseEntity implements IEntity, IBaseEntityProps {
    id: string;
    updatedAt?: string;
    oldUpdatedAt?: string;

    _events: IDomainEvent[];

    constructor(id: string) {
        this.id = id;
        this._events = [];
    }

    addEvent(e: IDomainEvent) {
        this._events.push(e);
    }

    clearEvent() {
        this._events = [];
    }
}
