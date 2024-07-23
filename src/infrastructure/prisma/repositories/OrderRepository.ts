import { BASE_TYPES, ICommandBus, IRepository, IUnitOfWork } from "@core";
import { Order } from "@domain";
import { TYPES } from "@interfaces";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { OrderMapper } from "../mapper";
import { Order as PrismaOrder } from "@prisma/client";

@injectable()
export class PrismaOrderRepository implements IRepository<Order> {
    constructor(
        @inject(TYPES.PrismaClient) private prismaClient: PrismaClient,
        @inject(BASE_TYPES.ICommandBus) private commandBus: ICommandBus,
    ) {}

    async findById(id: string): Promise<Order> {
        const prismaOrder = await this.prismaClient.order.findFirst({
            where: {
                id
            },
            include: {
                orderItems: true
            }
        });
        return OrderMapper.toDomain(prismaOrder, prismaOrder.orderItems);
    }

    async create(entity: Order): Promise<Order> {
        for (const event of entity._events) {
            await (this.commandBus as any).mediator.publish(event);
        }


        const model = OrderMapper.toModel(entity);
        const prismaOrder = await this.prismaClient.order.create({
            data: model,
            include: {
                orderItems: true
            }
        });
        return OrderMapper.toDomain(prismaOrder, prismaOrder.orderItems);
    }

    async update(entity: Order): Promise<Order> {
        const model = OrderMapper.toModel(entity);        
        const prismaOrder = await this.prismaClient.order.update({
            where: {
                id: model.id
            },
            data: model,
            include: {
                orderItems: true
            }
        });
        return OrderMapper.toDomain(prismaOrder, prismaOrder.orderItems);
    }

    UnitOfWork: IUnitOfWork;
}
