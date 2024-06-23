import { ICommand, ICommandBus } from "src/building-blocks/interfaces";

export class CommandBus implements ICommandBus {
    execute<T extends ICommand, R = any>(command: T): Promise<R> {
        throw new Error("Method not implemented.");
    }
}
