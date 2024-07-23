import { IsString } from "class-validator";

export class EntityPathParams {
    @IsString()
    entityId: string;
}
