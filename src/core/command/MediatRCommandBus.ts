import { ICommand, ICommandBus } from "@core";
import { injectable } from "inversify";
import { Mediator, mediatorSettings } from "mediatr-ts";
import { InversifyResolver } from "./InversifyResolver";

@injectable()
export class MediatRCommandBus implements ICommandBus {
    mediator: Mediator;
    constructor() {
        mediatorSettings.resolver = new InversifyResolver();
        this.mediator = new Mediator();
    }

    async send<T extends ICommand, R = any>(command: T): Promise<R> {
        return await this.mediator.send<R>(command);
    }
}
