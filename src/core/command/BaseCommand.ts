import { ICommand } from "../interfaces";

export class BaseCommand implements ICommand {
    _correlationId?: string;
}
