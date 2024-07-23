import { IDomainEvent } from "@core";
import { Order } from "@domain";
import { INotification } from "mediatr-ts";

export class OrderStartedEvent implements INotification, IDomainEvent {
    constructor(public order: Order) {}
}
