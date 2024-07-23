import { Order, OrderItem, OrderStatus } from "@domain";
import { Order as PrismaOrder, OrderItem as PrismaOrderItem } from "@prisma/client";

export class OrderMapper {
    static toDomain(prismaOrder: PrismaOrder, prismaOrderItems: PrismaOrderItem[]): Order {
        const domainOrder = new Order(
            prismaOrder.buyerId,
            prismaOrder.version,
            prismaOrder.note
        )
        domainOrder.id = prismaOrder.id;
        domainOrder.orderStatus = prismaOrder.orderStatus as OrderStatus;
        domainOrder.orderItems = prismaOrderItems.map(OrderItemMapper.toDomain);
        return domainOrder;''
    }

    static toModel(order: Order) {
        return {
            id: order.id,
            buyerId: order.buyerId,
            orderStatus: order.orderStatus ,
            orderItems: {
                create: order.orderItems.map(OrderItemMapper.toModel)
            },
            note: order.note,
            version: order.version,
        };
    }
}

export class OrderItemMapper {
    static toDomain(prismaOrderItem: PrismaOrderItem): OrderItem {
        const domainOrderItem = new OrderItem(
            prismaOrderItem.id,          
            prismaOrderItem.productId,
            prismaOrderItem.productName,
            prismaOrderItem.unitPrice.toNumber(),
            prismaOrderItem.units,
            prismaOrderItem.discount.toNumber(),
        );
        domainOrderItem.id = prismaOrderItem.id;
        return domainOrderItem;
    }

    static toModel(orderItem: OrderItem) {
        return {
            id: orderItem.id,
            productId: orderItem.productId,
            productName: orderItem.productName,
            unitPrice: orderItem.unitPrice,
            units: orderItem.units,
            discount: orderItem.discount,
        };
    }
}