import 'reflect-metadata';
import 'dotenv/config';

import { Container } from 'inversify';

let _container: Container;

export class ContainerProvider {

    static setContainer(container: Container) {
        _container = container;
    }

    static get Container() {
        if (!_container) {
            _container = new Container();
        }
        return _container;
    }
}
