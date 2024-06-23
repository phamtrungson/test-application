import 'jest';
import 'reflect-metadata';

import { Server } from '../server';

jest.spyOn(Server.prototype, "start").mockImplementation(async () => { console.log('mock'); return; })

import { main } from '../index';


describe('server test', () => {
    it('init server', () => {
        expect(() => main()).not.toThrow();
    });
});
