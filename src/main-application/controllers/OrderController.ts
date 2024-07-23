import { CreateOrderCommand, CreateOrderCommandResult, IOrderQueries, OrderDTOMapper, OrderInput } from "@application";
import { BASE_TYPES, ICommandBus, ILogger } from "@core";
import { TYPES } from "@interfaces";
import * as express from "express";
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { inject } from "inversify";
import { controller, httpGet, httpPost, queryParam, requestBody, requestParam } from "inversify-express-utils";

@controller('/api/v1/orders')
export class OrderController {
    constructor(
        @inject(BASE_TYPES.ILogger) private readonly logger: ILogger,
        @inject(TYPES.OrderQueries) private readonly orderQueries: IOrderQueries,
        @inject(BASE_TYPES.ICommandBus) private readonly commandBus: ICommandBus
    ) { }

    @httpGet('/')
    async getOrders(
        @queryParam('buyerId') buyerId: string,
        _request: express.Request,
        response: Response
    ) {
        const { count, data } = await this.orderQueries.getOrdersFromBuyerId(buyerId);

        response.json({ 
            count,
            data
        });
    }

    @httpGet('/:entityId')
    async getOrder(
        @requestParam('entityId') entityId: string,
        _request: express.Request,
        response: Response
    ) {
        const order = await this.orderQueries.getOrder(entityId);

        response.json(order);
    }


    @httpPost('/')
    async createOrder(
        @requestBody() orderInput: OrderInput,
        _request: Request, response: Response) {
        
        const { buyerId, note, orderItems } = orderInput;

        const result = await this.commandBus.send<CreateOrderCommand, CreateOrderCommandResult>(new CreateOrderCommand(buyerId, orderItems, note));
        const result2 = await this.commandBus.send<CreateOrderCommand, CreateOrderCommandResult>(new CreateOrderCommand(buyerId, orderItems, note));
        
        const orderResponse = OrderDTOMapper.fromDomain(result.order);

        response.status(StatusCodes.CREATED).json(orderResponse);
    }
}
