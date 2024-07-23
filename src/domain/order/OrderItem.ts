import { BaseEntity, IBaseEntityProps } from "@core";

export interface IOrderItemProps extends IBaseEntityProps {
    id: string;
    productName: string;
    productId: string;
    unitPrice: number;
    units: number;
    discount: number;
}

export class OrderItem extends BaseEntity implements IOrderItemProps {
    constructor(
        public id: string,
        public productName: string,
        public productId: string,
        public unitPrice: number,
        public units: number,
        public discount: number
    ) {
        super();
    }

    addUnit(units: number) {
        if (units < 0)
        {
            throw new Error("Invalid units");
        }
        this.units += units;
    }
}