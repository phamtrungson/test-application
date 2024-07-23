import { ContainerProvider } from "../container";
import { IResolver } from "mediatr-ts";

export class InversifyResolver implements IResolver {
    constructor() {
    }

    resolve<T>(name: string): T {
        console.log('name', name);
        return ContainerProvider.Container.get(name);
    }

    add(name: string, instance: Function): void {
        console.log('name add', name);
        ContainerProvider.Container.bind(name).to(instance as any);
    }

    remove(name: string): void {
        // not necessary- can be blank, never called by the lib, for debugging / testing only
        ContainerProvider.Container.unbind(name);
    }

    clear(): void {
        // not necessary- can be blank, never called by the lib, for debugging / testing only
        ContainerProvider.Container.unbindAll();
    }
}
