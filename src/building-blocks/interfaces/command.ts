export interface ICommand {
    _name: string;
    _requestId?: string;
    _correlationId?: string;
    _transactionId?: string;
}

export interface ICommandHandler<T extends ICommand> {
    handleAsync(command: T): Promise<any>;
}

export interface ICommandBus {
    execute<T extends ICommand, R = any>(command: T): Promise<R>;
}
