import { TYPES } from "@interfaces";
import { PrismaClient } from "@prisma/client";
import { ContainerModule, interfaces } from "inversify";
import { PrismaClientProvider, PrismaOrderRepository } from "./prisma";
import { IRepository } from "@core";
import { Order } from "@domain";

export const InfrastructureModule = new ContainerModule(
    (bind: interfaces.Bind, _u: interfaces.Unbind, _ib: interfaces.IsBound, _rb: interfaces.Rebind) => {
        bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(PrismaClientProvider.Client);
        bind<IRepository<Order>>(TYPES.IOrderRepository).to(PrismaOrderRepository).inRequestScope();
    }
);
