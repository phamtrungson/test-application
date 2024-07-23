import { OrderDTO, OrderItemDTO, OrderStatusDTO } from "@application";
import { Order, OrderItem } from "@domain";
import { Order as PrismaOrder, OrderItem as PrismaOrderItem } from "@prisma/client";

export class OrderDTOMapper {
    static fromModel(prismaOrder: PrismaOrder, prismaOrderItems?: PrismaOrderItem[]) {
        return {
            id: prismaOrder.id,
            buyerId: prismaOrder.buyerId,
            orderStatus: prismaOrder.orderStatus,
            orderItems: prismaOrderItems?.map(item => OrderItemMapper.fromModel(item)),
            note: prismaOrder.note
        } as OrderDTO
    }

    static fromDomain(order: Order) {
        return {
            id: order.id,
            buyerId: order.buyerId,
            orderStatus: order.orderStatus as string as OrderStatusDTO,
            orderItems: order.orderItems.map(item => OrderItemMapper.fromDomain(item)),
            note: order.note,
            version: order.version
        } as OrderDTO
    }
}

export class OrderItemMapper {
    static fromModel(prismaOrderItem: PrismaOrderItem) {
        return {
            id: prismaOrderItem.id,
            productId: prismaOrderItem.productId,
            productName: prismaOrderItem.productName,
            unitPrice: prismaOrderItem.unitPrice.toNumber(),
            units: prismaOrderItem.units,
            discount: prismaOrderItem.discount.toNumber(),
        } as OrderItemDTO
    }

    static fromDomain(orderItem: OrderItem) {
        return {
            id: orderItem.id,
            productId: orderItem.productId,
            productName: orderItem.productName,
            unitPrice: orderItem.unitPrice,
            units: orderItem.units,
            discount: orderItem.discount,
        } as OrderItemDTO
    }
}