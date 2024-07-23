import { BusinessNotFoundError } from "@core";
import { TYPES } from "@interfaces";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { OrderDTOMapper } from "@application";
import { OrderDTO } from "@application";

export interface IOrderQueries {
    getOrdersFromBuyerId(buyerId: string): Promise<{ count: number, data: OrderDTO[]}>;
    getOrder(id: string): Promise<OrderDTO>;
}

@injectable()
export class OrderQueries implements IOrderQueries {
    constructor(
        @inject(TYPES.PrismaClient) private prismaClient: PrismaClient
    ) {}

    async getOrdersFromBuyerId(buyerId: string): Promise<{ count: number; data: OrderDTO[]}> {
        const count = await this.prismaClient.order.count({
            where: { 
                buyerId: buyerId
            },            
        });
        const orders = await this.prismaClient.order.findMany({
            where: { 
                buyerId: buyerId
            },
            include: {
                orderItems: true
            },
        });
        return { count, data: orders.map(order => OrderDTOMapper.fromModel(order, order.orderItems)) };
    }

    async getOrder(id: string): Promise<OrderDTO> {
        const order = await this.prismaClient.order.findFirst({
            where: { 
                id: id
            },
            include: {
                orderItems: true
            }
        });
        if (!order) {
            throw BusinessNotFoundError.Resource('order');
        }
        return OrderDTOMapper.fromModel(order, order.orderItems);
    }
}