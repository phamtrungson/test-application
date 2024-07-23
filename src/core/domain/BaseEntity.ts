import { IEntity } from './interfaces';
import { IDomainEvent } from './interfaces/IDomainEvent';

export interface IBaseEntityProps {
    id: string;
}
export class BaseEntity implements IEntity, IBaseEntityProps {
    id: string;

    _events: IDomainEvent[];

    constructor() {
        this._events = [];
    }

    _addEvent(e: IDomainEvent) {
        this._events.push(e);
    }

    _clearEvent() {
        this._events = [];
    }
}
