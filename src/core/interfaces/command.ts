export interface ICommand {
    _correlationId?: string;
}

export interface IIdentifiedCommand {
    _requestId?: string;
}

export interface ITransactionalCommand {
    _transactionId?: string;
}

export interface ICommandHandler<T extends ICommand> {
    handle(command: T): Promise<any>;
}

export interface ICommandBus {
    send<T extends ICommand, R = any>(command: T): Promise<R>;
}
