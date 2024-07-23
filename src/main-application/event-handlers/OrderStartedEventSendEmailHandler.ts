import { BASE_TYPES, IDomainEventHandler, ILogger } from "@core";
import { OrderStartedEvent } from "@domain";
import { inject, injectable } from "inversify";
import { INotificationHandler, notificationHandler } from "mediatr-ts";

@injectable()
@notificationHandler(OrderStartedEvent)
export class OrderStartedEventSendEmailHandler implements IDomainEventHandler<OrderStartedEvent>, INotificationHandler<OrderStartedEvent> {
    constructor(
        @inject(BASE_TYPES.ILogger) private logger: ILogger,
    ) {}
    
    async handle(event: OrderStartedEvent): Promise<void> {
        const { order } = event;
        this.logger.info(`sending email to buyerId ${order.buyerId} of order: ${order.id}`);
        return new Promise((rs) => {
            setTimeout(() => {
                this.logger.info(`sent email buyerId ${order.buyerId} of order: ${order.id}`);
                rs();
            }, 1500)
        })
    }
}