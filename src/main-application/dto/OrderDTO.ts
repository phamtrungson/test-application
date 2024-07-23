import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";

export enum OrderStatusDTO {
    Submitted = 'Submitted',
    AwaitingValidation = 'AwaitingValidation',
    StockConfirmed = 'StockConfirmed',
    Paid = 'Paid',
    Shipped = 'Shipped',
    Cancelled = 'Cancelled'
}

export class OrderDTO {
    id: string;
    buyerId: string;
    orderStatus: OrderStatusDTO;
    orderItems?: Array<OrderItemDTO>;
    note?: string;
    version: number;
};

export class OrderItemDTO {
    id: string;
    productName: string;
    productId: string;
    unitPrice: number;
    units: number;
    discount: number;
};

export class OrdersResponse {
    count: number;
    data: Array<OrderDTO>;
};

export class OrderResponse extends OrderDTO {};

export class OrdersQueryParams {
    @IsString()
    @IsOptional()
    buyerId?: string;
}

export class OrderItemInput {
    @IsString()
    productName: string;
    @IsString()
    productId: string;
    @IsString()
    unitPrice: number;
    @IsString()
    units: number;
    @IsString()
    discount: number;
}

export class OrderInput {
    @IsString()
    buyerId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemInput)
    orderItems: OrderItemInput[]

    @IsString()
    @IsOptional()
    note?: string;
}
