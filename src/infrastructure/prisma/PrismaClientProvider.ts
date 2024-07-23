import { Prisma, PrismaClient } from "@prisma/client"

let _client: PrismaClient;

export class PrismaClientProvider {

    static setClient(client: PrismaClient) {
        _client = client;
    }

    static get Client() {
        if (!_client) {
            _client = new PrismaClient();
        }
        return _client;
    }
}
