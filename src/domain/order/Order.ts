import { BaseEntity, IAggregateRoot, IBaseEntityProps, IEntity } from "@core";
import { OrderItem } from "./OrderItem";
import { nanoid } from "nanoid";
import { OrderStartedEvent } from "@domain";

export interface IOrderProps extends IBaseEntityProps {
    id: string;
    buyerId: string;
    orderStatus: OrderStatus;
    orderItems: OrderItem[];
    note?: string;
}

export enum OrderStatus {
    Submitted = 'Submitted',
    AwaitingValidation = 'AwaitingValidation',
    StockConfirmed = 'StockConfirmed',
    Paid = 'Paid',
    Shipped = 'Shipped',
    Cancelled = 'Cancelled'
}

export class Order extends BaseEntity implements IAggregateRoot, IOrderProps {
    id: string;
    orderItems: OrderItem[];
    orderStatus: OrderStatus;

    constructor(
        public buyerId: string,
        public version: number,
        public note?: string
    ) {
        super();
        this.orderItems = [];
    }

    orderStart() {
        this.id = nanoid();
        this.orderStatus = OrderStatus.Submitted;
        this._addEvent(new OrderStartedEvent(this));
    }

    addOrderItem(item: { productName: string, productId: string, unitPrice: number, units: number, discount: number }) {
        const { productName, productId, unitPrice, units, discount } = item

        const existingProductItem = this.orderItems.find(item => item.productId === productId);
        if (existingProductItem) {
            existingProductItem.addUnit(units)
        } else {
            const newOrderItem = new OrderItem(nanoid(), productName, productId, unitPrice, units, discount);
            this.orderItems.push(newOrderItem);
        }
    }
}
