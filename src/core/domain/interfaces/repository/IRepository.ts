import { IAggregateRoot } from "./IAggregateRoot";
import { IUnitOfWork } from "./IUnitOfWork";

export interface IRepository<T extends IAggregateRoot> {
    findById(id: any): Promise<T>;
    create(entity: T, ...args: any): Promise<T>;
    update(entity: T, ...args: any): Promise<T>;
    UnitOfWork: IUnitOfWork;
}
