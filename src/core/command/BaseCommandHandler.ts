import { injectable } from "inversify";
import { ICommand, ICommandHandler } from "../interfaces";

@injectable()
export abstract class BaseCommandHandler<T extends ICommand, R> implements ICommandHandler<T> {
    abstract handle(command: T): Promise<R>;
}