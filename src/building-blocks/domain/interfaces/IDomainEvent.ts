export interface IDomainEvent {
    eventName: string;
}

export class DomainEvent implements IDomainEvent {
    constructor(public eventName: string) {}
}
