import { ICommand, BaseCommand } from "@core";
import { OrderItemInput } from "@application";
import { IRequest } from "mediatr-ts";
import { Order } from "@domain";

export class CreateOrderCommand extends BaseCommand implements IRequest<CreateOrderCommand>, ICommand {
    constructor(
        public readonly buyerId: string,
        public readonly orderItems: OrderItemInput[],
        public readonly note?: string,
    ) {
        super();
    }
}

export type CreateOrderCommandResult = {
    order: Order,
}
