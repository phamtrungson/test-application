import 'reflect-metadata';
import 'dotenv/config';

import { Container } from 'inversify';

export class ContainerProvider {
    static _c: Container;

    static init(c: Container) {
        ContainerProvider._c = c;
    }

    static get Container() {
        return ContainerProvider._c;
    }
}
