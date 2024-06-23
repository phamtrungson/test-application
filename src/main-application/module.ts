import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@interfaces";
import { CommonController } from "./controllers";

export const ApplicationModule = new ContainerModule(
    (bind: interfaces.Bind, _u: interfaces.Unbind, _ib: interfaces.IsBound, _rb: interfaces.Rebind) => {
        bind<CommonController>(TYPES.CommonController).to(CommonController).inRequestScope();
    }
);
