import { BaseCommandHandler, ICommandHandler, IRepository } from "@core";
import { TYPES } from "@interfaces";
import { inject, injectable } from "inversify";
import { CreateOrderCommand, CreateOrderCommandResult } from "./CreateOrderCommand";
import { Order } from '@domain';
import { IRequestHandler, requestHandler } from "mediatr-ts";

@requestHandler(CreateOrderCommand)
@injectable()
export class CreateOrderCommandHandler
    extends BaseCommandHandler<CreateOrderCommand, CreateOrderCommandResult>
    implements ICommandHandler<CreateOrderCommand>, IRequestHandler<CreateOrderCommand, CreateOrderCommandResult>
{
    constructor(
        @inject(TYPES.IOrderRepository) private orderRepository: IRepository<Order>
    ) {
        super();
    }

    async handle(command: CreateOrderCommand): Promise<CreateOrderCommandResult> {
        const { buyerId, note, orderItems } = command;
        const order = new Order(buyerId, 1, note);
        order.orderStart();
        for (const item of orderItems) {
            order.addOrderItem(item);
        }
        return new Promise((rs, rj) => {
            setTimeout(() => {
                console.log(`sent email buyerId ${order.buyerId} of order: ${order.id}`);
                rj('xxx');
            }, 1500)
        });

        const createdOrder = await this.orderRepository.create(order);
        return {
            order: createdOrder
        };
    }
}
