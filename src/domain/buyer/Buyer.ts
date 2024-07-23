import { BaseEntity } from "@core";

export interface IBuyer {
    id: string;
    name: string;
}

export class Buyer extends BaseEntity implements IBuyer {
    constructor(
        public id: string,
        public name: string
    ) {
        super(id);
    }
}
