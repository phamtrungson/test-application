import { IDomainEvent } from '../interfaces';

export class RequestProcessDomainEvent implements IDomainEvent {
    constructor(public eventName: string = 'RequestProcessDomainEvent') {}
}

export class RequestProcessErrorDomainEvent extends RequestProcessDomainEvent {
    constructor(public error: any) {
        super('RequestProcessErrorDomainEvent');
    }
}
